import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Settings } from '../models/settings.model';
import { AccountType } from '../models/account-types.model';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public storage: Storage, public deviceService: DeviceService) { }

  //Settings
  async get() {
    return await this.storage.get('settings')
  }

  async set(settings: Settings) {
    return await this.storage.set('settings', settings)
  }

  async saveGeneral(newSettings: Settings) {  //only save the real settings, not the categories and timers
    let settings = await this.storage.get('settings')

    settings.theme = newSettings.theme
    settings.language = newSettings.language

    await this.storage.set('settings', settings)
  }

  async reset() {
    let newSettings = new Settings()
    newSettings.accountType = AccountType.FREE
    newSettings.theme = await this.deviceService.getTheme()
    newSettings.language = await this.deviceService.getLanguage()
    return this.storage.set('settings',newSettings)
  }

  async export() {
    let response = {result: false, message: ""}
    let permissionsCheckResult = await Filesystem.checkPermissions()
    if(permissionsCheckResult.publicStorage !== 'granted') {
      let permissionsAskResult = await Filesystem.requestPermissions()
      if(permissionsAskResult.publicStorage !== 'granted') {
        response = {result: false, message: "No read permissions given"}
        return response
      }
    }
    
    let settings = await this.storage.get('settings')
      try {
        await Filesystem.mkdir({
          path: 'lastpressed',
          directory: Directory.Data,
          recursive: false,
        })
      } catch (e) {
        //console.error("Unable to make directory", e);
      }
      try {
        await (Filesystem.readFile({
          path: 'lastpressed/settings.json',
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        })).then(async (result) => {
          if(result.data) {
            await Filesystem.deleteFile({
              path: 'lastpressed/settings.json',
              directory: Directory.Data,
            })
          }
        })
      } catch (e) {
        //console.error("Unable to read file", e);
      }
      await (Filesystem.writeFile({
        path: 'lastpressed/settings.json',
        data: JSON.stringify(settings),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      }).then((writeFileResult) => response = {result: true, message: writeFileResult.uri}))
      return response
    }

    async import() {
      let response = {result: false, message: "General error"}
      let permissionsCheckResult = await Filesystem.checkPermissions()
      if(permissionsCheckResult.publicStorage !== 'granted') {
        let permissionsAskResult = await Filesystem.requestPermissions()
        if(permissionsAskResult.publicStorage !== 'granted') {
          response = {result: false, message: "No read permissions given"}
          return response
        }
      }
      try {
        await (Filesystem.readFile({
          path: 'lastpressed/settings.json',
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        }).then((readFileResult) => {
          let settings = JSON.parse(readFileResult.data)
          this.storage.set('settings', settings)
          response = {result: true, message: "Settings imported successfully"}
        }))
      } catch (e) {
        response.message = "Unable to read file"
      }
      return response
    }
}

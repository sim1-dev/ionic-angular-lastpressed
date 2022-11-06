import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@ionic/storage-angular';
import { AccountType } from '../models/account-types.model';
import { Category } from '../models/category.model';
import { Settings } from '../models/settings.model';
import { Timer } from '../models/timer.model';
import { DeviceService } from './device.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage, public deviceService: DeviceService) { }

  //Categories
  async getCategories() {
    return (await this.getSettings()).categories
  }

  async getCategoryDetails(categoryId: number) {
    return (await this.getSettings()).categories.find(category => category.id == categoryId)
  }

  async createCategory(categoryName: string) {

    let settings = await this.getSettings()
    let newCategory = { id: settings.categories[settings.categories.length - 1].id + 1, name: categoryName, timers: [] }

    settings.categories.push(newCategory)

    await this.setSettings(settings)

    return
  }

  async editCategory(categoryId: number, newCategoryName: string) {

    let settings = await this.getSettings()
    
    settings.categories.find(category => {return category.id == categoryId}).name = newCategoryName

    await this.setSettings(settings)

    return
  }

  async deleteCategory(categoryId: number) {
    let settings = await this.getSettings()

    settings.categories = settings.categories.filter(category => category.id !== categoryId)

    await this.setSettings(settings)

    return
  }



  //Timers
  async getTimers(categoryId: number) {
    return (await this.getSettings()).categories.find(category => category.id == categoryId).timers
  }

  async getTimerDetails(categoryId: number, timerId: number) {
    return (await this.getSettings()).categories.find(category => category.id == categoryId).timers.find(timer => timer.id == timerId)
  }

  async createTimer(category: Category, timer: Timer) {

    let settings = await this.getSettings()
    let newTimer = { id: category.timers[category.timers.length - 1] ? category.timers[category.timers.length - 1].id + 1 : 1, name: timer.name, icon: timer.icon, lastPressed: new Date() }

    settings.categories.find(settingsCategory => settingsCategory.id == category.id)?.timers.push(newTimer)

    console.log(newTimer, "newTimer")

    await this.setSettings(settings)
    
  }

  async editTimer(category: Category, timer: Timer) {

    let settings = await this.getSettings()
    let settingsCategory = settings.categories.find(settingsCategory => settingsCategory.id == category.id)

    console.log(timer, "timer")

    if(settingsCategory.timers?.length > 0) {
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).name = timer.name
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).icon = timer.icon
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).lastPressed = timer.lastPressed
    }
      
    await this.setSettings(settings)

  }

  async deleteTimer(category: Category, timer: Timer) {
    let settings = await this.getSettings()

    settings.categories.find(settingsCategory => settingsCategory.id == category.id).timers = settings.categories.find(
        settingsCategory => settingsCategory.id == category.id
      ).timers.filter(
          settingsTimer => settingsTimer.id !== timer.id
        )

    await this.setSettings(settings)

    return
  }

  async resetTimer(category: Category, timer: Timer) {

    let settings = await this.getSettings()
    let settingsCategory = settings.categories.find(settingsCategory => settingsCategory.id == category.id)

    if(settingsCategory.timers?.length > 0)
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).lastPressed = new Date()

    await this.setSettings(settings)

  }


  //Settings
  async getSettings() {
    return await this.storage.get('settings')
  }

  async setSettings(settings: Settings) {
    return await this.storage.set('settings', settings)
  }

  async saveGeneralSettings(newSettings: Settings) {  //only save the real settings, not the categories and timers
    let settings = await this.storage.get('settings')

    settings.theme = newSettings.theme
    settings.language = newSettings.language

    await this.storage.set('settings', settings)

  }

  async resetSettings() {
    let newSettings = new Settings()
    newSettings.accountType = AccountType.FREE
    newSettings.theme = await this.deviceService.getTheme()
    newSettings.language = await this.deviceService.getLanguage()
    return this.storage.set('settings',newSettings)
  }

  async exportSettings() {
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

    async importSettings() {
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

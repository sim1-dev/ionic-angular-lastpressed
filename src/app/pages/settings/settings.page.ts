import { Component } from '@angular/core';
import { Directory } from '@capacitor/filesystem';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Settings } from 'src/app/models/settings.model';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  loading: boolean = true
  settings: Settings
  generalSaveButtonEnabled: boolean = false

  constructor(private storageService: StorageService, public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController, public langService: LanguageService) { }

  async ionViewDidEnter() {
    await this.getSettings()
  }

  async getSettings() {
    let loader = await this.loadingController.create({
      message: this.langService.dictionary.loading
    })

    loader.present()
    this.settings = await this.storageService.getSettings()
    this.loading = false
    loader.dismiss()
  }

  async resetSettings() {
    const alert = await this.alertController.create({
      header: this.langService.dictionary.alert,
      message: 'Are you sure you want to reset all settings?',
      buttons: [
        this.langService.dictionary.cancel,
        {
          text: this.langService.dictionary.reset,
          handler: async () => {
            this.loading = true
            await this.storageService.resetSettings()
            await this.getSettings()
            this.loading = false
            this.toastController.create({
              message: 'Settings reset successfully.',
              color: 'success',
              duration: 2000,
              cssClass: 'tabs-bottom',
            }).then(toast => toast.present())
          }
        }
      ]
    })

    await alert.present()
  }

  async exportSettings() {
    let response = await this.storageService.exportSettings()
    if(response.result) {
      this.toastController.create({
        message: 'Settings exported successfully in ' + response.message,
        color: 'success',
        duration: 3000,
        cssClass: 'tabs-bottom',
      }).then(toast => toast.present())
    } else {
      this.toastController.create({
        message: 'Error exporting settings: ' + response.message,
        color: 'danger',
        duration: 2000,
        cssClass: 'tabs-bottom',
      }).then(toast => toast.present())
    }
  }

  async importSettings() {
    const alert = await this.alertController.create({
      header: this.langService.dictionary.alert,
      message: 'Are you sure you want to import setting from {{appDir}}/files/lastpressed/settings.json? This will overwrite your current settings.',
      buttons: [
        this.langService.dictionary.cancel,
        {
          text: 'Import',
          handler: async () => {
            let loader = await this.loadingController.create({
              message: this.langService.dictionary.loading
            })
        
            loader.present()
            this.loading = true
            let response = await this.storageService.importSettings()
            this.loading = false
            loader.dismiss()
            if(response.result) {
              this.toastController.create({
                message: 'Settings imported successfully.',
                color: 'success',
                duration: 1500,
                cssClass: 'tabs-bottom',
              }).then(toast => toast.present())
            } else {
              this.toastController.create({
                message: 'Error importing settings: ' + response.message,
                color: 'danger',
                duration: 2000,
                cssClass: 'tabs-bottom',
              }).then(toast => toast.present())
            }
          }
        }
      ]
    })

    await alert.present()
  }

  enableGeneralSaveButton() {
    this.generalSaveButtonEnabled = true
  }

  async saveGeneral() {
    this.loading = true
    let loader = await this.loadingController.create({
      message: this.langService.dictionary.saving
    })
    loader.present()
    this.generalSaveButtonEnabled = false
    this.storageService.saveGeneralSettings(this.settings)
    loader.dismiss()
    this.loading = false
    this.toastController.create({
      message: 'Settings saved successfully.',
      color: 'success',
      duration: 2000,
      cssClass: 'tabs-bottom',
    }).then(toast => toast.present())
    await this.getSettings()

  }

  async removeAds() {
    //TODO await this.storageService.removeAds()
  }

}

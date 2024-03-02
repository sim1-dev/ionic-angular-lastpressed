import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Settings } from 'src/app/models/settings.model';
import { LanguageService } from 'src/app/services/language.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  loading: boolean = true
  settings: Settings
  generalSaveButtonEnabled: boolean = false

  constructor(private settingsService: SettingsService, public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController, public languageService: LanguageService) { }

  async ionViewDidEnter() {
    await this.get()
  }

  async get() {
    let loader = await this.loadingController.create({
      message: this.languageService.dictionary.loading
    })

    loader.present()
    this.settings = await this.settingsService.get()
    this.loading = false
    loader.dismiss()
  }

  async reset() {
    const alert = await this.alertController.create({
      header: this.languageService.dictionary.alert,
      message: this.languageService.dictionary.resetPrompt,
      buttons: [
        this.languageService.dictionary.cancel,
        {
          text: this.languageService.dictionary.reset,
          handler: async () => {
            this.loading = true
            await this.settingsService.reset()
            await this.get()
            this.loading = false
            this.toastController.create({
              message: this.languageService.dictionary.settingsResetSuccess,
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

  async export() {
    let response = await this.settingsService.export()
    if(response.result) {
      this.toastController.create({
        message: this.languageService.dictionary.settingsExportSuccess+' '+response.message,
        color: 'success',
        duration: 3000,
        cssClass: 'tabs-bottom',
      }).then(toast => toast.present())
    } else {
      this.toastController.create({
        message: this.languageService.dictionary.settingsExportFailure+' '+response.message,
        color: 'danger',
        duration: 2000,
        cssClass: 'tabs-bottom',
      }).then(toast => toast.present())
    }
  }

  async import() {
    const alert = await this.alertController.create({
      header: this.languageService.dictionary.alert,
      message: this.languageService.dictionary.importPrompt,
      buttons: [
        this.languageService.dictionary.cancel,
        {
          text: this.languageService.dictionary.import,
          handler: async () => {
            let loader = await this.loadingController.create({
              message: this.languageService.dictionary.loading
            })
        
            loader.present()
            this.loading = true
            let response = await this.settingsService.import()
            this.loading = false
            loader.dismiss()
            if(response.result) {
              this.toastController.create({
                message: this.languageService.dictionary.settingsImportSuccess,
                color: 'success',
                duration: 1500,
                cssClass: 'tabs-bottom',
              }).then(toast => toast.present())
            } else {
              this.toastController.create({
                message: this.languageService.dictionary.settingsImportFailure+' ' + response.message,
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
      message: this.languageService.dictionary.saving
    })
    loader.present()
    this.generalSaveButtonEnabled = false
    this.settingsService.saveGeneral(this.settings)
    loader.dismiss()
    this.loading = false
    this.toastController.create({
      message: this.languageService.dictionary.settingsSaveSuccess,
      color: 'success',
      duration: 2000,
      cssClass: 'tabs-bottom',
    }).then(toast => toast.present())
    await this.get()

  }

  async removeAds() {
    //TODO await this.storageService.removeAds()
  }

}

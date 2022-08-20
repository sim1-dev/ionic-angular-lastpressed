import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { Timer } from 'src/app/models/timer.model';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';
import { TimeService } from 'src/app/services/time.service';
import { TimersModalComponent } from './timers-modal/timers-modal.component';

@Component({
  selector: 'app-timers',
  templateUrl: 'timers.page.html',
  styleUrls: ['timers.page.scss']
})
export class TimersPage {

  loading: boolean = true
  categories: Category[]
  now: Date = new Date()
  interval: any

  constructor(private storageService: StorageService, public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController, public timeService: TimeService, public langService: LanguageService) { }

  async ionViewDidEnter() {
    
    await this.getCategories()
    
    this.interval = setInterval(async () => {
      this.now = new Date()
    }, 1000)
  }

  async getCategories() {
    this.loading = true
    let loading = await this.loadingController.create({
      message: 'Loading...'
    })

    loading.present()

    this.categories = await this.storageService.getCategories()

    loading.dismiss()
    this.loading = false
  }

  async openModal(action: string, category: Category, timer?: Timer) {
    const modal = await this.modalController.create({
      component: TimersModalComponent,
      componentProps: {
        'timer': timer,
        'action': action,
        'category': category
      }
    })

    modal.onDidDismiss().then(async () => {
      await this.getCategories()
    })

    return await modal.present()
  }

  async resetLastPressed(category: Category, timer: Timer) {
    this.storageService.resetTimer(category, timer)
    const toast = await this.toastController.create({
      message: 'Timer '+ timer.name +' button pressed!',
      color: 'success',
      duration: 2000,
      cssClass: 'tabs-bottom',
    })
    await this.getCategories()
    toast.present()
  }

  getTimerDuration(timer: Timer) {
    let lastPressStamp = timer.lastPressed ? new Date(timer.lastPressed).getTime() : 0
    let timestamp = this.now.getTime() - lastPressStamp
    return this.timeService.getCompactSecondsToString(timestamp / 1000)
  }

  ionViewWillLeave() {
    clearInterval(this.interval)
  }

  ionViewDidLeave() {
    clearInterval(this.interval)
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

}

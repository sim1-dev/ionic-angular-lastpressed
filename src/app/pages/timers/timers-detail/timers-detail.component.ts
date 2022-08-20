import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Timer } from 'src/app/models/timer.model';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';
import { TimeService } from 'src/app/services/time.service';
import { TimersModalComponent } from '../timers-modal/timers-modal.component';

@Component({
  selector: 'app-timers-detail',
  templateUrl: './timers-detail.component.html',
  styleUrls: ['./timers-detail.component.scss'],
})
export class TimersDetailComponent {
  loading: boolean = true
  subscriptions: Subscription = new Subscription()
  categoryId: number
  timerId: number
  timer: Timer
  category: Category
  now: Date = new Date()
  interval: any

  constructor(private route: ActivatedRoute, public storageService: StorageService, public loadingController: LoadingController, public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public timeService: TimeService, public router: Router, public langService: LanguageService) { }

  async ionViewDidEnter() {
    this.subscriptions.add(
      this.route.params.subscribe(async params => {
        this.categoryId = params.categoryId
        this.timerId = params.timerId
        this.category = await this.storageService.getCategoryDetails(this.categoryId)
        await this.getTimerDetails()
        this.interval = setInterval(async () => {
          this.now = new Date()
        }, 1000)
      })
    )
  }

  async getTimerDetails() {
    this.loading = true
    let loading = await this.loadingController.create({
      message: this.langService.dictionary.loading
    })

    loading.present()

    this.timer = await this.storageService.getTimerDetails(this.categoryId, this.timerId)

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
      await this.getTimerDetails()
    })

    return await modal.present()
  }

  async openDeleteTimerDialog(category: Category, timer: Timer) {
    const alert = await this.alertController.create({
      header: this.langService.dictionary.alert,
      message: this.langService.dictionary.deletePrompt+' '+this.langService.dictionary.timer+' '+timer.name+'?',
      buttons: [
        this.langService.dictionary.cancel,
        {
          text: this.langService.dictionary.delete,
          handler: async () => {
            await this.storageService.deleteTimer(category, timer)
            const toast = await this.toastController.create({
              message: this.langService.dictionary.timer+' '+timer.name+' '+this.langService.dictionary.deletedSuccess,
              color: 'success',
              duration: 2000,
              cssClass: 'tabs-bottom',
            })
            this.router.navigate(['tabs/timers'])
            toast.present()
          },
        }
      ],
    })

    await alert.present()
  }

  getTimerDuration(timer: Timer) {
    let lastPressStamp = timer.lastPressed ? new Date(timer.lastPressed).getTime() : 0
    let timestamp = this.now.getTime() - lastPressStamp
    return this.timeService.getExtendedSecondsToString(timestamp / 1000)
  }

  ionViewDidLeave() {
    this.categoryId = null
    this.timerId = null
    this.subscriptions.unsubscribe()
    clearInterval(this.interval)
  }

}

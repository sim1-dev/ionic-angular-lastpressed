import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage {
  loading: boolean = true
  categories: Category[]
  constructor(private storageService: StorageService, public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController, public languageService: LanguageService) { }

  async ionViewDidEnter() {
    await this.getCategories()
  }

  async getCategories() {
    this.loading = true
    let loading = await this.loadingController.create({
      message: this.languageService.dictionary.loading
    })

    loading.present()

    this.categories = await this.storageService.getCategories()

    loading.dismiss()
    this.loading = false
  }

  async openModal(action: string, category?: Category) {
    const modal = await this.modalController.create({
      component: CategoriesModalComponent,
      componentProps: {
        'categories': this.categories,
        'action': action,
        'category': category
      }
    })

    modal.onDidDismiss().then(async () => {
      await this.getCategories()
    })

    return await modal.present()
  }

  async openDeleteCategoryDialog(category: Category) {
    const alert = await this.alertController.create({
      header: this.languageService.dictionary.alert,
      message: this.languageService.dictionary.deletePrompt +' '+category.name + '?' + this.languageService.dictionary.categoryTimersWillBeLost,
      buttons: [
        this.languageService.dictionary.cancel,
        {
          text: this.languageService.dictionary.delete,
          cssClass: "text-danger",
          handler: async () => {
            await this.storageService.deleteCategory(category.id)
            const toast = await this.toastController.create({
              message: this.languageService.dictionary.category+' '+ category.name +' ' + this.languageService.dictionary.deletedSuccess,
              color: 'success',
              duration: 1500,
              cssClass: 'tabs-bottom',
            })
            await this.getCategories()
            toast.present()
          },
        }
      ],
    })

    await alert.present()
  }

}

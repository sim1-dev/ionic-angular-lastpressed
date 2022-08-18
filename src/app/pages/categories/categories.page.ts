import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage {
  loading: boolean = true
  categories: Category[]
  constructor(private storageService: StorageService, public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController) { }

  async ionViewDidEnter() {
    await this.getCategories()
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
      header: 'Alert',
      message: 'Are you sure you want to delete this category? All its timers will be deleted aswell.',
      buttons: [
        'Cancel',
        {
          text: 'Delete',
          handler: async () => {
            await this.storageService.deleteCategory(category.id)
            const toast = await this.toastController.create({
              message: 'Category '+ category.id +' deleted successfully.',
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

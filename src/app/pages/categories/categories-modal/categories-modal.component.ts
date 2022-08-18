import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular'
import { ValidateCategory } from 'src/app/validators/categories.validator';
import { StorageService } from 'src/app/services/storage.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
})
export class CategoriesModalComponent implements OnInit {

  categories: Category[]
  action: string
  category: Category

  categoryForm: FormGroup

  constructor(public modalController: ModalController, public formBuilder: FormBuilder, public storageService: StorageService) {
  }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [this.action == 'edit' && this.category ? this.category.name : '', ValidateCategory.bind(this)],
    })
  }

  async saveCategory() {

    if(this.categoryForm.invalid)
      return

    if(this.action == 'add') 
      await this.storageService.createCategory(this.categoryForm.value.name)
    else if(this.action == 'edit')
      await this.storageService.editCategory(this.category.id, this.categoryForm.value.name)

    this.close()
    
  }

  close(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CategoriesPage }])
  ],
  declarations: [CategoriesPage, CategoriesModalComponent]
})
export class CategoriesPageModule {}

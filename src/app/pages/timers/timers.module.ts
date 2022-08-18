import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimersPage } from './timers.page';
import { TimersModalComponent } from './timers-modal/timers-modal.component';
import { TimersDetailComponent } from './timers-detail/timers-detail.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: TimersPage }])
  ],
  declarations: [TimersPage, TimersModalComponent, TimersDetailComponent]
})
export class TimersPageModule {}

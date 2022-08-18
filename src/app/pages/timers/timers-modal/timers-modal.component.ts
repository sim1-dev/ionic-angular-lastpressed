import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { Timer } from 'src/app/models/timer.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-timers-modal',
  templateUrl: './timers-modal.component.html',
  styleUrls: ['./timers-modal.component.scss'],
})
export class TimersModalComponent implements OnInit {

  action: string
  category: Category
  timer: Timer

  timerForm: FormGroup

  constructor(public modalController: ModalController, public formBuilder: FormBuilder, public storageService: StorageService) {
  }

  ngOnInit() {
    this.timerForm = this.formBuilder.group({
      name: [this.action == 'edit' && this.timer ? this.timer.name : ''],
      icon: [this.action == 'edit' && this.timer ? this.timer.icon : 'alarm'],
    })
  }

  async saveTimer() {

    if(this.timerForm.invalid)
      return


    if(this.action == 'add') 
      await this.storageService.createTimer(this.category, this.timerForm.value)
    else if(this.action == 'edit') {
      this.timerForm.value.id = this.timer.id
      this.timerForm.value.lastPressed = this.timer.lastPressed
      await this.storageService.editTimer(this.category, this.timerForm.value)
    }

    this.close()
    
  }

  close(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

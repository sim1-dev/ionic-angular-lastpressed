import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { Icon } from 'src/app/models/icon.model';
import { Timer } from 'src/app/models/timer.model';
import { LanguageService } from 'src/app/services/language.service';
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
  icons: Icon[]

  timerForm: FormGroup

  constructor(public modalController: ModalController, public formBuilder: FormBuilder, public storageService: StorageService, public languageService: LanguageService) {
  }

  ngOnInit() {

    // Selectable Icons
    this.icons = [
      {name: "alarm", label: this.languageService.dictionary.alarm},
      {name: "medical", label: this.languageService.dictionary.medical},
      {name: "paw", label: this.languageService.dictionary.paw},
      {name: "cafe", label: this.languageService.dictionary.cafe},
      {name: "barbell", label: this.languageService.dictionary.barbell},
      {name: "book", label: this.languageService.dictionary.book},
      {name: "leaf", label: this.languageService.dictionary.leaf},
      {name: "footsteps", label: this.languageService.dictionary.footsteps},
      {name: "water", label: this.languageService.dictionary.water},
      {name: "card", label: this.languageService.dictionary.card},
      {name: "wine", label: this.languageService.dictionary.wine}
    ]

    // Form Default Value
    this.timerForm = this.formBuilder.group({
      name: [this.action == 'edit' && this.timer ? this.timer.name : ''],
      icon: [this.action == 'edit' && this.timer ? this.timer.icon : 'alarm'],
    })

    console.log(this.timerForm)

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

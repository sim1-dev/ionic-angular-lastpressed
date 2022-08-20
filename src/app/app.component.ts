import { Component, ViewEncapsulation } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { Storage } from '@ionic/storage-angular';
import { LanguageService } from './services/language.service';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private storage: Storage, public storageService: StorageService, public langService: LanguageService) { 
    
  }

  async ngOnInit() {

    await this.storage.create()

    if(!await this.storage.get('settings'))
      await this.storageService.resetSettings()

    this.langService.buildDictionary()

    SplashScreen.hide()

  }

}

import { Component, ViewEncapsulation } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { Storage } from '@ionic/storage-angular';
import { Settings } from './models/settings.model';
import { LanguageService } from './services/language.service';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  settings: Settings

  constructor(private storage: Storage, public storageService: StorageService, public languageService: LanguageService) { 
    
  }

  async ngOnInit() {

    await this.storage.create()

    this.settings = await this.storage.get('settings')

    if(!this.settings)
      this.settings = await this.storageService.reset()

    // Refresh settings, adding new variables implented with app updates
    console.log(this.settings, "settings")
    this.settings.init()
    await this.storage.set('settings', this.settings)

    // Build dictionary with users' language
    this.languageService.buildDictionary()

    SplashScreen.hide()

  }

}

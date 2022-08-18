import { Component, ViewEncapsulation } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { Storage } from '@ionic/storage-angular';
import { Settings } from './models/settings.model';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private storage: Storage) {
    
  }

  async ngOnInit() {

    await this.storage.create()

    if(!await this.storage.get('settings'))
      this.storage.set('settings',new Settings())

    SplashScreen.hide()

  }

}

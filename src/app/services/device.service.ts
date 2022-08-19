import { Injectable } from '@angular/core';
import { ThemeDetection, ThemeDetectionResponse } from '@awesome-cordova-plugins/theme-detection/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private themeDetection: ThemeDetection, private globalization: Globalization) { }

  async getTheme() {
    let theme = 'light'
    this.themeDetection.isAvailable()
    .then((res: ThemeDetectionResponse) => {
       if(res.value) {
         this.themeDetection.isDarkModeEnabled().then((res: ThemeDetectionResponse) => {
           theme = 'dark'
           return theme
         })
         .catch((error: any) => console.error(error));
       }
    })
    .catch((error: any) => console.error(error));
    return theme
  }

  async getLanguage() {
    return (await this.globalization.getPreferredLanguage()).value
  }

}

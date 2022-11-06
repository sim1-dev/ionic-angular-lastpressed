import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(public languageService: LanguageService) { }

  getCompactSecondsToString(seconds: number): string {
    let fullText: string = '' 
    var years = Math.floor(seconds / 31536000)
      years > 0 ? fullText += years + `${this.languageService.dictionary.compactYears} ` : true
    var days = Math.floor((seconds % 31536000) / 86400)
      days > 0 ? fullText += days + `${this.languageService.dictionary.compactDays} ` : true
    var hours = Math.floor(((seconds % 31536000) % 86400) / 3600)
      hours > 0 ? fullText += hours + `${this.languageService.dictionary.compactHours} ` : true
    var minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
      minutes > 0 ? fullText += minutes + `${this.languageService.dictionary.compactMinutes} ` : true
    var seconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60)
      seconds > 0 ? fullText += seconds + `${this.languageService.dictionary.compactSeconds} ` : true
    return fullText !== '' ? fullText : this.languageService.dictionary.now
  }

  getExtendedSecondsToString(seconds: number): string {
    let fullText: string = '' 
    var years = Math.floor(seconds / 31536000)
      years > 0 ? fullText += years + ` ${this.languageService.dictionary.years} ` : true
    var days = Math.floor((seconds % 31536000) / 86400)
      days > 0 ? fullText += days + ` ${this.languageService.dictionary.days} ` : true
    var hours = Math.floor(((seconds % 31536000) % 86400) / 3600)
      hours > 0 ? fullText += hours + ` ${this.languageService.dictionary.hours} ` : true
    var minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
      minutes > 0 ? fullText += minutes + ` ${this.languageService.dictionary.minutes} ` : true
    var seconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60)
      seconds > 0 ? fullText += seconds + ` ${this.languageService.dictionary.seconds} ` : true
    return fullText !== '' ? fullText + this.languageService.dictionary.ago : fullText + this.languageService.dictionary.now
  }

  getActualSeconds(seconds: number): number {
    return Math.round((((seconds % 31536000) % 86400) % 3600) % 60)
  }

}

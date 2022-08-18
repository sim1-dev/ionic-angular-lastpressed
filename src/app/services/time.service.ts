import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getCompactSecondsToString(seconds: number): string {
    let fullText: string = '' 
    var years = Math.floor(seconds / 31536000)
      years > 0 ? fullText += years + 'y ' : true
    var days = Math.floor((seconds % 31536000) / 86400)
      days > 0 ? fullText += days + 'd ' : true
    var hours = Math.floor(((seconds % 31536000) % 86400) / 3600)
      hours > 0 ? fullText += hours + 'h ' : true
    var minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
      minutes > 0 ? fullText += minutes + 'm ' : true
    var seconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60)
      seconds > 0 ? fullText += seconds + 's ' : true
    return fullText !== '' ? fullText : 'now'
  }

  getExtendedSecondsToString(seconds: number): string {
    let fullText: string = '' 
    var years = Math.floor(seconds / 31536000)
      years > 0 ? fullText += years + ' years ' : true
    var days = Math.floor((seconds % 31536000) / 86400)
      days > 0 ? fullText += days + ' days ' : true
    var hours = Math.floor(((seconds % 31536000) % 86400) / 3600)
      hours > 0 ? fullText += hours + ' hours ' : true
    var minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
      minutes > 0 ? fullText += minutes + ' minutes ' : true
    var seconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60)
      seconds > 0 ? fullText += seconds + ' seconds ' : true
    return fullText !== '' ? fullText + 'ago' : fullText +'now'
  }

}

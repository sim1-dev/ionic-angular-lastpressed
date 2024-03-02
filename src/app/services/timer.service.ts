import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { SettingsService } from './settings.service';
import { Timer } from '../models/timer.model';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(public settingsService: SettingsService) { }

  //Timers
  async getTimers(categoryId: number) {
    return (await this.settingsService.get()).categories.find(category => category.id == categoryId).timers
  }

  async getTimerDetails(categoryId: number, timerId: number) {
    return (await this.settingsService.get()).categories.find(category => category.id == categoryId).timers.find(timer => timer.id == timerId)
  }

  async createTimer(category: Category, timer: Timer) {

    let settings = await this.settingsService.get()

    let newTimer: Timer = { 
      id: category.timers[category.timers.length - 1] ? category.timers[category.timers.length - 1].id + 1 : 1, 
      name: timer.name, 
      icon: timer.icon, 
      lastPressed: new Date() 
    }

    settings.categories.find(settingsCategory => settingsCategory.id == category.id)?.timers.push(newTimer)

    console.log(newTimer, "newTimer")

    await this.settingsService.set(settings)
  }

  async editTimer(category: Category, timer: Timer) {

    let settings = await this.settingsService.get()
    let settingsCategory = settings.categories.find(settingsCategory => settingsCategory.id == category.id)

    console.log(timer, "timer")

    if(settingsCategory.timers?.length > 0) {
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).name = timer.name
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).icon = timer.icon
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).lastPressed = timer.lastPressed
    }
      
    await this.settingsService.set(settings)

  }

  async deleteTimer(category: Category, timer: Timer) {
    let settings = await this.settingsService.get()

    settings.categories.find(settingsCategory => settingsCategory.id == category.id).timers = settings.categories.find(
        settingsCategory => settingsCategory.id == category.id
      ).timers.filter(
          settingsTimer => settingsTimer.id !== timer.id
        )

    await this.settingsService.set(settings)

    return
  }

  async resetTimer(category: Category, timer: Timer) {

    let settings = await this.settingsService.get()
    let settingsCategory = settings.categories.find(settingsCategory => settingsCategory.id == category.id)

    if(settingsCategory.timers?.length > 0)
      settingsCategory.timers.find(settingsTimer => settingsTimer.id == timer.id).lastPressed = new Date()

    await this.settingsService.set(settings)

  }
}

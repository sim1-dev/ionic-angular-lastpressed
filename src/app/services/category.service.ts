import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { SettingsService } from './settings.service';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public settingsService: SettingsService) { }

  async get(): Promise<Category[]> {
    let settings: Settings = await this.settingsService.get()

    if(!settings)
      return [] as Category[]

    return settings.categories ?? [] as Category[]
  }

  async getDetails(categoryId: number) {
    let settings: Settings = await this.settingsService.get()
    return settings.categories.find(category => category.id == categoryId)
  }

  async create(categoryName: string) {
    let settings: Settings = await this.settingsService.get()
    let newCategory = { id: settings.categories[settings.categories.length - 1].id + 1, name: categoryName, timers: [] }

    settings.categories.push(newCategory)

    await this.settingsService.set(settings)

    return
  }

  async edit(categoryId: number, newCategoryName: string) {

    let settings: Settings = await this.settingsService.get()
    
    settings.categories.find(category => {return category.id == categoryId}).name = newCategoryName

    await this.settingsService.set(settings)

    return
  }

  async delete(categoryId: number) {
    let settings: Settings = await this.settingsService.get()

    settings.categories = settings.categories.filter(category => category.id !== categoryId)

    await this.settingsService.set(settings)

    return
  }
}

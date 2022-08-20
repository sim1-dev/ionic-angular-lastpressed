import { Injectable } from '@angular/core';
import { Dictionary, DictionaryInterface } from '../dictionary/dictionary.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  dictionaryController: Dictionary
  dictionary: DictionaryInterface

  constructor(public storageService: StorageService) {
    this.dictionaryController = new Dictionary(storageService)
    this.dictionary = this.dictionaryController.dictionary
  }

  async buildDictionary() {
    this.dictionary = (await this.dictionaryController.build())
  }
}


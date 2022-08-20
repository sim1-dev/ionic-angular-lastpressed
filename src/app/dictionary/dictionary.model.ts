import * as DictionaryIT from './dictionaryIT';
import * as DictionaryEN from './dictionaryEN';
import { StorageService } from '../services/storage.service';

export class Dictionary {
    userLanguage: string
    dictionary: DictionaryInterface

    constructor(public storageService: StorageService) {
        this.dictionary = new DictionaryEN.Dictionary() 
    }

    async build() {
        let settings = await this.storageService.getSettings()
        
        if (settings.language)
            this.userLanguage = settings.language
        else
            this.userLanguage = 'en'

        switch (this.userLanguage) {
            case 'it':
                this.dictionary = new DictionaryIT.Dictionary()
                break
            default:
                this.dictionary = new DictionaryEN.Dictionary()
                break
        }
        return this.dictionary
    }
}

export interface DictionaryInterface {
    timers
    addTimer
    timerName
    iconPreview
}
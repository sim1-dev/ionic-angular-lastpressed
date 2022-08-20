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
    timer
    timers
    addTimer
    timerName
    iconPreview
    timerDetail
    category
    categories
    categoryName
    noCategories
    addCategory
    categoryNameExists
    categoryNameRequired
    categoryTimersWillBeLost
    settings
    general
    advanced
    theme
    light
    dark
    language
    removeAds
    removeAdsDescription
    importSettings
    importSettingsDescription
    exportSettings
    exportSettingsDescription
    resetSettings
    resetSettingsDescription
    resetSettingsPrompt
    settingsResetSuccess
    settingsExportSuccess
    settingsExportFailure
    importSettingsPrompt
    settingsImportSuccess
    settingsImportFailure
    settingsSaveSuccess
    requiresAppReload
    add
    save
    edit
    delete
    reset
    import
    export: string // error without type definition xD
    cancel
    buttonPressed
    deletePrompt
    deletedSuccess
    savedSuccess
    loading
    alert
    saving
}
import * as IT from './IT';
import * as EN from './EN';
import { StorageService } from '../services/storage.service';

export class Dictionary {
    appLanguage: string
    dictionary: DictionaryInterface

    constructor(public storageService: StorageService) {
        this.dictionary = new EN.Dictionary() 
    }

    async build() {
        let settings = await this.storageService.getSettings()
        
        this.appLanguage = settings?.language ? settings.language : 'en'

        switch (this.appLanguage) {
            case 'it':
                this.dictionary = new IT.Dictionary()
                break
            default:
                this.dictionary = new EN.Dictionary()
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
    timerNameRequired

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
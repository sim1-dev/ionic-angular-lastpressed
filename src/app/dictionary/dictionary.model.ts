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

    // Misc
    name
    icon

    // Account Types
    free
    premium

    // Icon Types
    alarm
    medical
    paw
    cafe
    barbell
    book
    leaf
    footsteps
    water
    card
    wine

    // Time
    now
    years
    days
    hours
    minutes
    seconds
    ago
    compactYears
    compactDays
    compactHours
    compactMinutes
    compactSeconds

    // Timers
    timer
    timers
    addTimer
    timerName
    iconPreview
    timerDetail
    timerNameRequired

    // Categories
    category
    categories
    categoryName
    noCategories
    addCategory
    categoryNameExists
    categoryNameRequired
    categoryTimersWillBeLost

    // Settings
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

    // Actions
    add
    save
    edit
    delete
    reset
    import
    export: string // error without type definition xD
    cancel

    // General statuses
    loading
    buttonPressed
    deletePrompt
    deletedSuccess
    savedSuccess
    alert
    saving
}
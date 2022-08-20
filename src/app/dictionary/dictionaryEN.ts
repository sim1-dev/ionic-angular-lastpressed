import { DictionaryInterface } from './dictionary.model';

export class Dictionary implements DictionaryInterface {

    //Timers
    timer = "Timer"
    timers = "Timers"
    addTimer = "Add Timer"
    timerName = "Timer Name"
    iconPreview = "Icon Preview"
    timerDetail = "Timer Detail"

    //Categories
    category = "Category"
    categories = "Categories"
    categoryName = "Category Name"
    addCategory = "Add Category"
    // categoryIcon = "Category Icon"
    // categoryDetail = "Category Detail"
    noCategories = "No custom categories yet. Let's create one"
    categoryNameExists = "Category already exists"
    categoryNameRequired = "Category name is required"
    categoryTimersWillBeLost = "All category timers will be lost aswell."

    //Settings
    settings = "Settings"
    general = "General"
    advanced = "Advanced"
    theme = "Theme"
    light = "Light"
    dark = "Dark"
    language = "Language"
    removeAds = "Remove ADS"
    removeAdsDescription = "Remove all in-app ADS forever"
    importSettings = "Import settings" 
    importSettingsDescription = "Import file from APP_DATA folder"
    exportSettings = "Export settings"
    exportSettingsDescription = "Export file in APP_DATA folder"
    resetSettings = "Reset settings"
    resetSettingsDescription = "Reset all settings, useful if app breaks"
    resetSettingsPrompt = "Are you sure you want to reset all settings?"
    settingsResetSuccess = "Settings resetted successfully"
    settingsExportSuccess = "Settings exported successfully:"
    settingsExportFailure = "Error exporting settings:"
    importSettingsPrompt = "Are you sure you want to import setting from {{appDir}}/files/lastpressed/settings.json? This will overwrite your current settings."
    settingsImportSuccess = "Settings imported successfully"
    settingsImportFailure = "Error importing settings:"
    settingsSaveSuccess = "Settings saved successfully"
    requiresAppReload = "App reload required"

    //Actions
    save = "Save"
    add = "Add"
    edit = "Edit"
    delete = "Delete"
    reset = "Reset"
    import = "Import"
    export = "Export"
    cancel = "Cancel"

    //General statuses
    loading = "Loading..."
    deletePrompt = "Are you sure you want to delete"
    deletedSuccess = "deleted successfully."
    savedSuccess = "saved successfully."
    buttonPressed = "button pressed!"
    alert = "Alert"
    saving = "Saving..."

}
import { DictionaryInterface } from './dictionary.model';

export class Dictionary implements DictionaryInterface {
    timer = "Contatore"
    timers = "Contatori"
    addTimer = "Aggiungi Contatore"
    timerName = "Nome Contatore"
    iconPreview = "Anteprima Icona"
    timerDetail = "Dettagli Contatore"

    //Categories
    category = "Categoria"
    categories = "Categorie"
    categoryName = "Nome Categoria"
    addCategory = "Crea Categoria"
    // categoryIcon = "Category Icon"
    // categoryDetail = "Category Detail"
    noCategories = "Nessuna categories esistente. Creiamone una"
    categoryNameExists = "La categoria è già esistente"
    categoryNameRequired = "Il nome della categoria è obbligatorio"
    categoryTimersWillBeLost = "Anche tutti i suoi contatori spariranno."

    //Settings
    settings = "Impostazioni"
    general = "Generale"
    advanced = "Avanzate"
    theme = "Tema"
    light = "Chiaro"
    dark = "Scuro"
    language = "Lingua"
    removeAds = "Rimuovi pubblicità"
    removeAdsDescription = "Rimuovi permanentemente le pubblicità in app"
    importSettings = "Importa impostazioni"
    importSettingsDescription = "Importa file dalla cartella APP_DATA"
    exportSettings = "Esporta impostazioni"
    exportSettingsDescription = "Esporta file nella cartella APP_DATA"
    resetSettings = "Ripristina impostazioni"
    resetSettingsDescription = "Ripristina le impostazioni, utile se si rompe qualcosa in app"
    resetSettingsPrompt = "Sei sicuro di voler ripristinare tutte le impostazioni?"
    settingsResetSuccess = "Impostazioni ripristinate correttamente."
    settingsExportSuccess = "Impostazioni esportate correttamente:"
    settingsExportFailure = "Errore esportazione impostazioni:"
    importSettingsPrompt = "Sei sicuro di voler importare le impostazioni da {{appDir}}/files/lastpressed/settings.json? Le tue impostazioni correnti verranno sovrascritte."
    settingsImportSuccess = "Impostazioni importate correttamente"
    settingsImportFailure = "Errore importazione impostazioni:"
    settingsSaveSuccess = "Impostazioni salvate correttamente"
    requiresAppReload = "Richiede una ricarica dell'app"

    //Actions
    save = "Salva"
    add = "Aggiungi"
    edit = "Modifica"
    delete = "Elimina"
    reset = "Resetta"
    import = "Importa"
    export = "Esporta"
    cancel = "Annulla"

    //General statuses
    loading = "Caricamento..."
    buttonPressed = "pulsante premuto!"
    deletePrompt = "Sei sicuro di voler eliminare"
    deletedSuccess = "eliminato con successo."
    savedSuccess = "salvato correttamente."
    alert = "Attenzione"
    saving = "Salvataggio in corso..."

}
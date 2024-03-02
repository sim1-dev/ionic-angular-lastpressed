import { DictionaryInterface } from './dictionary.model';

export class Dictionary implements DictionaryInterface {

    // Misc
    name = "Nome"
    icon = "Icona"

    // Account Types
    free = "GRATIS"
    premium = "PRO"

    // Icon Types
    alarm = "Sveglia"
    medical = "Medicina"
    paw = "Zampa"
    cafe = "Caffè"
    barbell = "Bilanciere"
    book = "Libro"
    leaf = "Foglia"
    footsteps = "Orme"
    water = "Goccia d'acqua"
    card = "Carta di credito"
    wine = "Vino"

    // Time
    now = "adesso"
    years = "anni"
    days = "giorni"
    hours = "ore"
    minutes = "minuti"
    seconds = "secondi"
    ago = "fa"
    compactYears = "a"
    compactDays = "g"
    compactHours = "o"
    compactMinutes = "m"
    compactSeconds = "s"

    // Timers
    timer = "Contatore"
    timers = "Contatori"
    addTimer = "Aggiungi Contatore"
    timerName = "Nome Contatore"
    iconPreview = "Anteprima"
    timerDetail = "Dettagli Contatore"
    timerNameRequired = "Il nome del contatore è obbligatorio"

    // Categories
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

    // Settings
    settings = "Impostazioni"
    general = "Generale"
    advanced = "Avanzate"
    theme = "Tema"
    light = "Chiaro"
    dark = "Scuro"
    language = "Lingua"
    removeAds = "Rimuovi pubblicità"
    removeAdsDescription = "Rimuovi le pubblicità in app"
    import = "Importa impostazioni"
    importDescription = "Importa file dalla cartella APP_DATA"
    export = "Esporta impostazioni"
    exportDescription = "Esporta file nella cartella APP_DATA"
    reset = "Ripristina impostazioni"
    resetDescription = "Ripristina le impostazioni, utile se si rompe qualcosa in app"
    resetPrompt = "Sei sicuro di voler ripristinare tutte le impostazioni?"
    settingsResetSuccess = "Impostazioni ripristinate correttamente."
    settingsExportSuccess = "Impostazioni esportate correttamente:"
    settingsExportFailure = "Errore esportazione impostazioni:"
    importPrompt = "Sei sicuro di voler importare le impostazioni da {{appDir}}/files/lastpressed/settings.json? Le tue impostazioni correnti verranno sovrascritte."
    settingsImportSuccess = "Impostazioni importate correttamente"
    settingsImportFailure = "Errore importazione impostazioni:"
    settingsSaveSuccess = "Impostazioni salvate correttamente"
    requiresAppReload = "Richiede una ricarica dell'app"

    // Actions
    save = "Salva"
    add = "Aggiungi"
    edit = "Modifica"
    delete = "Elimina"
    reset = "Resetta"
    import = "Importa"
    export = "Esporta"
    cancel = "Annulla"

    // General statuses
    loading = "Caricamento..."
    buttonPressed = "premuto!"
    deletePrompt = "Sei sicuro di voler eliminare"
    deletedSuccess = "eliminato con successo."
    savedSuccess = "salvato correttamente."
    alert = "Attenzione"
    saving = "Salvataggio in corso..."

}
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

    //Actions
    save = "Salva"
    add = "Aggiungi"
    edit = "Modifica"
    delete = "Elimina"
    reset = "Resetta"
    cancel = "Annulla"

    //Statuses
    loading = "Caricamento..."
    buttonPressed = "pulsante premuto!"
    deletePrompt = "Sei sicuro di voler eliminare"
    deletedSuccess = "eliminato con successo."
    alert = "Attenzione"
    saving = "Salvataggio in corso..."

}
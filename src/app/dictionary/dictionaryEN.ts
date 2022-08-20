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

    //Actions
    save = "Save"
    add = "Add"
    edit = "Edit"
    delete = "Delete"
    reset = "Reset"
    cancel = "Cancel"

    //Statuses
    loading = "Loading..."
    deletePrompt = "Are you sure you want to delete"
    deletedSuccess = "deleted successfully."
    buttonPressed = "button pressed!"
    alert = "Alert"
    saving = "Saving..."

}
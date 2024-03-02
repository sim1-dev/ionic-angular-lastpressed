import { AccountType } from "./account-types.model";
import { Category } from "./category.model";
import { Theme } from "./themes.model";

export class Settings {
    constructor(
        public accountType: string = AccountType.FREE,
        public theme: string = Theme.LIGHT,
        public language: string = 'en',
        public categories: Category[] = [{id: 1, name: 'General', timers: [] }]
    ) {
    }

    public init() {
        this.initAccountType()
        this.initTheme()
        this.initLanguage()
        this.initCategories()
        return this
    }

    // Init functions, will be required when pushing new updates in settings after app release
    initAccountType() {
        if(!this.accountType)
            this.accountType = AccountType.FREE
    }

     initTheme() {
        if(!this.theme)
            this.theme = Theme.LIGHT
    }

     initLanguage() {
        if(!this.language)
            this.language = "en"
    }

     initCategories() {
        if(!this.categories)
            this.categories = [{id: 1, name: 'General', timers: [] }]
    }

}


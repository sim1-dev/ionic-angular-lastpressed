import { AccountType } from "./account-types.model";
import { Category } from "./category.model";
import { Theme } from "./themes.model";

export class Settings {
    constructor(
        public accountType: string = AccountType.FREE,
        public theme: string = Theme.LIGHT,
        public language: string = 'en',
        public categories: Category[] = [{id: 1, name: 'General', timers: [] }]
    ) { }
}


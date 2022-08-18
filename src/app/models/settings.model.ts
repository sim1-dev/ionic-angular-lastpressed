import { Category } from "./category.model";
import { Theme } from "./themes.model";

export class Settings {
    constructor(
        public theme: string = Theme.DARK,
        public language: string = 'en',
        public categories: Category[] = [{id: 1, name: 'General', timers: [] }]
    ) { }
}
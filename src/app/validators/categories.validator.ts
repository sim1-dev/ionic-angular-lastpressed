import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateCategory(control: AbstractControl): ValidationErrors | null {
    if(this.categories.find(category => category.name == control.value))
        return { categoryPresent: true }
    return null
}
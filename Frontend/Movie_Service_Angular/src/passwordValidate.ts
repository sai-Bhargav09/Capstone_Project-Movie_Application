import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidate():ValidatorFn{

    return (control:AbstractControl):ValidationErrors | null =>{       
        // Minimum eight and maximum 10 characters, at least one uppercase letter,
        //  one lowercase letter, one number and one special character:
        // (?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
        if( regex.test(control.value)){
            return null;
        }
        else{
            return {passwordValidate:{value:control.value}};
        }
    }
}
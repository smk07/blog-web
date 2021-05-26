import { AbstractControl, FormGroup } from '@angular/forms';

export function mustMatch(password:string,rePassword: string){
    return (formGroup:FormGroup)=>{
        const passwordControl = formGroup.controls[password];
        const rePasswordControl = formGroup.controls[rePassword];

        if(rePasswordControl.errors && !rePasswordControl.errors.mustMatch){
            return;
        }
        
        if(rePasswordControl.value != passwordControl.value){
            rePasswordControl.setErrors({mustMatch:true});
        }
        else{
            rePasswordControl.setErrors(null);
        }
    }
}
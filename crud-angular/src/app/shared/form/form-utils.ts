import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtils {

  constructor() { }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string){
    const field = formGroup.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório'
    }

    if(field?.hasError('minlength')){
      const requiredLenght : number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
          return `Campo com menos de ${requiredLenght} caracteres`
        }

    if(field?.hasError('maxlength')){
      const requiredLength : number = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Campo com mais de ${requiredLength} caracteres`
    }

    return 'Campo Inválido'
  }


  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup){
    const formArray = formGroup.get('lessons') as UntypedFormArray;

  }

}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { CoursesService } from '../services/courses';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-course-form',
  imports: [
    AppMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm {

  form: FormGroup

  private readonly snackBar = inject(MatSnackBar);
  constructor(private readonly formBuilder: FormBuilder,
    private readonly service: CoursesService,
    private readonly location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.insertOrUpdate(this.form.value)
    .subscribe(result => this.onSuccess(),
    error => this.onError());
  };

  onCancel(){
    this.location.back();
  };

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!', '',{
            duration: 5000
          });
          this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar o curso', '',{
            duration: 5000
          })
  }
}

import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../../../shared/app-material/app-material-module';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-course-form',
  imports: [
    AppMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm implements OnInit{

    form!: FormGroup<{
    name: FormControl<string>,
    category: FormControl<string>
  }>;

  private readonly snackBar = inject(MatSnackBar);
  constructor( private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: CoursesService,
    private readonly location: Location) {
    //this.form
  }

  onCancel(){
    this.location.back();
  };

  onSubmit(){
    this.service.insertOrUpdate(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),
      category: this.formBuilder.control('')
    });
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!', '',{
            duration: 5000
          });
          this.onCancel();
  };

  private onError(){
    this.snackBar.open('Erro ao salvar o curso', '',{
            duration: 5000
          })
  };
}

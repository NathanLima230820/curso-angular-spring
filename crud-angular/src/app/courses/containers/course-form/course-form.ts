import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../../../shared/app-material/app-material-module';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';


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
      _id: FormControl<string>,
    name: FormControl<string>,
    category: FormControl<string>
  }>;

  private readonly snackBar = inject(MatSnackBar);
  constructor( private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: CoursesService,
    private readonly location: Location,
    private readonly route: ActivatedRoute) {
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
    const course: Course = this.route.snapshot.data['course']
    console.log(course)

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, Validators.required]
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

  getErrorMessage(fieldName: string){

    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório'
    }

    if(field?.hasError('minlength')){
          return 'Campo com menos de 5 caracteres'
        }

    if(field?.hasError('maxlength')){
          return 'Campo com mais de 100 caracteres'
        }

    return 'Campo Inválido'

  }

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.form.get('name')?.setValue(value);
  }
}

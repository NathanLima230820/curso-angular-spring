import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../../../shared/app-material/app-material-module';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { FormUtils } from '../../../shared/form/form-utils.service';


@Component({
  selector: 'app-course-form',
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm implements OnInit{

    form!: FormGroup;

  private readonly snackBar = inject(MatSnackBar);
  constructor( private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: CoursesService,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    public formUtils: FormUtils) {  }

  ngOnInit(): void {
  const course: Course = this.route.snapshot.data['course']
  this.form = this.formBuilder.group({
    _id: [course._id],
    name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: [course.category, Validators.required],
    lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
  });
  }


  onCancel(){
    this.location.back();
  };

  onSubmit(){
    if (this.form.valid){
      this.service.insertOrUpdate(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
    } else{
      this.formUtils.validateAllFormFields(this.form);
    }

  };


  private retrieveLessons(course: Course){
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]]
    });
  }

  getLessonsFormArray(){
    return (<UntypedFormArray>this.form.get('lessons')).controls;
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


  isFormArrayRequired() : boolean {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required')  && lessons.touched ;
  }

  addLesson(){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  deleteLesson(index: number){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
    }

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.form.get('name')?.setValue(value);
  }
}

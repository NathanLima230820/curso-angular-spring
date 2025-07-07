package com.nathan.crud_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nathan.crud_spring.model.Course;
import com.nathan.crud_spring.service.CoursesService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Validated
@RestController
@RequestMapping("/api/courses")

public class CourseController {
    
    private final CoursesService coursesService;

    public CourseController(CoursesService coursesService) {
        this.coursesService = coursesService;
    }

    @GetMapping
    public List<Course> list() {
        return coursesService.list();
    }

    @GetMapping("/{id}")
    public Course findById(@PathVariable @NotNull @Positive Long id){
        return coursesService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course insert(@RequestBody @Valid Course course){
        return coursesService.insert(course);
    }
    
    @PutMapping("/{id}")
    public Course update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid Course course) {
        return coursesService.update(id, course);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
      coursesService.delete(id);
    }

}

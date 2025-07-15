package com.nathan.crud_spring.controller;


import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nathan.crud_spring.dto.CourseDTO;
import com.nathan.crud_spring.dto.CoursePageDTO;
import com.nathan.crud_spring.service.CoursesService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

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
    public CoursePageDTO list(@RequestParam(defaultValue = "0") @PositiveOrZero int page, 
                              @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize) {
      return coursesService.list(page, pageSize);
    }


    @GetMapping("/{id}")
    public CourseDTO findById(@PathVariable @NotNull @Positive Integer id){
        return coursesService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CourseDTO insert(@RequestBody @Valid @NotNull CourseDTO course){
        return coursesService.insert(course);
    }
    
    @PutMapping("/{id}")
    public CourseDTO update(@PathVariable @NotNull @Positive Integer id, @RequestBody @Valid @NotNull CourseDTO course) {
        return coursesService.update(id, course);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Integer id){
      coursesService.delete(id);
    }

}

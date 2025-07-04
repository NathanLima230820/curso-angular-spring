package com.nathan.crud_spring.service;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.nathan.crud_spring.model.Course;
import com.nathan.crud_spring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
@Validated
public class CoursesService {
    
        private CourseRepository courseRepository;

        public CoursesService(CourseRepository courseRepository){
            this.courseRepository = courseRepository;
        }

        public List<Course> list() {
        return courseRepository.findAll();
    }

    public Optional<Course> findById(@PathVariable @NotNull @Positive Long id){
        return courseRepository.findById(id);
    }

    public Course insert( @Valid Course course){
        return courseRepository.save(course);
    }

    public Optional<Object> update(@NotNull @Positive Long id, @Valid Course course) {
        return courseRepository.findById(id)
            .map(recordFound -> {
                recordFound.setName(course.getName());
                recordFound.setCategory(course.getCategory());
                return courseRepository.save(recordFound);
            });
    }

    public boolean delete(@PathVariable @NotNull @Positive Long id){
       return courseRepository.findById(id)
        .map(recordFound -> {
                courseRepository.deleteById(id);
                return true;
        })
        .orElse(false);
    }
}

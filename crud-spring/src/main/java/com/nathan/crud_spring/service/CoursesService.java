package com.nathan.crud_spring.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.nathan.crud_spring.dto.CourseDTO;
import com.nathan.crud_spring.dto.CoursePageDTO;
import com.nathan.crud_spring.dto.mapper.CourseMapper;
import com.nathan.crud_spring.exceptions.RecordNotFoundException;
import com.nathan.crud_spring.model.Course;
import com.nathan.crud_spring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Service
@Validated
public class CoursesService {
    
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

  

    public CoursesService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public CoursePageDTO list(@PositiveOrZero int page, 
                              @Positive @Max(100) int pageSize){
        Page<Course> pageCourse = courseRepository.findAll(PageRequest.of(page, pageSize));
        List<CourseDTO> courses = pageCourse.get().map(courseMapper::toDTO).toList();
        return new CoursePageDTO(courses, pageCourse.getTotalElements(), pageCourse.getTotalPages());
    }

/*     public List<CourseDTO> list() {
        return courseRepository.findAll().stream()
            .map(courseMapper::toDTO)
            .toList();
    } */

    public CourseDTO findById( @NotNull @Positive Integer id){
        return courseRepository.findById(id)
            .map(courseMapper::toDTO)
            .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO insert(@Valid @NotNull CourseDTO courseDTO) {
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(courseDTO)));
    }

    public CourseDTO update(@NotNull @Positive Integer id, @Valid @NotNull CourseDTO courseDTO) {
        return courseRepository.findById(id)
            .map(recordFound -> {
                Course course = courseMapper.toEntity(courseDTO);
                recordFound.setName(courseDTO.name());
                recordFound.setCategory(courseMapper.convertCategoryValue(courseDTO.category()));
                recordFound.getLessons().clear();
                course.getLessons().forEach(recordFound.getLessons()::add);
                return courseMapper.toDTO(courseRepository.save(recordFound));
            }).orElseThrow(() -> new RecordNotFoundException(id));
    } 

    public void delete(@NotNull @Positive Integer id){
        courseRepository.delete(courseRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}

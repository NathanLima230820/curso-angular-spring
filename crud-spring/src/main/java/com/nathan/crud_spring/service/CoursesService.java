package com.nathan.crud_spring.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.nathan.crud_spring.dto.CourseDTO;
import com.nathan.crud_spring.dto.mapper.CourseMapper;
import com.nathan.crud_spring.exceptions.RecordNotFoundException;
import com.nathan.crud_spring.model.Course;
import com.nathan.crud_spring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
@Validated
public class CoursesService {
    
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

  

    public CoursesService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public List<CourseDTO> list() {
        return courseRepository.findAll().stream()
            .map(courseMapper::toDTO)
            .toList();
    }

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

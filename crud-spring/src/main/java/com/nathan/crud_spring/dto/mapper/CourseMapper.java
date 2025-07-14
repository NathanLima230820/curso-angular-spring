package com.nathan.crud_spring.dto.mapper;

import java.util.List;
import org.springframework.stereotype.Component;

import com.nathan.crud_spring.dto.CourseDTO;
import com.nathan.crud_spring.dto.LessonDTO;
import com.nathan.crud_spring.enums.Category;
import com.nathan.crud_spring.model.Course;
import com.nathan.crud_spring.model.Lesson;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if(course == null) {
            return null;
        }

        List<LessonDTO> lessons = course.getLessons().stream()
                .map(lesson -> new LessonDTO(lesson.getId(), lesson.getName(), lesson.getYoutubeUrl()))
                .toList();
        return new CourseDTO(course.getId(), course.getName(), course.getCategory().getValue(),
                lessons);
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(convertCategoryValue(courseDTO.category()));

        List<Lesson> lessons = courseDTO.lessons().stream().map(lessonDTO -> {
            var lesson = new Lesson();
            if(lessonDTO.id() != null) {
                lesson.setId(lessonDTO.id());
            }
            lesson.setName(lessonDTO.name());
            lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
            lesson.setCourse(course); 
            return lesson;
        }).toList();
        course.setLessons(lessons);

        return course;
    }

    public Category convertCategoryValue(String value){
        if (value == null){
            return null;
        }
        return switch (value) {
            case "Front-end" -> Category.FRONTEND;
            case "Back-end" -> Category.BACKEND;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }

}

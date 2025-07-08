package com.nathan.crud_spring;

import com.nathan.crud_spring.model.Course;
import com.nathan.crud_spring.model.Lesson;
import com.nathan.crud_spring.repository.CourseRepository;

import com.nathan.crud_spring.enums.Category;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudSpringApplication {

    private final CourseRepository courseRepository;

    CrudSpringApplication(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDataBase(){
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();
			c.setName("Angular com Spring");
			c.setCategory(Category.FRONTEND);

			Lesson l = new Lesson();
			l.setName("Introdução ao Angular");
			l.setYoutubeUrl("https://www.youtube.com/watch?v=3qBXWUpo9fY");
			l.setCourse(c);
			c.getLessons().add(l);
			courseRepository.save(c);
		};
	}

}

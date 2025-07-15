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

			for (int i = 0; i <= 20; i++) {


			Course c = new Course();
			c.setName("Angular com Spring " + i);
			c.setCategory(Category.FRONTEND);

			Lesson l1 = new Lesson();
			l1.setName("Introdução ao Angular");
			l1.setYoutubeUrl("watch?v=3qBXWUpo9fY");
			l1.setCourse(c);
			c.getLessons().add(l1);
			courseRepository.save(c);

			Lesson l2 = new Lesson();
			l2.setName("Introdução ao Spring");
			l2.setYoutubeUrl("watch?v=3qBXWUpo9fY");
			l2.setCourse(c);
			c.getLessons().add(l2);
			courseRepository.save(c);
			}
		};
	}

}

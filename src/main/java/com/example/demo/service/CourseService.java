package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.CourseRepository;
import org.springframework.stereotype.Service;
import com.example.demo.model.Course;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {

        this.courseRepository = courseRepository;
    }

    public void saveCourse(String name, String code, User teacher){
        //implement role validation on the future
        Course newCourse = new Course(name, code);
        newCourse.setTeacher(teacher);
        courseRepository.save(newCourse);
    }
}

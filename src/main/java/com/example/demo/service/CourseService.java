package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.example.demo.model.Course;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {

        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public Course saveCourse(String name, String code, Long teacherId){
        //implement role validation on the future
        User teacher = userRepository.findById(teacherId).orElseThrow();
        Course newCourse = new Course(name, code);
        newCourse.setTeacher(teacher);
        return courseRepository.save(newCourse);
    }
}

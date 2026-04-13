package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.*;
import com.example.demo.service.CourseService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class SampleDataService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;
    private final CourseService courseService;

    public SampleDataService(UserRepository userRepository, QuestionRepository questionRepository, QuizzRepository quizzRepository, CourseService courseService) {

        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.quizzRepository = quizzRepository;
        this.courseService = courseService;
    }

    @PostConstruct
    public void init(){

        try {
            User test = new User("test", "test");
            test = userRepository.save(test);
            courseService.saveCourse("testCourse", "CODE123", test.getId());
        }catch (Exception e){

            System.err.println(e.getMessage());
        }
    }
}

package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class SampleDataService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;
    private final CourseRepository courseRepository;

    public SampleDataService(UserRepository userRepository, QuestionRepository questionRepository, QuizzRepository quizzRepository, CourseRepository courseRepository) {

        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.quizzRepository = quizzRepository;
        this.courseRepository = courseRepository;
    }

    @PostConstruct
    public void init(){

        try {
            userRepository.save(new User("test", "test"));
        }catch (Exception e){

            System.err.println(e.getMessage());
        }
    }
}

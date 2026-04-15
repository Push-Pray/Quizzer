package com.example.quizzer;

import com.example.quizzer.model.User;
import com.example.quizzer.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class SampleDataService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;

    public SampleDataService(UserRepository userRepository, QuestionRepository questionRepository, QuizzRepository quizzRepository) {

        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.quizzRepository = quizzRepository;
    }

    @PostConstruct
    public void init(){

        try {
            User test = new User("test", "test");
            test = userRepository.save(test);
        }catch (Exception e){

            System.err.println(e.getMessage());
        }
    }
}

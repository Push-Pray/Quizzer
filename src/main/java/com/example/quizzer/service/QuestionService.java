package com.example.quizzer.service;

import com.example.quizzer.DTO.QuestionInfoDTO;
import com.example.quizzer.mapper.QuestionMapper;
import com.example.quizzer.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper) {

        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }
}

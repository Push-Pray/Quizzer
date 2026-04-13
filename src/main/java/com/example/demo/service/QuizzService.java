package com.example.demo.service;

import com.example.demo.DTO.QuizzInfoDTO;
import com.example.demo.mapper.QuizzMapper;
import com.example.demo.model.Quizz;
import com.example.demo.model.User;
import com.example.demo.repository.QuizzRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class QuizzService {

    private final QuizzRepository quizzRepository;
    private final QuizzMapper quizzMapper;

    public QuizzService(QuizzRepository quizzRepository, QuizzMapper quizzMapper) {

        this.quizzRepository = quizzRepository;
        this.quizzMapper = quizzMapper;
    }

    public QuizzInfoDTO saveDTO(QuizzInfoDTO quizzInfoDTO){

        Quizz newQuizz = quizzMapper.toDomain(quizzInfoDTO);
        return quizzMapper.toDTO(quizzRepository.save(newQuizz));
    }
}

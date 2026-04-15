package com.example.quizzer.service;

import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.mapper.QuizzMapper;
import com.example.quizzer.model.Quizz;
import com.example.quizzer.model.User;
import com.example.quizzer.repository.QuizzRepository;
import com.example.quizzer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    // handle the deletion logic
    public QuizzInfoDTO deleteById(Long id) {
        if (quizzRepository.existsById(id)) {
            QuizzInfoDTO entity = quizzMapper.toDTO(quizzRepository.findById(id).orElseThrow());
            quizzRepository.deleteById(id);
            return entity;
        } else {
            throw new RuntimeException("Quizz not found with id: " + id);
        }
    }

    public List <QuizzInfoDTO> getAllQuizz(){

        return quizzMapper.toDTOs(quizzRepository.findAll());
    }
}
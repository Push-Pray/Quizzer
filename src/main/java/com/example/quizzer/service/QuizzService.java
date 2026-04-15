package com.example.quizzer.service;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.mapper.QuestionMapper;
import com.example.quizzer.mapper.QuizzMapper;
import com.example.quizzer.model.Question;
import com.example.quizzer.model.Quizz;
import com.example.quizzer.model.User;
import com.example.quizzer.repository.QuestionRepository;
import com.example.quizzer.repository.QuizzRepository;
import com.example.quizzer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizzService {

    private final QuizzRepository quizzRepository;
    private final QuizzMapper quizzMapper;
    private final QuestionMapper questionMapper;
    private final QuestionRepository questionRepository;

    public QuizzService(QuizzRepository quizzRepository, QuizzMapper quizzMapper, QuestionMapper questionMapper, QuestionRepository questionRepository) {
        this.quizzRepository = quizzRepository;
        this.quizzMapper = quizzMapper;
        this.questionMapper = questionMapper;
        this.questionRepository = questionRepository;
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

    public QuizzInfoDTO addQuestion(Long id, QuestionDTO question){

        Quizz quizz = quizzRepository.findById(id).orElseThrow();
        Question realQuestion = questionMapper.toDomain(question);
        realQuestion.setQuizz(quizz);
        realQuestion = questionRepository.saveAndFlush(realQuestion);
        quizz.getQuestions().add(realQuestion);
        return quizzMapper.toDTO(quizzRepository.save(quizz));
    }

    public QuizzInfoDTO updateQuizz(Long id, QuizzInfoDTO updatedQuizzDTO){

        Quizz existingQuizz = quizzRepository.findById(id).orElseThrow();
        existingQuizz.setName(updatedQuizzDTO.name());
        existingQuizz.setCourse(updatedQuizzDTO.course());
        existingQuizz.setDescription(updatedQuizzDTO.description());
        existingQuizz.setPublished(updatedQuizzDTO.published());

        Quizz saveQuizz = quizzRepository.save(existingQuizz);
        return quizzMapper.toDTO(saveQuizz);
    }
}
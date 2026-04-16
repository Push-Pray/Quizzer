package com.example.quizzer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuestionInfoDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.mapper.QuestionMapper;
import com.example.quizzer.mapper.QuizzMapper;
import com.example.quizzer.model.Question;
import com.example.quizzer.model.Quizz;
import com.example.quizzer.repository.QuestionRepository;
import com.example.quizzer.repository.QuizzRepository;

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

    public List<QuestionInfoDTO> getQuestionsByQuizzId(Long quizzId) {

        List<Question> questions = questionRepository.findByQuizzId(quizzId);
        return questionMapper.toSimpleDTOs(questions);
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

    public QuestionDTO deleteAnswerOption(Long questionId, int optionIndex) {

    Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));

    if (optionIndex < 0 || optionIndex >= question.getOptions().size()) {
        throw new RuntimeException("Answer option not found with index: " + optionIndex);
    }

    question.getOptions().remove(optionIndex);

    if (question.getCorrectIndex() == optionIndex) {
        question.setCorrectIndex(-1);
    } else if (question.getCorrectIndex() > optionIndex) {
        question.setCorrectIndex(question.getCorrectIndex() - 1);
    }

    Question savedQuestion = questionRepository.save(question);
    return questionMapper.toDTO(savedQuestion);
}

public QuestionDTO addAnswerOption(Long questionId, String optionText, boolean isCorrect) {

    Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));

    question.getOptions().add(optionText);

    if (isCorrect) {
        question.setCorrectIndex(question.getOptions().size() - 1);
    }

    Question savedQuestion = questionRepository.save(question);
    return questionMapper.toDTO(savedQuestion);
    }   
}
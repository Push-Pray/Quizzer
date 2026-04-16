package com.example.quizzer.RESTController;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuestionInfoDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuestionService; 
import com.example.quizzer.service.QuizzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; 

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionRestController {

    private final QuizzService quizzService;
    private final QuestionService questionService;

    public QuestionRestController(QuizzService quizzService, QuestionService questionService) {
        this.quizzService = quizzService;
        this.questionService = questionService;
    }

    @PostMapping("/quizz/{id}/question")
    public ResponseEntity<Object> createQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO){
        try {
            QuizzInfoDTO quizzInfoDTO = quizzService.addQuestion(id, questionDTO);
            return ResponseEntity.ok(questionDTO);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/course/{quizzId}/questions")
    public ResponseEntity<List<QuestionInfoDTO>> getQuestionsForQuizz(@PathVariable Long quizzId) {
        List<QuestionInfoDTO> questions = quizzService.getQuestionsByQuizzId(quizzId);
        
        return ResponseEntity.ok(questions);
    }
}
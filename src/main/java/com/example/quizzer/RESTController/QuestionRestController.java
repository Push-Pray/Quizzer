package com.example.quizzer.RESTController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuizzService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionRestController {

    private final QuizzService quizzService;

    public QuestionRestController(QuizzService quizzService) {
        this.quizzService = quizzService;
    }

    @PostMapping("/quizz/{id}/question")
    public ResponseEntity<Object> createQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO) {
        try {
            QuizzInfoDTO quizzInfoDTO = quizzService.addQuestion(id, questionDTO);
            return ResponseEntity.ok(questionDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/question/{questionId}/option")
public ResponseEntity<Object> addAnswerOption(@PathVariable Long questionId,
                                              @RequestParam String text,
                                              @RequestParam boolean correct) {
    try {
        QuestionDTO updatedQuestion = quizzService.addAnswerOption(questionId, text, correct);
        return ResponseEntity.ok(updatedQuestion);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

    @DeleteMapping("/question/{questionId}/option/{optionIndex}")
    public ResponseEntity<Object> deleteAnswerOption(@PathVariable Long questionId, @PathVariable int optionIndex) {
        try {
            QuestionDTO updatedQuestion = quizzService.deleteAnswerOption(questionId, optionIndex);
            return ResponseEntity.ok(updatedQuestion);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
package com.example.quizzer.RESTController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizzer.DTO.AnswerResultDTO;
import com.example.quizzer.DTO.OptionDTO;
import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuestionInfoDTO;
import com.example.quizzer.DTO.QuestionResultDTO;
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

    @GetMapping("/question/{questionId}/options")
    public ResponseEntity<Object> getAlloptions(@PathVariable Long questionId) {
        try {

            List<OptionDTO> options = quizzService.getAnswerOptionsWithStatus(questionId);
            return ResponseEntity.ok(options);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/quizz/{id}/question")
    public ResponseEntity<Object> getQuestionsForQuizz(@PathVariable Long id) {
        try {
            List<QuestionInfoDTO> questions = quizzService.getQuestionsByQuizzId(id);
            return ResponseEntity.ok(questions);
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

    @PostMapping("/question/{questionId}/answer")
    public ResponseEntity<Object> answerQuestion(@PathVariable Long questionId,
                                                 @RequestParam int optionIndex) {
        try {
            AnswerResultDTO result = quizzService.answerQuestion(questionId, optionIndex);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/quizz/{quizzId}/question-results")
    public ResponseEntity<Object> getQuestionResults(@PathVariable Long quizzId) {
        try {
            List<QuestionResultDTO> results = quizzService.getQuestionResultsByQuizzId(quizzId);
            return ResponseEntity.ok(results);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
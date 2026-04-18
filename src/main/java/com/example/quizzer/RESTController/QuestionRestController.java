package com.example.quizzer.RESTController;

import com.example.quizzer.DTO.OptionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuizzService;

import java.util.List;

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
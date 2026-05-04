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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Questions", description = "Everything related to managing quiz questions, answer options, and student answers")
public class QuestionRestController {

    private final QuizzService quizzService;

    public QuestionRestController(QuizzService quizzService) {
        this.quizzService = quizzService;
    }

    @Operation(summary = "Add a new question", description = "Creates a new question and attaches it to a specific quiz ID")
    @PostMapping("/quizz/{id}/question")
    public ResponseEntity<Object> createQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO) {
        try {
            QuizzInfoDTO quizzInfoDTO = quizzService.addQuestion(id, questionDTO);
            return ResponseEntity.ok(questionDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Add an answer option", description = "Adds a new multiple-choice option to a specific question and sets whether it is the correct answer")
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

    @Operation(summary = "Get all answer options", description = "Retrieves a list of all available options for a specific question")
    @GetMapping("/question/{questionId}/options")
    public ResponseEntity<Object> getAlloptions(@PathVariable Long questionId) {
        try {

            List<OptionDTO> options = quizzService.getAnswerOptionsWithStatus(questionId);
            return ResponseEntity.ok(options);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get questions for a quiz", description = "Retrieves a list of all questions belonging to a specific quiz")
    @GetMapping("/quizz/{id}/question")
    public ResponseEntity<Object> getQuestionsForQuizz(@PathVariable Long id) {
        try {
            List<QuestionInfoDTO> questions = quizzService.getQuestionsByQuizzId(id);
            return ResponseEntity.ok(questions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Delete an answer option", description = "Removes a specific answer option from a question using its index position")
    @DeleteMapping("/question/{questionId}/option/{optionIndex}")
    public ResponseEntity<Object> deleteAnswerOption(@PathVariable Long questionId, @PathVariable int optionIndex) {
        try {
            QuestionDTO updatedQuestion = quizzService.deleteAnswerOption(questionId, optionIndex);
            return ResponseEntity.ok(updatedQuestion);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Submit an answer", description = "Submits a user's answer (by index) to a specific question to check if it is correct")
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

    @Operation(summary = "Get quiz results", description = "Retrieves the answer results and statistics for all questions in a specific quiz")
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
package com.example.quizzer.RESTController;

import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuizzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Quizzes", description = "Everything related to creating and managing quizzes")
public class QuizzRestController {

    private final QuizzService quizzService;

    public QuizzRestController(QuizzService quizzService) {

        this.quizzService = quizzService;
    }

    @Operation(summary = "Get all quizzes", description = "Retrieves a list of all quizzes in the database")
    @GetMapping("/quizz")
    public ResponseEntity<Object> listAllQuizz(){

        try{
            return ResponseEntity.ok().body(quizzService.getAllQuizz());
        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get published quizzes", description = "Retrieves a list of all quizzes that are currently marked as published")
    @GetMapping("/quizz/published")
    public ResponseEntity<Object> listPublishedQuizz(){
        try {
            return ResponseEntity.ok().body(quizzService.getPublishedQuizz());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Create a new quiz", description = "Saves a brand new quiz to the database")
    @PostMapping("/quizz")
    public ResponseEntity<Object> createQuizz(@RequestBody QuizzInfoDTO quizz){
        try {
            QuizzInfoDTO savedQuizz = quizzService.saveDTO(quizz);
            return ResponseEntity.ok(savedQuizz);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Delete a quiz", description = "Removes a quiz from the system using its ID")
    @DeleteMapping("/quizz/{id}")
    public ResponseEntity<Object> deleteCourse(@PathVariable Long id) {
        try {
            QuizzInfoDTO entity = quizzService.deleteById(id);
            return ResponseEntity.ok().body(entity);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update a quiz", description = "Updates the details (name, category, etc.) of an existing quiz")
    @PutMapping("/quizz/{id}")
    public ResponseEntity<Object> updateQuizz(@PathVariable Long id, @RequestBody QuizzInfoDTO updatedQuizzDTO) {
        try {
            QuizzInfoDTO updatedQuizz = quizzService.updateQuizz(id, updatedQuizzDTO);
            return ResponseEntity.ok(updatedQuizz);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get questions for a quiz", description = "Retrieves a list of all questions belonging to a specific quiz ID")
    @GetMapping("/quizz/{id}/questions")
    public ResponseEntity<Object> listQuizzQuestions(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(quizzService.getQuestionsByQuizzId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Delete a question from a quiz", description = "Removes a specific question from a specific quiz")
    @DeleteMapping("/quizz/{quizzId}/question/{questionId}")
    public ResponseEntity<Object> deleteQuestion(@PathVariable Long quizzId, @PathVariable Long questionId){

        try {

            QuizzInfoDTO entity = quizzService.deleteQuestion(quizzId, questionId);
            return ResponseEntity.ok().body(entity);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
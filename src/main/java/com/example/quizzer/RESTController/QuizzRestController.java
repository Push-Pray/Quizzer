package com.example.quizzer.RESTController;

import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuizzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuizzRestController {

    private final QuizzService quizzService;

    public QuizzRestController(QuizzService quizzService) {

        this.quizzService = quizzService;
    }

    @GetMapping("/quizz")
    public ResponseEntity<Object> listAllQuizz(){

        try{
            return ResponseEntity.ok().body(quizzService.getAllQuizz());
        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/quizz")
    public ResponseEntity<Object> createQuizz(@RequestBody QuizzInfoDTO quizz){
        try {
            QuizzInfoDTO savedQuizz = quizzService.saveDTO(quizz);
            return ResponseEntity.ok(savedQuizz);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/quizz/{id}")
    public ResponseEntity<Object> deleteCourse(@PathVariable Long id) {
        try {
            QuizzInfoDTO entity = quizzService.deleteById(id);
            return ResponseEntity.ok().body(entity);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/quizz/{id}")
    public ResponseEntity<Object> updateQuizz(@PathVariable Long id, @RequestBody QuizzInfoDTO updatedQuizzDTO) {
        try {
            QuizzInfoDTO updatedQuizz = quizzService.updateQuizz(id, updatedQuizzDTO);
            return ResponseEntity.ok(updatedQuizz);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

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

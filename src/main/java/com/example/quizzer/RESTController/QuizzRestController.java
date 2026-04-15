package com.example.quizzer.RESTController;

import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuizzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuizzRestController {

    private final QuizzService quizzService;

    public QuizzRestController(QuizzService quizzService) {

        this.quizzService = quizzService;
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
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        try {
            quizzService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}

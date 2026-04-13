package com.example.demo.RESTController;

import com.example.demo.DTO.QuizzInfoDTO;
import com.example.demo.service.QuizzService;
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

    @PostMapping("/course")
    public ResponseEntity<Object> createCourse(@RequestBody QuizzInfoDTO quizz){
        try {
            QuizzInfoDTO savedQuizz = quizzService.saveDTO(quizz);
            return ResponseEntity.ok(savedQuizz);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

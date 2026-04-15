package com.example.quizzer.RESTController;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.service.QuizzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionRestController {

    private final QuizzService quizzService;

    public QuestionRestController(QuizzService quizzService) {

        this.quizzService = quizzService;
    }

    @PostMapping("/quizz/{id}/question")
    public ResponseEntity <Object> createQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO){
        try {
            QuizzInfoDTO quizzInfoDTO = quizzService.addQuestion(id, questionDTO);
            return ResponseEntity.ok(questionDTO);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

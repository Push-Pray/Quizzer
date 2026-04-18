package com.example.quizzer.DTO;

import java.util.List;

public record QuestionDTO(
        Long id,
        String text,
        Integer difficulty,
        List<String> options,
        int correctIndex
) {

    public QuestionDTO {

        if(difficulty == null){

            difficulty = 1;
        }
    }

}

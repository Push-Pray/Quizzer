package com.example.quizzer.DTO;

import java.util.List;

public record QuestionDTO(
        Long id,
        String text,
        List<String> options,
        int correctIndex
) {

}

package com.example.quizzer.DTO;

public record AnswerResultDTO(
        Long questionId,
        int selectedOptionIndex,
        boolean correct,
        int correctIndex
) {
}

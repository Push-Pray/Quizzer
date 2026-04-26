package com.example.quizzer.DTO;

public record QuestionResultDTO(
        Long questionId,
        String questionText,
        int correctAnswers,
        int wrongAnswers
) {
}

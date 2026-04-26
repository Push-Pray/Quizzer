package com.example.quizzer.DTO;

import java.time.LocalDate;
import java.util.List;

public record QuizzInfoDTO(
        Long id,
        String name,
        String course,
        String description,
        boolean published,
        LocalDate creationDate,
        String category,
        List<QuestionInfoDTO> questions
) {
}
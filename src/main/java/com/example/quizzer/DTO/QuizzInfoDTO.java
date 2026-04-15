package com.example.quizzer.DTO;

import java.time.LocalDate;

public record QuizzInfoDTO(

        Long id,
        String name,
        String course,
        String description,
        boolean published,
        LocalDate creationDate
) {

}

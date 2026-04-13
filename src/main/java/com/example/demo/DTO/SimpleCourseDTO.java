package com.example.demo.DTO;

public record SimpleCourseDTO(
        Long id,
        String name,
        String code,
        TeacherInfoDTO teacher

) {

}

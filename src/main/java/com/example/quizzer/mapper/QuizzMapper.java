package com.example.quizzer.mapper;

import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.model.Quizz;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizzMapper {

    Quizz toDomain(QuizzInfoDTO courseSimpleDTO);
    QuizzInfoDTO toDTO(Quizz course);
    List <QuizzInfoDTO> toDTOs(List<Quizz> courses);
}

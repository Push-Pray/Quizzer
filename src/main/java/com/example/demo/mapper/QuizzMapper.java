package com.example.demo.mapper;

import com.example.demo.DTO.QuizzInfoDTO;
import com.example.demo.model.Quizz;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizzMapper {

    Quizz toDomain(QuizzInfoDTO courseSimpleDTO);
    QuizzInfoDTO toDTO(Quizz course);
    List <QuizzInfoDTO> toDTOs(List<Quizz> courses);
}

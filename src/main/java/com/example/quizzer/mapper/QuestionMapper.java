package com.example.quizzer.mapper;

import com.example.quizzer.DTO.QuestionDTO;
import com.example.quizzer.DTO.QuestionInfoDTO;
import com.example.quizzer.DTO.QuizzInfoDTO;
import com.example.quizzer.model.Question;
import com.example.quizzer.model.Quizz;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    Question toDomain(QuestionInfoDTO questionInfoDTO);
    QuestionInfoDTO toSimpleDTO(Question question);
    List <QuestionInfoDTO> toSimpleDTOs(List<Question> questions);

    Question toDomain(QuestionDTO questionDTO);
    QuestionDTO toDTO(Question question);
    List <QuestionDTO> toDTOs(List<Question> questions);
}

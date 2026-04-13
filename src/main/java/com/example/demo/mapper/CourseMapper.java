package com.example.demo.mapper;

import com.example.demo.DTO.SimpleCourseDTO;
import com.example.demo.model.Course;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    SimpleCourseDTO toSimpleDTO(Course course);

    Course toDomain(SimpleCourseDTO courseSimpleDTO);
    SimpleCourseDTO toDTO(Course course);
    List <SimpleCourseDTO> toDTOs(List<Course> courses);
}

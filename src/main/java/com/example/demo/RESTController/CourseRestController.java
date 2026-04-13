package com.example.demo.RESTController;

import com.example.demo.DTO.SimpleCourseDTO;
import com.example.demo.model.Course;
import com.example.demo.model.User;
import com.example.demo.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CourseRestController {

    private final CourseService courseService;

    public CourseRestController(CourseService courseService) {

        this.courseService = courseService;
    }

    @PostMapping("/course")
    public ResponseEntity<Object> createCourse(@RequestBody SimpleCourseDTO courseDTO){

        try{
            Course course = courseService.saveCourseDTO(courseDTO);
            return ResponseEntity.ok(course);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

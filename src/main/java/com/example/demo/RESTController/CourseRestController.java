package com.example.demo.RESTController;

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
    public ResponseEntity<Object> createCourse(@RequestBody Long userId, @RequestBody String name, @RequestBody String code){

        try{
            Course course = courseService.saveCourse(name, code, userId);
            return ResponseEntity.ok(course);
        }catch (RuntimeException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

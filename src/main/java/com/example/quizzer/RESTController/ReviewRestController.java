package com.example.quizzer.RESTController;

import com.example.quizzer.model.Review;
import com.example.quizzer.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Reviews", description = "Everything related to creating and managing Reviews")
public class ReviewRestController {

    private final ReviewService reviewService;

    public ReviewRestController(ReviewService reviewService) {

        this.reviewService = reviewService;
    }

    @Operation(summary = "Post a new Review", description = "Post a new Review Associated with a quizz")
    @PostMapping("/quizzes/{quizzId}/reviews")
    public ResponseEntity<Object> addReview(@PathVariable Long quizzId, @RequestBody Review review){

        try {

            Review reviewdone = reviewService.addReview(quizzId, review);
            return ResponseEntity.ok().body(reviewdone);
        }catch (Exception e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all Reviews from a quizz", description = "Retrieve all Reviews from a selected Quizz")
    @GetMapping("/quizzes/{quizId}/reviews")
    public ResponseEntity<Object> getReviews(@PathVariable Long quizId) {
        try {
            
            List<Review> mylist = reviewService.getReviewsByQuizId(quizId);
            return ResponseEntity.ok().body(mylist);
        }catch (Exception e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

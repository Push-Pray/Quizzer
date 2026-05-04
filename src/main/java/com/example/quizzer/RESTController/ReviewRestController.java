package com.example.quizzer.RESTController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizzer.model.Review;
import com.example.quizzer.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

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
    public ResponseEntity<Object> addReview(@PathVariable Long quizzId, @RequestBody Review review) {

        try {

            Review reviewdone = reviewService.addReview(quizzId, review);
            return ResponseEntity.ok().body(reviewdone);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all Reviews from a quizz", description = "Retrieve all Reviews from a selected Quizz")
    @GetMapping("/quizzes/{quizId}/reviews")
    public ResponseEntity<Object> getReviews(@PathVariable Long quizId) {

        try {

            List<Review> mylist = reviewService.getReviewsByQuizId(quizId);
            return ResponseEntity.ok().body(mylist);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Delete a Review", description = "Delete selected Review by id")
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Object> deleteReview(@PathVariable Long reviewId) {

        try {

            Review deletedReview = reviewService.deleteReview(reviewId);
            return ResponseEntity.ok().body(deletedReview);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

package com.example.quizzer.service;

import com.example.quizzer.model.Quizz;
import com.example.quizzer.model.Review;
import com.example.quizzer.repository.QuizzRepository;
import com.example.quizzer.repository.ReviewRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final QuizzRepository quizzRepository;

    public ReviewService(ReviewRepository reviewRepository, QuizzRepository quizzRepository) {

        this.reviewRepository = reviewRepository;
        this.quizzRepository = quizzRepository;
    }

    public Review addReview(Long quizzId, Review review){

        Quizz quizz = quizzRepository.findById(quizzId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));

        if (!quizz.isPublished()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot review a non-published quiz");
        }

        review.setQuizz(quizz);
        return reviewRepository.save(review);
    }
}

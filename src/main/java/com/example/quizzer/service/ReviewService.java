package com.example.quizzer.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.quizzer.model.Quizz;
import com.example.quizzer.model.Review;
import com.example.quizzer.repository.QuizzRepository;
import com.example.quizzer.repository.ReviewRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final QuizzRepository quizzRepository;
    private final EntityManager entityManager;

    public ReviewService(ReviewRepository reviewRepository,
                         QuizzRepository quizzRepository,
                         EntityManager entityManager) {

        this.reviewRepository = reviewRepository;
        this.quizzRepository = quizzRepository;
        this.entityManager = entityManager;
    }

    public Review addReview(Long quizzId, Review review) {

        Quizz quizz = quizzRepository.findById(quizzId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));

        if (!quizz.isPublished()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot review a non-published quiz");
        }

        review.setQuizz(quizz);
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByQuizId(Long quizId) {

        return reviewRepository.findAllByQuizzId(quizId);
    }

    @Transactional
    public Review deleteReview(Long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));

        Review deletedReview = new Review(review.getNickname(), review.getGrade(), review.getText());

        int deletedRows = reviewRepository.deleteReviewById(reviewId);

        if (deletedRows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
        }

        entityManager.flush();
        entityManager.clear();

        return deletedReview;
    }

    public Review updateReview(Long reviewId, Review updatedReview) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));

        review.setNickname(updatedReview.getNickname());
        review.setGrade(updatedReview.getGrade());
        review.setText(updatedReview.getText());

        return reviewRepository.save(review);
    }
}

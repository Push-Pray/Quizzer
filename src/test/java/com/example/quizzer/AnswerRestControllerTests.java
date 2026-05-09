package com.example.quizzer;

import com.example.quizzer.model.Question;
import com.example.quizzer.model.Quizz;
import com.example.quizzer.repository.QuestionRepository;
import com.example.quizzer.repository.QuizzRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AnswerRestControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuizzRepository quizzRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void cleanDb() {
        questionRepository.deleteAll();
        quizzRepository.deleteAll();
    }

    // 1. SUCCESS CASE
    @Test
    void createAnswerSavesAnswerForPublishedQuiz() throws Exception {

        Quizz quiz = new Quizz("Quiz");
        quiz.setPublished(true);
        quiz = quizzRepository.save(quiz);

        Question q = new Question();
        q.setText("2+2?");
        q.setOptions(java.util.List.of("3", "4", "5"));
        q.setCorrectIndex(1);
        q.setQuizz(quiz);
        q = questionRepository.save(q);

        Map<String, Object> request = Map.of(
                "optionIndex", 1
        );

        mockMvc.perform(post("/api/question/" + q.getId() + "/answer")
                        .param("optionIndex", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correct", is(true)));
    }

    // 2. missing optionIndex
    @Test
    void createAnswerDoesNotSaveAnswerWithoutAnswerOption() throws Exception {

        Quizz quiz = new Quizz("Quiz");
        quiz.setPublished(true);
        quiz = quizzRepository.save(quiz);

        Question q = new Question();
        q.setText("Test");
        q.setQuizz(quiz);
        q = questionRepository.save(q);

        Map<String, Object> request = Map.of();

        mockMvc.perform(post("/api/question/" + q.getId() + "/answer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    // 3. non-existing question
    @Test
    void createAnswerDoesNotSaveAnswerForNonExistingAnswerOption() throws Exception {

        Map<String, Object> request = Map.of(
                "optionIndex", 1
        );

        mockMvc.perform(post("/api/question/999999/answer")
                        .param("optionIndex", "1"))
                .andExpect(status().isBadRequest());
    }

    // 4. non-published quiz
    @Test
    void createAnswerDoesNotSaveAnswerForNonPublishedQuiz() throws Exception {

        Quizz quiz = new Quizz("Quiz");
        quiz.setPublished(false);
        quiz = quizzRepository.save(quiz);

        Question q = new Question();
        q.setText("Test");
        q.setQuizz(quiz);
        q = questionRepository.save(q);

        Map<String, Object> request = Map.of(
                "optionIndex", 0
        );

        mockMvc.perform(post("/api/question/" + q.getId() + "/answer"))
                .andExpect(status().isBadRequest());
    }
}
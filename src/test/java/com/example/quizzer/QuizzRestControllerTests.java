package com.example.quizzer;

import com.example.quizzer.model.Quizz;
import com.example.quizzer.repository.QuizzRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class QuizzRestControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuizzRepository quizzRepository;


    @BeforeEach
    void clearDatabase() {

        quizzRepository.deleteAll();
    }


    @Test
    void getAllQuizzesReturnsEmptyListWhenNoQuizzesExist() throws Exception {

        mockMvc.perform(get("/api/quizz/published"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }


    @Test
    void getAllQuizzesReturnsListOfQuizzesWhenPublishedQuizzesExist() throws Exception {

        Quizz quiz1 = new Quizz("Capitals");
        quiz1.setPublished(true);

        Quizz quiz2 = new Quizz("Mountains");
        quiz2.setPublished(true);

        quizzRepository.saveAll(List.of(quiz1, quiz2));

        mockMvc.perform(get("/api/quizz/published"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Capitals")))
                .andExpect(jsonPath("$[1].name", is("Mountains")));
    }


    @Test
    void getAllQuizzesDoesNotReturnUnpublishedQuizzes() throws Exception {

        Quizz publishedQuiz = new Quizz("Published quiz");
        publishedQuiz.setPublished(true);

        Quizz unpublishedQuiz = new Quizz("Hidden quiz");
        unpublishedQuiz.setPublished(false);

        quizzRepository.saveAll(List.of(publishedQuiz, unpublishedQuiz));

        mockMvc.perform(get("/api/quizz/published"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Published quiz")));
    }
}
package com.example.quizzer;

import com.example.quizzer.model.Question;
import com.example.quizzer.model.Quizz;
import com.example.quizzer.repository.QuestionRepository;
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
public class QuestionRestControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuizzRepository quizzRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @BeforeEach
    void cleanDb() {
        questionRepository.deleteAll();
        quizzRepository.deleteAll();
    }

    // 1. quiz exists, but has no questions
    @Test
    void getQuestionsByQuizIdReturnsEmptyListWhenQuizDoesNotHaveQuestions() throws Exception {

        Quizz quiz = new Quizz("Empty quiz");
        quiz.setPublished(true);
        quiz = quizzRepository.save(quiz);

        mockMvc.perform(get("/api/quizz/" + quiz.getId() + "/question"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    // 2. quiz has questions
    @Test
    void getQuestionsByQuizIdReturnsListOfQuestionsWhenQuizHasQuestions() throws Exception {

        Quizz quiz = new Quizz("Quiz with questions");
        quiz.setPublished(true);
        quiz = quizzRepository.save(quiz);

        Question q1 = new Question();
        q1.setText("What is 2+2?");
        q1.setDifficulty(1);
        q1.setOptions(List.of("3", "4", "5"));
        q1.setCorrectIndex(1);
        q1.setQuizz(quiz);

        Question q2 = new Question();
        q2.setText("Capital of Finland?");
        q2.setDifficulty(2);
        q2.setOptions(List.of("Helsinki", "Turku", "Tampere"));
        q2.setCorrectIndex(0);
        q2.setQuizz(quiz);

        questionRepository.saveAll(List.of(q1, q2));

        mockMvc.perform(get("/api/quizz/" + quiz.getId() + "/question"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
    
                .andExpect(jsonPath("$[0].text", is("What is 2+2?")))
                .andExpect(jsonPath("$[1].text", is("Capital of Finland?")))

                .andExpect(jsonPath("$[0].difficulty", is(1)))
                .andExpect(jsonPath("$[1].difficulty", is(2)));

    }

    // 3. quiz does not exist
    @Test
    void getQuestionsByQuizIdReturnsErrorWhenQuizDoesNotExist() throws Exception {

        mockMvc.perform(get("/api/quizz/999999/question"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }
}
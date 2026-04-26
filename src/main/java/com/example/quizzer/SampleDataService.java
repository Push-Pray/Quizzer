package com.example.quizzer;

import com.example.quizzer.model.Question;
import com.example.quizzer.model.Quizz;
import com.example.quizzer.model.User;
import com.example.quizzer.repository.*;
import jakarta.annotation.PostConstruct;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SampleDataService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;

    public SampleDataService(UserRepository userRepository, QuestionRepository questionRepository, QuizzRepository quizzRepository) {

        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.quizzRepository = quizzRepository;
    }

    @PostConstruct
    public void init(){

        try {
            User test = new User("test", "test");
            test = userRepository.save(test);
        }catch (Exception e){

            System.err.println(e.getMessage());
        }

        try {
            if (quizzRepository.count() == 0) {
                Quizz quiz1 = new Quizz("Capitals");
                quiz1.setDescription("Test your knowledge of world capitals");
                quiz1.setCourse("Gph101");
                quiz1.setCategory("Geography");
                quiz1.setPublished(true);

                Question q1 = new Question();
                q1.setText("What is the capital of France?");
                q1.setDifficulty(0);
                q1.setOptions(List.of("Paris", "London", "Berlin", "Madrid"));
                q1.setCorrectIndex(0);
                q1.setQuizz(quiz1);
                quiz1.getQuestions().add(q1);

                Question q2 = new Question();
                q2.setText("What is the capital of Japan?");
                q2.setDifficulty(1);
                q2.setOptions(List.of("Tokyo", "Kyoto", "Osaka", "Hiroshima"));
                q2.setCorrectIndex(0);
                q2.setQuizz(quiz1);
                quiz1.getQuestions().add(q2);

                quizzRepository.save(quiz1);

                Quizz quiz2 = new Quizz("Highest Mountains");
                quiz2.setDescription("Test your knowledge of the world's highest mountains");
                quiz2.setCourse("Gph102");
                quiz2.setCategory("Geography");
                quiz2.setPublished(true);

                Question q3 = new Question();
                q3.setText("What is the highest mountain in the world?");
                q3.setDifficulty(0);
                q3.setOptions(List.of("Mount Everest", "K2", "Kangchenjunga", "Lhotse"));
                q3.setCorrectIndex(0);
                q3.setQuizz(quiz2);
                quiz2.getQuestions().add(q3);

                Question q4 = new Question();
                q4.setText("What is the highest mountain in Africa?");
                q4.setDifficulty(1);
                q4.setOptions(List.of("Mount Kilimanjaro", "Mount Kenya", "Mount Elgon", "Mount Meru"));
                q4.setCorrectIndex(0);
                q4.setQuizz(quiz2);
                quiz2.getQuestions().add(q4);

                Question q5 = new Question();
                q5.setText("What is the highest mountain in Europe?");
                q5.setDifficulty(2);
                q5.setOptions(List.of("Mount Elbrus", "Mont Blanc", "Grossglockner", "Dufourspitze"));
                q5.setCorrectIndex(0);
                q5.setQuizz(quiz2);
                quiz2.getQuestions().add(q5);

                quizzRepository.save(quiz2);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}

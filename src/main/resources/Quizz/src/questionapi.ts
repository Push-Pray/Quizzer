import type { AnswerResultData, QuestionDifficulty, QuestionFullData, QuestionInfoData, QuestionResultData } from "./components/types";
import { fetchQuestionDetails } from "./optionapi";

const mapDifficulty = (difficulty: number | string): QuestionDifficulty => {
  if (difficulty === 0 || difficulty === "easy") {
    return "easy";
  }

  if (difficulty === 2 || difficulty === "hard") {
    return "hard";
  }

  return "medium";
};

const normalizeQuestion = (question: QuestionInfoData): QuestionInfoData => ({
  ...question,
  difficulty: mapDifficulty(question.difficulty as number | string),
});

export const fetchQuestion = (quizId: number) => {
  return fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/questions`)
    .then((response) => {
      if (!response.ok) throw new Error("Error when fetching question");
      return response.json();
    })
    .then((data) => (Array.isArray(data) ? data.map(normalizeQuestion) : []));
}

export const fetchStudentQuestions = async (quizId: number): Promise<QuestionFullData[]> => {
  const questions = await fetchQuestion(quizId);

  return Promise.all(
    questions.map(async (question) => {
      const details = await fetchQuestionDetails(quizId, question.id);

      return {
        id: question.id,
        text: question.text,
        difficulty: question.difficulty,
        options: details.options,
        correctIndex: details.correctIndex,
      };
    }),
  );
};

export const submitQuestionAnswer = async (
  questionId: number,
  optionIndex: number,
): Promise<AnswerResultData> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/question/${questionId}/answer?optionIndex=${optionIndex}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Error submitting answer");
  }

  return response.json() as Promise<AnswerResultData>;
};

export const fetchQuestionResults = async (quizId: number): Promise<QuestionResultData[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/question-results`);

  if (!response.ok) {
    throw new Error("Error fetching question results");
  }

  const data = await response.json();
  return Array.isArray(data) ? (data as QuestionResultData[]) : [];
};

export const deleteQuestion = (quizId: number, questionId: number) => {
  const url = `${import.meta.env.VITE_API_URL}/quizz/${quizId}/question/${questionId}`;
  console.log("DELETE URL:", url);

  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting question");

    if (response.status === 204) return;

    return response.json();
  });
};
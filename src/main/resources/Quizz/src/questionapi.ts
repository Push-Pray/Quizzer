import type { QuestionDifficulty, QuestionInfoData } from "./components/types";

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
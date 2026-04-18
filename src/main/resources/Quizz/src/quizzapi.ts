import type { QuestionDifficulty, QuizzData } from "./components/types";

const mapDifficulty = (difficulty: number | string): QuestionDifficulty => {
  if (difficulty === 0 || difficulty === "easy") {
    return "easy";
  }

  if (difficulty === 2 || difficulty === "hard") {
    return "hard";
  }

  return "medium";
};

const normalizeQuizz = (quizz: QuizzData): QuizzData => ({
  ...quizz,
  questions: Array.isArray(quizz.questions)
    ? quizz.questions.map((question) => ({
        ...question,
        difficulty: mapDifficulty(question.difficulty as number | string),
      }))
    : [],
});

export const fetchQuizz= () => {
  return fetch(import.meta.env.VITE_API_URL + "/quizz")
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching quizz");

    return response.json();
  })
  .then((data) => Array.isArray(data) ? data.map(normalizeQuizz) : [])
}

export const deleteQuizz = (id: number) => {
  const url = `${import.meta.env.VITE_API_URL}/quizz/${id}`;
  console.log("DELETE URL:", url);

  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting quizz");

    if (response.status === 204) return;

    return response.json();
  });
};
import type { QuestionInfoData } from "./components/types";

export const fetchQuestion = (quizId: number) => {
  return fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/question`)
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching question");

    return response.json();
  })
  .then((data) => Array.isArray(data) ? data as QuestionInfoData[] : []);
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
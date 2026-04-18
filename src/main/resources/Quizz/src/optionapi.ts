import type { OptionData, QuestionData } from "./components/types";
import { fetchQuizz } from "./quizzapi";

export const fetchQuestionDetails = async (quizId: number, questionId: number): Promise<QuestionData> => {
  const quizzes = await fetchQuizz();
  const quiz = quizzes.find((entry) => entry.id === quizId);
  const questionInfo = quiz?.questions.find((entry) => entry.id === questionId);

  if (!questionInfo) {
    throw new Error("Question not found");
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/question/${questionId}/options`);

  if (!response.ok) {
    throw new Error("Error fetching options");
  }

  const options = (await response.json()) as OptionData[];
  const correctIndex = options.findIndex((option) => option.isCorrect);

  return {
    id: questionInfo.id,
    text: questionInfo.text,
    options: options.map((option) => option.text),
    correctIndex,
  };
};

export const addQuestionOption = async (questionId: number, text: string, correct: boolean) => {
  const params = new URLSearchParams({
    text,
    correct: String(correct),
  });

  const response = await fetch(`${import.meta.env.VITE_API_URL}/question/${questionId}/option?${params.toString()}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error adding answer option");
  }

  return response.json();
};

export const deleteQuestionOption = async (questionId: number, optionIndex: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/question/${questionId}/option/${optionIndex}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting answer option");
  }

  return response.json();
};
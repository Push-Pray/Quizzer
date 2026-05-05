import type { ReviewData } from "./components/types";

export type NewReviewPayload = {
  nickname: string;
  grade: number;
  text: string;
};

export const fetchQuizReviews = async (quizId: number): Promise<ReviewData[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/reviews`);

  if (!response.ok) {
    throw new Error("Error fetching quiz reviews");
  }

  const data = await response.json();
  return Array.isArray(data) ? (data as ReviewData[]) : [];
};

export const submitQuizReview = async (
  quizId: number,
  review: NewReviewPayload,
): Promise<ReviewData> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error submitting quiz review");
  }

  return response.json() as Promise<ReviewData>;
};

export const updateQuizReview = async (
  reviewId: number,
  review: NewReviewPayload,
): Promise<ReviewData> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error updating quiz review");
  }

  return response.json() as Promise<ReviewData>;
};

export const deleteQuizReview = async (reviewId: number): Promise<ReviewData> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error deleting quiz review");
  }

  return response.json() as Promise<ReviewData>;
};



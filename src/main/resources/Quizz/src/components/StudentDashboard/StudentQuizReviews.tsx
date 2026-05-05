import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StudentDashboardHeader from "./StudentDashboardHeader";
import type { QuizzData, ReviewData } from "../types";
import { fetchPublishedQuizz } from "../../quizzapi";
import { fetchQuizReviews, submitQuizReview } from "../../reviewapi";
import ReviewList from "./ReviewList";

export default function StudentQuizReviews() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<QuizzData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No quiz ID provided.");
      setLoading(false);
      setReviewLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetchPublishedQuizz()
      .then((quizzes) => {
        const currentQuiz = quizzes.find((entry) => entry.id === Number(id)) ?? null;
        setQuiz(currentQuiz);
      })
      .catch(() => {
        setError("Failed to fetch quiz details.");
        setQuiz(null);
      })
      .finally(() => setLoading(false));

    setReviewLoading(true);
    setReviewError(null);
    fetchQuizReviews(Number(id))
      .then((reviewsData) => setReviews(reviewsData))
      .catch(() => {
        setReviewError("Failed to load quiz reviews.");
        setReviews([]);
      })
      .finally(() => setReviewLoading(false));
  }, [id]);

  const handleAddReview = async (review: Omit<ReviewData, "id" | "creationDate">) => {
    if (!id) return;
    const created = await submitQuizReview(Number(id), review);
    setReviews((current) => [created, ...current]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentDashboardHeader activePage="quizzes" />

      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: "#dcecff",
          maxWidth: 1020,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        <Stack spacing={2.25}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              backgroundColor: "#ffffff",
              boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
            }}
          >
            <Typography component="h1" variant="h3" sx={{ mb: 0.75, fontWeight: 700, color: "#0f172a", fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Reviews for {quiz?.name ?? "this quiz"}
            </Typography>
          </Paper>

          <ReviewList
            reviews={reviews}
            loading={reviewLoading}
            error={reviewError}
            quizName={quiz?.name ?? "this quiz"}
            onSubmit={handleAddReview}
          />

          {loading && (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: "center", bgcolor: "#ffffff" }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Loading quiz details...</Typography>
            </Paper>
          )}
          {error && (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

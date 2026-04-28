import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StudentDashboardHeader from "./StudentDashboardHeader";
import type { QuestionFullData, QuizzData } from "../types";
import { fetchStudentQuestions, submitQuestionAnswer } from "../../questionapi";
import { fetchPublishedQuizz } from "../../quizzapi";

type SubmittedAnswer = {
  questionId: number;
  selectedOptionIndex: number;
  correctIndex: number;
  isCorrect: boolean;
};

export default function StudentQuizQuestions() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionFullData[]>([]);
  const [quiz, setQuiz] = useState<QuizzData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, SubmittedAnswer>>({});
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setSubmittedAnswers({});

    Promise.all([fetchStudentQuestions(Number(id)), fetchPublishedQuizz()])
      .then(([questionData, quizzes]) => {
        const currentQuiz = quizzes.find((entry) => entry.id === Number(id)) ?? null;

        setQuiz(currentQuiz);
        setQuestions(Array.isArray(questionData) ? questionData : []);
      })
      .catch(() => {
        setError("Failed to fetch quiz details.");
        setQuiz(null);
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const currentQuestion = questions[currentIndex] ?? null;
  const currentSubmission = currentQuestion ? submittedAnswers[currentQuestion.id] : undefined;
  const currentQuestionAnswered = currentSubmission?.isCorrect === true;

  useEffect(() => {
    if (!currentQuestion) {
      setSelectedOptionIndex(null);
      return;
    }

    setSelectedOptionIndex(
      submittedAnswers[currentQuestion.id]?.selectedOptionIndex ?? null,
    );
  }, [currentQuestion, submittedAnswers]);

  const handleSubmit = async () => {
    if (!currentQuestion || selectedOptionIndex === null) {
      return;
    }

    try {
      setSubmitting(true);
      const result = await submitQuestionAnswer(currentQuestion.id, selectedOptionIndex);

      setSubmittedAnswers((current) => ({
        ...current,
        [currentQuestion.id]: {
          questionId: result.questionId,
          selectedOptionIndex: result.selectedOptionIndex,
          correctIndex: result.correctIndex,
          isCorrect: result.correct,
        },
      }));

      setFeedbackOpen(true);
      setError(null);
    } catch {
      setError("Failed to submit answer.");
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = useMemo(
    () => Object.values(submittedAnswers).filter((result) => result.isCorrect).length,
    [submittedAnswers],
  );
  const correctCount = useMemo(
    () => Object.values(submittedAnswers).filter((result) => result.isCorrect).length,
    [submittedAnswers],
  );
  const wrongCount = useMemo(
    () => Object.values(submittedAnswers).filter((result) => !result.isCorrect).length,
    [submittedAnswers],
  );
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      navigate(`/student/quizz/${id}/results`);
      return;
    }

    setCurrentIndex((value) => value + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((value) => Math.max(0, value - 1));
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  if (!id) {
    return <Typography color="error">No quiz ID provided.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentDashboardHeader activePage="quizzes" />

      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          maxWidth: 900,
          mx: "auto",
          px: { xs: 1.5, md: 2.5 },
          py: { xs: 2, md: 3 },
          width: "100%",
        }}
      >
        <Stack spacing={2.25}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, md: 2 },
              borderRadius: 2.5,
              backgroundColor: "#ffffff",
              boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{ mb: 0.25, fontWeight: 700, color: "#0f172a", fontSize: { xs: "1.65rem", md: "2.1rem" }, lineHeight: 1.08 }}
            >
              {quiz?.name ?? "Quiz questions"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", fontSize: { xs: "0.95rem", md: "0.98rem" } }}>
              {quiz?.description ?? `Questions for quiz #${id}.`}
            </Typography>
            {quiz && (
              <Typography variant="body2" sx={{ mt: 0.55, color: "#64748b", fontSize: "0.88rem" }}>
                {`${quiz.course} • ${quiz.category ?? quiz.categoryID?.name ?? "No category"}`}
              </Typography>
            )}
          </Paper>

          {loading ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: "center", bgcolor: "#ffffff" }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Loading questions...</Typography>
            </Paper>
          ) : error ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          ) : questions.length === 0 || !currentQuestion ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}>
              <Typography>No questions found for this quiz.</Typography>
            </Paper>
          ) : (
            <>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: "#ffffff",
                  boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
                  overflow: "hidden",
                }}
              >
                <Stack spacing={2.25} sx={{ px: { xs: 1.75, md: 3 }, py: { xs: 1.75, md: 2.5 } }}>
                  <Stack spacing={0.75}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", fontSize: { xs: "1.35rem", md: "1.65rem" } }}>
                      {`Question ${currentIndex + 1} of ${questions.length}`}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                      <Typography sx={{ color: "#475569", fontSize: "0.95rem" }}>
                        {`${answeredCount} answered`}
                      </Typography>
                      <Chip
                        label={currentQuestion.difficulty}
                        color={currentQuestion.difficulty === "hard" ? "error" : currentQuestion.difficulty === "medium" ? "warning" : "success"}
                        size="small"
                        sx={{ textTransform: "capitalize", height: 28, '& .MuiChip-label': { px: 1.1, fontSize: "0.82rem", fontWeight: 700 } }}
                      />
                    </Stack>
                  </Stack>

                  <Typography sx={{ color: "#0f172a", fontSize: { xs: "1.08rem", md: "1.3rem" }, fontWeight: 600, lineHeight: 1.3 }}>
                    {currentQuestion.text}
                  </Typography>

                  <Stack spacing={0.8}>
                    {currentQuestion.options.map((option, optionIndex) => {
                      const isSelected = selectedOptionIndex === optionIndex;
                      const alreadySubmitted = Boolean(currentSubmission);
                      const isCorrectOption = currentQuestionAnswered && optionIndex === currentSubmission?.correctIndex;
                      const isWrongSelected =
                        alreadySubmitted &&
                        optionIndex === currentSubmission?.selectedOptionIndex &&
                        !currentSubmission?.isCorrect;

                      return (
                        <Paper
                          key={optionIndex}
                          onClick={() => {
                            if (!currentQuestionAnswered) {
                              setSelectedOptionIndex(optionIndex);
                            }
                          }}
                          sx={{
                            p: 1.15,
                            borderRadius: 1.5,
                            cursor: currentQuestionAnswered ? "default" : "pointer",
                            border: isSelected ? "2px solid #2563eb" : "1px solid #dbe4f0",
                            backgroundColor: isCorrectOption
                              ? "#dcfce7"
                              : isWrongSelected
                              ? "#fee2e2"
                              : isSelected
                              ? "#eff6ff"
                              : "#ffffff",
                            color: "#0f172a",
                            boxShadow: isSelected ? "0 10px 18px rgba(37, 99, 235, 0.12)" : "none",
                            transition: "all 160ms ease",
                            '&:hover': currentQuestionAnswered
                              ? undefined
                              : {
                                  borderColor: "#93c5fd",
                                  backgroundColor: "#f8fbff",
                                },
                          }}
                        >
                          <Stack direction="row" spacing={1.15} sx={{ alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                border: isSelected ? "4px solid #2563eb" : "2px solid #94a3b8",
                                backgroundColor: "#ffffff",
                                flexShrink: 0,
                              }}
                            />
                            <Typography sx={{ fontSize: { xs: "0.92rem", md: "0.95rem" }, lineHeight: 1.3 }}>{option}</Typography>
                          </Stack>
                        </Paper>
                      );
                    })}
                  </Stack>

                  {currentSubmission && (
                    <Typography sx={{ color: currentSubmission.isCorrect ? "#166534" : "#b91c1c", fontWeight: 600 }}>
                      {currentSubmission.isCorrect
                        ? "That is correct, good job!"
                        : "That is not correct, try again."}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 1.25,
                      pt: 1,
                      borderTop: "1px solid #e2e8f0",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      sx={{
                        minWidth: 116,
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 2,
                        py: 0.7,
                        bgcolor: "#cbd5e1",
                        color: "#334155",
                        boxShadow: "none",
                        fontSize: "0.92rem",
                      }}
                    >
                      Previous
                    </Button>

                    <Stack direction="row" spacing={1}>
                      {!currentQuestionAnswered && (
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          disabled={selectedOptionIndex === null || submitting}
                          sx={{
                            minWidth: 148,
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                            py: 0.7,
                            fontSize: "0.92rem",
                            background: "linear-gradient(135deg, #2563eb 0%, #0ea5c6 100%)",
                          }}
                        >
                          {submitting ? "Submitting..." : "Submit your answer"}
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!currentQuestionAnswered}
                        sx={{
                          minWidth: 108,
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: 2,
                          py: 0.7,
                          fontSize: "0.92rem",
                          background: !currentQuestionAnswered
                            ? undefined
                            : "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                          color: !currentQuestionAnswered ? undefined : "#ffffff",
                          boxShadow: !currentQuestionAnswered
                            ? undefined
                            : "0 10px 18px rgba(245, 158, 11, 0.24)",
                          '&:hover': currentQuestionAnswered
                            ? {
                                background: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
                              }
                            : undefined,
                        }}
                      >
                        {isLastQuestion ? "Finish" : "Next"}
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 1.75, borderRadius: 3, bgcolor: "#ffffff", boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "1rem" }}>Progress</Typography>
                <Typography sx={{ mt: 0.75, color: "#475569", fontSize: "0.92rem" }}>Correct: {correctCount}</Typography>
                <Typography sx={{ color: "#475569", fontSize: "0.92rem" }}>Wrong: {wrongCount}</Typography>
                <Typography sx={{ color: "#475569", fontSize: "0.92rem" }}>Remaining: {questions.length - answeredCount}</Typography>
              </Paper>
            </>
          )}
        </Stack>
      </Box>

      <Dialog open={feedbackOpen} onClose={handleFeedbackClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700, color: "#0f172a" }}>
          {currentSubmission?.isCorrect ? "Correct answer" : "Try again"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#334155" }}>
            {currentSubmission?.isCorrect
              ? "That is correct, good job!"
              : "That is not correct, try again."}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleFeedbackClose} sx={{ textTransform: "none", fontWeight: 700 }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

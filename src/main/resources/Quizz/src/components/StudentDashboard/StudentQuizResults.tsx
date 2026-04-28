import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import StudentDashboardHeader from "./StudentDashboardHeader";
import type { QuestionDifficulty, QuestionResultData, QuizzData } from "../types";
import { fetchQuestionResults } from "../../questionapi";
import { fetchPublishedQuizz } from "../../quizzapi";

type QuestionResultRow = QuestionResultData & {
  difficulty: QuestionDifficulty | "—";
  totalAnswers: number;
  correctAnswerPercentage: number;
};

export default function StudentQuizResults() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<QuizzData | null>(null);
  const [rows, setRows] = useState<QuestionResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No quiz ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([fetchPublishedQuizz(), fetchQuestionResults(Number(id))])
      .then(([quizzes, results]) => {
        const currentQuiz = quizzes.find((entry) => entry.id === Number(id)) ?? null;

        setQuiz(currentQuiz);
        setRows(
          results.map((result) => {
            const questionInfo = currentQuiz?.questions.find(
              (question) => question.id === result.questionId,
            );
            const totalAnswers = result.correctAnswers + result.wrongAnswers;

            return {
              ...result,
              difficulty: questionInfo?.difficulty ?? "—",
              totalAnswers,
              correctAnswerPercentage: totalAnswers === 0 ? 0 : Math.round((result.correctAnswers / totalAnswers) * 100),
            };
          }),
        );
      })
      .catch(() => {
        setError("Failed to fetch quiz results.");
        setQuiz(null);
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const columns: GridColDef<QuestionResultRow>[] = [
    {
      field: "questionText",
      headerName: "Question",
      flex: 1.8,
      minWidth: 320,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      minWidth: 120,
      flex: 0.7,
      valueFormatter: (value) =>
        typeof value === "string" ? value.charAt(0).toUpperCase() + value.slice(1) : "—",
    },
    {
      field: "totalAnswers",
      headerName: "Total answers",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "correctAnswerPercentage",
      headerName: "Correct answer %",
      minWidth: 160,
      flex: 0.8,
      valueFormatter: (value) => `${value}%`,
    },
    {
      field: "correctAnswers",
      headerName: "Correct answers",
      minWidth: 140,
      flex: 0.8,
    },
    {
      field: "wrongAnswers",
      headerName: "Wrong answers",
      minWidth: 140,
      flex: 0.8,
    },
  ];

  const totalAnswers = rows.reduce((sum, row) => sum + row.totalAnswers, 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentDashboardHeader activePage="quizzes" />

      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          maxWidth: 1180,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          width: "100%",
        }}
      >
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#ffffff",
              boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
            }}
          >
            <Typography component="h1" variant="h3" sx={{ mb: 1, fontWeight: 700, color: "#0f172a" }}>
              {quiz ? `Results of \"${quiz.name}\"` : "Quiz results"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569" }}>
              {`${totalAnswers} answers to ${rows.length} questions`}
            </Typography>
          </Paper>

          {loading ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: "center", bgcolor: "#ffffff" }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Loading quiz results...</Typography>
            </Paper>
          ) : error ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          ) : (
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(205, 226, 245, 0.9)",
                backgroundColor: "#ffffff",
                boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
              }}
            >
              <Box sx={{ width: "100%", minHeight: 420 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.questionId}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  disableColumnMenu
                  sx={{
                    border: "none",
                    backgroundColor: "transparent",
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f3fbff",
                      color: "#163b77",
                      borderBottom: "1px solid rgba(205, 226, 245, 0.95)",
                      fontSize: 15,
                      fontWeight: 700,
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: 700,
                    },
                    "& .MuiDataGrid-row": {
                      backgroundColor: "rgba(255, 255, 255, 0.94)",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid rgba(224, 234, 244, 0.9)",
                      color: "#1f2a44",
                      alignItems: "center",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "1px solid rgba(224, 234, 244, 0.9)",
                      backgroundColor: "#ffffff",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: "transparent",
                    },
                  }}
                />
              </Box>
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
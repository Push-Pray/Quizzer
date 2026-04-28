import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DashboardHeader from "./DashboardHeader";
import type { QuestionDifficulty, QuestionResultData, QuizzData } from "../types";
import { fetchQuestionResults } from "../../questionapi";
import { fetchQuizz } from "../../quizzapi";

type QuestionResultRow = QuestionResultData & {
  difficulty: QuestionDifficulty | "—";
  totalAnswers: number;
  correctAnswerPercentage: number;
};

export default function TeacherQuizResults() {
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

    Promise.all([fetchQuizz(), fetchQuestionResults(Number(id))])
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

  const totalAnswers = rows.reduce((sum, row) => sum + row.totalAnswers, 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <DashboardHeader activePage="quizzes" />

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
              {quiz ? `Results of \"${quiz.name}\"` : "Quiz results"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", fontSize: "1rem" }}>
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
                borderRadius: 3,
                overflow: "hidden",
                border: "none",
                backgroundColor: "#ffffff",
                boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
              }}
            >
              <TableContainer>
                <Table
                  sx={{
                    backgroundColor: "#ffffff",
                    '& th': {
                      backgroundColor: "#e8f7ff",
                      color: "#163b77",
                      borderBottom: "1px solid #cfe3f5",
                      fontSize: 14,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    },
                    '& tbody tr': {
                      backgroundColor: "#ffffff",
                    },
                    '& tbody tr:hover': {
                      backgroundColor: "#ffffff",
                    },
                    '& td': {
                      borderBottom: "1px solid #e5e7eb",
                      color: "#1f2937",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "38%" }}>Question</TableCell>
                      <TableCell sx={{ width: "12%" }}>Difficulty</TableCell>
                      <TableCell sx={{ width: "12%" }}>Total answers</TableCell>
                      <TableCell sx={{ width: "12%" }}>Correct %</TableCell>
                      <TableCell sx={{ width: "13%" }}>Correct answers</TableCell>
                      <TableCell sx={{ width: "13%" }}>Wrong answers</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.questionId} hover>
                        <TableCell>{row.questionText}</TableCell>
                        <TableCell>
                          {typeof row.difficulty === "string"
                            ? row.difficulty.charAt(0).toUpperCase() + row.difficulty.slice(1)
                            : "—"}
                        </TableCell>
                        <TableCell>{row.totalAnswers}</TableCell>
                        <TableCell>{row.correctAnswerPercentage}%</TableCell>
                        <TableCell>{row.correctAnswers}</TableCell>
                        <TableCell>{row.wrongAnswers}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
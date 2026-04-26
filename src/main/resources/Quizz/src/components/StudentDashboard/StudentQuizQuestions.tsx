import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentDashboardHeader from "./StudentDashboardHeader";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import type { QuestionInfoData } from "../types";
import { fetchQuestion } from "../../questionapi";

export default function StudentQuizQuestions() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<QuestionInfoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Quiz ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchQuestion(Number(id))
      .then((data) => setQuestions(Array.isArray(data) ? data : []))
      .catch((err) => {
        setError(err?.message || "Failed to load quiz questions.");
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

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
            <Typography
              component="h1"
              variant="h3"
              sx={{
                mb: 1,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Quiz questions
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569" }}>
              {id ? `Questions for quiz #${id}.` : "Please select a quiz to view questions."}
            </Typography>
          </Paper>

          {loading ? (
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, textAlign: "center", bgcolor: "#ffffff" }}
            >
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Loading questions...</Typography>
            </Paper>
          ) : error ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          ) : questions.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#ffffff" }}>
              <Typography>No questions found for this quiz.</Typography>
            </Paper>
          ) : (
            <Paper elevation={0} sx={{ borderRadius: 4, bgcolor: "#ffffff" }}>
              <List disablePadding>
                {questions.map((question, index) => (
                  <Box key={question.id}>
                    <ListItem sx={{ alignItems: "flex-start", py: 3, px: 4 }}>
                      <Stack spacing={1} sx={{ width: "100%" }}>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
                            {`Question ${index + 1}`}
                          </Typography>
                          <Chip
                            label={question.difficulty}
                            color={question.difficulty === "hard" ? "error" : question.difficulty === "medium" ? "warning" : "success"}
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                          />
                        </Stack>
                        <Typography sx={{ color: "#334155" }}>{question.text}</Typography>
                      </Stack>
                    </ListItem>
                    {index < questions.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

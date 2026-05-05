import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboardHeader from "./StudentDashboardHeader";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { QuizzData } from "../types";
import { fetchPublishedQuizz } from "../../quizzapi";

export default function StudentQuizzList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizzData[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (value: string) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchPublishedQuizz()
      .then((data) => setQuizzes(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentDashboardHeader activePage="quizzes" />

      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: "#dcecff",
          maxWidth: 1180,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          width: "100%",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            mb: 3,
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              m: 0,
              fontSize: { xs: "2rem", md: "2.4rem" },
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.03em",
            }}
          >
            Quizzes
          </Typography>
        </Stack>

        {loading ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography>Loading published quizzes...</Typography>
          </Paper>
        ) : quizzes.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography>No published quizzes available yet.</Typography>
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
            <TableContainer>
              <Table
                sx={{
                  "& th": {
                    backgroundColor: "#f3fbff",
                    color: "#163b77",
                    borderBottom: "1px solid rgba(205, 226, 245, 0.95)",
                    fontSize: 15,
                    fontWeight: 700,
                  },
                  "& td": {
                    borderBottom: "1px solid rgba(224, 234, 244, 0.9)",
                    color: "#1f2a44",
                  },
                  "& tbody tr:hover": {
                    backgroundColor: "#f8fcff",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Results</TableCell>
                    <TableCell>Reviews</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id} hover>
                      <TableCell>
                        <Link
                          component="button"
                          underline="hover"
                          sx={{
                            fontWeight: 600,
                            color: "#2156c9",
                            textAlign: "left",
                            textDecorationColor: "rgba(33, 86, 201, 0.35)",
                          }}
                          onClick={() => navigate(`/student/quizz/${quiz.id}`)}
                        >
                          {quiz.name}
                        </Link>
                      </TableCell>
                      <TableCell>{quiz.description}</TableCell>
                      <TableCell>{quiz.course}</TableCell>
                      <TableCell>{quiz.category ?? quiz.categoryID?.name ?? "—"}</TableCell>
                      <TableCell>{formatDate(quiz.creationDate)}</TableCell>
                      <TableCell>
                        <Link
                          component="button"
                          underline="hover"
                          sx={{
                            fontWeight: 600,
                            color: "#2156c9",
                            textAlign: "left",
                            textDecorationColor: "rgba(33, 86, 201, 0.35)",
                          }}
                          onClick={() => navigate(`/student/quizz/${quiz.id}/results`)}
                        >
                          See results
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          component="button"
                          underline="hover"
                          sx={{
                            fontWeight: 600,
                            color: "#2156c9",
                            textAlign: "left",
                            textDecorationColor: "rgba(33, 86, 201, 0.35)",
                          }}
                          onClick={() => navigate(`/student/quizz/${quiz.id}/reviews`)}
                        >
                          See reviews
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
}




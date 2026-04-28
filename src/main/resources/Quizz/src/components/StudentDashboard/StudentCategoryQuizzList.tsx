import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import StudentDashboardHeader from "./StudentDashboardHeader";
import { fetchCategories } from "../../categoryapi";
import { fetchPublishedQuizz } from "../../quizzapi";
import type { CategoryData, QuizzData } from "../types";

export default function StudentCategoryQuizzList() {
  const navigate = useNavigate();
  const { categoryName } = useParams<{ categoryName: string }>();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [quizzes, setQuizzes] = useState<QuizzData[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedCategoryName = categoryName ?? "";

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchCategories(), fetchPublishedQuizz()])
      .then(([categoryData, quizData]) => {
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setQuizzes(Array.isArray(quizData) ? quizData : []);
      })
      .catch(() => {
        setCategories([]);
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const category = useMemo(
    () => categories.find((entry) => entry.name === selectedCategoryName) ?? null,
    [categories, selectedCategoryName],
  );

  const heading = category?.name || selectedCategoryName || "Category quizzes";

  const categoryQuizzes = useMemo(
    () => quizzes.filter((quiz) => (quiz.category ?? quiz.categoryID?.name ?? "") === selectedCategoryName),
    [quizzes, selectedCategoryName],
  );

  useEffect(() => {
    document.title = selectedCategoryName ? `${selectedCategoryName} quizzes` : "Category quizzes";
  }, [selectedCategoryName]);

  const formatDate = (value: string) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentDashboardHeader activePage="categories" />

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
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }}>
                {heading}
              </Typography>
              <Typography sx={{ mt: 1, color: "#5b6b86", maxWidth: 760 }}>
                {category?.description ?? "Browse quizzes in this category."}
              </Typography>
            </Box>

            <Button variant="outlined" onClick={() => navigate("/student/categories")}>
              Back to categories
            </Button>
          </Stack>

          {loading ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>Loading category quizzes...</Typography>
            </Paper>
          ) : categoryQuizzes.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>No published quizzes found in this category.</Typography>
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
                      <TableCell>Course</TableCell>
                      <TableCell>Added on</TableCell>
                      <TableCell>Results</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryQuizzes.map((quiz) => (
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
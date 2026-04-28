import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StudentDashboardHeader from "./StudentDashboardHeader";
import { fetchCategories } from "../../categoryapi";
import { fetchPublishedQuizz } from "../../quizzapi";
import type { CategoryData, QuizzData } from "../types";

export default function StudentCategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [quizzes, setQuizzes] = useState<QuizzData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Categories";
    setLoading(true);
    setError(null);

    Promise.all([fetchCategories(), fetchPublishedQuizz()])
      .then(([categoryData, quizData]) => {
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setQuizzes(Array.isArray(quizData) ? quizData : []);
      })
      .catch(() => {
        setCategories([]);
        setQuizzes([]);
        setError("Failed to load categories.");
      })
      .finally(() => setLoading(false));
  }, []);

  const quizCountByCategory = useMemo(() => {
    return quizzes.reduce<Record<string, number>>((counts, quiz) => {
      const categoryName = quiz.category ?? quiz.categoryID?.name;

      if (!categoryName) {
        return counts;
      }

      counts[categoryName] = (counts[categoryName] ?? 0) + 1;
      return counts;
    }, {});
  }, [quizzes]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentDashboardHeader activePage="categories" />

      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: "#dcecff",
          maxWidth: 980,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          width: "100%",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }}>
              Categories
            </Typography>
            <Typography sx={{ mt: 1, color: "#5b6b86" }}>
              Pick a category to narrow the quiz list.
            </Typography>
          </Box>

          {loading ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <CircularProgress size={28} />
              <Typography sx={{ mt: 2 }}>Loading categories...</Typography>
            </Paper>
          ) : error ? (
            <Paper sx={{ p: 4 }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          ) : categories.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>No categories available yet.</Typography>
            </Paper>
          ) : (
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid rgba(205, 226, 245, 0.9)",
                backgroundColor: "#ffffff",
                boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
                overflow: "hidden",
              }}
            >
              {categories.map((category, index) => (
                <Box key={category.id}>
                  {index > 0 ? <Divider /> : null}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{
                      px: { xs: 2, md: 3 },
                      py: 2.5,
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                        {category.name}
                      </Typography>
                      <Typography sx={{ mt: 0.75, color: "#5b6b86" }}>
                        {category.description}
                      </Typography>
                      <Typography sx={{ mt: 1, color: "#2156c9", fontSize: "0.92rem", fontWeight: 600 }}>
                        {`${quizCountByCategory[category.name] ?? 0} published quiz${quizCountByCategory[category.name] === 1 ? "" : "zes"}`}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/student/categories/${encodeURIComponent(category.name)}`)}
                    >
                      Browse quizzes
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
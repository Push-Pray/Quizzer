import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboardHeader from "./StudentDashboardHeader";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import logo from "../../assets/LogoQuiz.png";
import type { QuizzData } from "../types";
import { fetchPublishedQuizz } from "../../quizzapi";

export default function StudentQuizzList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizzData[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: GridColDef<QuizzData>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Link
          component="button"
          underline="hover"
          sx={{
            fontWeight: 600,
            color: "#2156c9",
            textAlign: "left",
            textDecorationColor: "rgba(33, 86, 201, 0.35)",
          }}
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/student/quizz/${params.row.id}`);
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.35,
      minWidth: 230,
    },
    {
      field: "course",
      headerName: "Course Code",
      flex: 0.95,
      minWidth: 165,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
        valueGetter: (_, row) => row.category ? row.category : "—",
    },
    {
      field: "creationDate",
      headerName: "Created",
      width: 145,
      valueFormatter: (value: string) => {
        if (!value) return "";
        return new Date(value).toLocaleDateString("fi-FI", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  ];

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
          backgroundColor: "#f8f9fa",
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
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Quizzer logo"
              sx={{
                width: { xs: 68, md: 84 },
                height: { xs: 68, md: 84 },
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            <Box>
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
                Published quizzes
              </Typography>
            </Box>
          </Stack>
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
            <Box sx={{ width: "100%", minHeight: 520 }}>
              <DataGrid
                rows={quizzes || []}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
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
                    transition: "background-color 120ms ease",
                    cursor: "pointer",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f8fcff",
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
      </Box>
    </Box>
  );
}



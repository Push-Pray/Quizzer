import { useState, useEffect } from "react";
import type  { QuizzData, Quizz} from "../../components/types"
import AddQuizz from "./AddQuizz";
import { fetchQuizz, deleteQuizz } from "../../quizzapi";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import EditQuizz from "./EditQuizz";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DashboardHeader from "./DashboardHeader";

function QuizList(){

    const [quizz,setQuizzes]= useState<QuizzData[]>([]);

    const navigate = useNavigate();

    const formatDate = (value: string) => {
        if (!value) return "";

        return new Date(value).toLocaleDateString("fi-FI", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
     const getQuizz = () => {
        fetchQuizz()
        .then(data => { 
            setQuizzes(Array.isArray(data)? data : [])})
        .catch(err => console.error(err))
     }
    
     const handleAddQuizz = async (quizz: Quizz) => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/quizz", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(quizz)
        });

            if (!response.ok)
                throw new Error("Error when adding quizz");

            await response.json();
            getQuizz();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    const handleUpdateQuizz = async (id: number, updatedQuizz: Quizz) => {
        const payload = {
            name: updatedQuizz.name,
            description: updatedQuizz.description,
            course: updatedQuizz.course,
            category: updatedQuizz.category,
            published: updatedQuizz.published,
            creationDate: updatedQuizz.creationDate,
            questions: []
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/quizz/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(payload)
        });

            if (!response.ok)
                throw new Error("Error when updating quizz");

            await response.json();
            getQuizz();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

   const handleDeleteQuizz = (id: number) => {
    if (window.confirm("Are you sure?")) {
        deleteQuizz(id)
        .then(() => {
        getQuizz();
        alert("Deleted successfully");
      })
      .catch(err => {
        console.error(err);
        alert("Delete failed");
      });
  }
};

    useEffect(() => {
        document.title = "Quizzes";
        getQuizz();
    }, [])
    
     return(

        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#dcecff",
            }}
        >
            <DashboardHeader activePage="quizzes" />

            <Box
                sx={{
                    maxWidth: 1280,
                    mx: "auto",
                    px: { xs: 2, md: 3 },
                    py: { xs: 3, md: 4 },
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
                        spacing={0}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <Box>
                        <Typography
                            sx={{
                                m: 0,
                                fontSize: { xs: "2.1rem", md: "2.35rem" },
                                fontWeight: 600,
                                color: "#111827",
                            }}
                        >
                            Quizzes
                        </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                    <AddQuizz handleAddQuizz={handleAddQuizz}/>
                    </Stack>
                </Stack>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "none",
                        backgroundColor: "#ffffff",
                        boxShadow: "none",
                        height: 520,
                    }}
                >
                    <TableContainer sx={{ width: "100%", height: "100%" }}>
                        <Table
                            sx={{
                                backgroundColor: "#ffffff",
                                '& th': {
                                    backgroundColor: "#e8f7ff",
                                    color: "#163b77",
                                    borderBottom: "1px solid #cfe3f5",
                                    fontSize: 14,
                                    fontWeight: 700,
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Course Code</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell>Published</TableCell>
                                    <TableCell>Results</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizz.map((quiz) => (
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
                                                onClick={() => navigate(`/quizz/${quiz.id}`)}
                                            >
                                                {quiz.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{quiz.description}</TableCell>
                                        <TableCell>{quiz.course}</TableCell>
                                        <TableCell>{quiz.categoryID?.name || quiz.category || "—"}</TableCell>
                                        <TableCell>{formatDate(quiz.creationDate)}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={quiz.published ? "Published" : "Not Published"}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: quiz.published ? "#1f7a4d" : "#9a5a00",
                                                    bgcolor: quiz.published ? "#d8f3e3" : "#fff1c9",
                                                }}
                                            />
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
                                                onClick={() => navigate(`/quizz/${quiz.id}/results`)}
                                            >
                                                See results
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <EditQuizz
                                                quizz={quiz}
                                                handleUpdate={handleUpdateQuizz}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="error"
                                                size="small"
                                                sx={{ color: "#ef4444" }}
                                                onClick={() => handleDeleteQuizz(quiz.id)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>

)
}



export default QuizList;
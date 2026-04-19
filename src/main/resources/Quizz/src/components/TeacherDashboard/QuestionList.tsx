import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import type { QuestionInfoData } from "../../components/types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddQuestion from "./AddQuestion";
import Chip from "@mui/material/Chip";
import { fetchQuizz } from "../../quizzapi";
import { deleteQuestion } from "../../questionapi";
import Link from "@mui/material/Link";

export default function QuestionList() {

    const { id } = useParams(); 
    const navigate = useNavigate();
    const quizId = Number(id);

    const [questions, setQuestions] = useState<QuestionInfoData[]>([]);

    const columns : GridColDef<QuestionInfoData>[] =[
        {
          field: "text",
          headerName: "Question",
          flex: 1,
          renderCell: (params) => (
            <Link
              component="button"
              underline="hover"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/quizz/${quizId}/question/${params.row.id}`);
              }}
            >
              {params.value}
            </Link>
          )
        },

        {
            field: "difficulty",
            headerName: "Difficulty",
            width: 150,
            renderCell: (params) => (
            <Chip
              label={params.value}
              color={
              params.value === "easy"
                ? "success"
                : params.value === "medium"
                ? "warning"
                : "error"
              }
          size="small"
    
          />
            )
        },
        {
            field:"delete",
            width:60,
            headerName:"",
            renderCell: (params) => (
                <IconButton
                color="error"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuestion(params.row.id);
                }}
                >
                <DeleteIcon />

                </IconButton>
            )
        }
];
    
    const getQuestions = async () => {
      try {
        const quizzes = await fetchQuizz();
        const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
        setQuestions(selectedQuiz?.questions ?? []);
        return true;
      } catch (err) {
        console.error(err);
        setQuestions([]);
        return false;
      }
    };

const handleDeleteQuestion = async (questionId: number) => {
  if (!window.confirm("Delete this question?")) {
    return;
  }

  try {
    await deleteQuestion(quizId, questionId);
    setQuestions((currentQuestions) =>
      currentQuestions.filter((question) => question.id !== questionId)
    );
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

    useEffect(() => {
      getQuestions();
    }, [quizId]);
    return (
  <>
    <Button onClick={() => navigate("/")}>
      Back
    </Button>

    <AddQuestion quizId={quizId} onAdded={getQuestions} />

    <div style={{ height: 400, width: "100%", marginTop: 20 }}>
      <DataGrid
        rows={questions}
        columns={columns}
        getRowId={(row) => row.id}
        autoPageSize
        disableRowSelectionOnClick
      />
    </div>
    </>
    );
}
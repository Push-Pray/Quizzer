import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import type { QuestionInfoData } from "../../components/types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddQuestion from "./AddQuestion";
import Chip from "@mui/material/Chip";

export default function QuestionList() {

    const { id } = useParams(); 
    const navigate = useNavigate();
    const quizId = Number(id);

    const [questions, setQuestions] = useState<QuestionInfoData[]>([]);

    const columns : GridColDef<QuestionInfoData>[] =[
        { field: "text", headerName: "Question", flex: 1 },

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
    
    const getQuestions = () => {
    fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/question`)
    .then(res => {
      if (!res.ok) throw new Error("Error fetching questions");
      return res.json();
    })
    .then(data => setQuestions(data))
    .catch(err => console.error(err));
};

const handleDeleteQuestion = (questionId: number) => {
  if (window.confirm("Delete this question?")) {
    fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/question/${questionId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Error deleting question");
      })
      .then(() => getQuestions())
      .catch(err => console.error(err));
  }
};

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/question`)
        .then(res => {
            if (!res.ok) throw new Error("Error fetching questions");
            return res.json();
        })
        .then(data => setQuestions(data))
        .catch(err => console.error(err));
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
      />
    </div>
    </>
    );
}
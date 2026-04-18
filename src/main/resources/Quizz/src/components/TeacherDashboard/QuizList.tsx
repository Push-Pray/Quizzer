import { useState, useEffect } from "react";
import type  { QuizzData, Quizz} from "../../components/types"
import type { GridColDef,  GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import AddQuizz from "./AddQuizz";
import { fetchQuizz, deleteQuizz } from "../../quizzapi";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import EditQuizz from "./EditQuizz";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

function QuizList(){

    const [quizz,setQuizzes]= useState<QuizzData[]>([]);

    const navigate = useNavigate();

    const columns : GridColDef<QuizzData>[] = [
        {
            field: "name",
            headerName: "Name",
            renderCell: (params) => (
                <Link
                    component="button"
                    underline="hover"
                    onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/quizz/${params.row.id}`);
                    }}
                >
                    {params.value}
                </Link>
            )
        },
        {field: "description", headerName: "Description"},
        {field: "course", headerName: "Course Code"},
        {
            field: "creationDate",
            headerName: "Created",
            width:145,
            valueFormatter: (value : string) => {
                if (!value) return "";

              
                return new Date(value).toLocaleDateString("fi-FI", {
                    year:"numeric",
                    month:"short",
                    day: "numeric"
                });
            }
        },
        {
            field:"published",
            headerName:"Published",
            width: 135,
            renderCell: (params) => {
                const isPublished = params.value;
                return(
                    <Chip
                    label = {isPublished ? "Published" : "Not Published"}
                    color = { isPublished ? "success" : "error"}
                    size="small"
                    />
                )
            }
        },
        {
            field: "edit",
            headerName: "",
            width: 60,
            sortable: false,
            filterable: false,
            renderCell: (params)=>(
                <EditQuizz
                
                quizz={params.row}
                handleUpdate={handleUpdateQuizz}
                />
            )
        },
        {
         field: "delete",
         headerName: "",
         width:60,
         sortable: false,
         filterable: false,
         renderCell: (params: GridRenderCellParams<QuizzData>) =>(
         <IconButton 
            color="error" 
            size="small" 
            onClick={(e) => {
                e.stopPropagation();
                handleDeleteQuizz(params.row.id);
            }}>
        <DeleteIcon/>
         </IconButton>
         )
     }, 
        
        
    ]
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
        getQuizz();
    }, [])
    
     return(

    <>
    <Stack direction="row" sx={{ mt: 2, mb: 2 }} >
        <AddQuizz handleAddQuizz={handleAddQuizz}/>
    </Stack>
    <div style={{ width: "90%", height: 500 }}>
        <DataGrid
          rows={quizz || []}
          columns={columns}
          getRowId={(row)=> row.id}
          autoPageSize
          rowSelection={false}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell":{
                borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders":{
                borderBottom: "none",
            }
          }}
        />
      </div>
    
    </>

)
}



export default QuizList;
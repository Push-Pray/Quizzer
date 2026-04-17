import { useState, useEffect } from "react";
import type  { QuizzData, Quizz} from "../../components/types"
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import AddQuizz from "./AddQuizz";
import { fetchQuizz } from "../../quizzapi";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

function QuizList(){

    const [quizz,setQuizzes]= useState<QuizzData[]>([]);

    const columns : GridColDef[] = [
        {field: "name", headerName: "Name"},
        {field: "description", headerName: "Descriptions"},
        {field: "course", headerName: "Course Code"},
        {
            field: "creationDate",
            headerName: "Created",
            width:160,
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
            width: 150,
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
        }
        
    ]
     const getQuizz = () => {
        fetchQuizz()
        .then(data => { 
            console.log("Data:", data);
            setQuizzes(data._embedded?.quizzInfoDTOList || [])})
        .catch(err => console.error(err))
     }
    
     const handleAddQuizz = (quizz: Quizz) => {
        
        fetch(import.meta.env.VITE_API_URL + "/quizz", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(quizz)
        })
        .then(response =>{
            if (!response.ok)
                throw new Error("Error when adding quizz");

            return response.json();
        })
        .then(()=> getQuizz())
        .catch(err => console.error(err));
    }


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
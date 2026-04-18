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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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
                    sx={{
                        fontWeight: 600,
                        color: "#2156c9",
                        textAlign: "left",
                        textDecorationColor: "rgba(33, 86, 201, 0.35)",
                    }}
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
                    size="small"
                    sx={{
                        fontWeight: 700,
                        color: isPublished ? "#1f7a4d" : "#9a5a00",
                        bgcolor: isPublished ? "#d8f3e3" : "#fff1c9",
                    }}
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
                sx={{ color: "#ef4444" }}
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

        <Box
            sx={{
                minHeight: "100vh",
                px: { xs: 2, md: 5 },
                py: { xs: 3, md: 5 },
                background: "linear-gradient(180deg, #eaf5ff 0%, #f4fbff 42%, #eef7ff 100%)",
            }}
        >
            <Box
                sx={{
                    maxWidth: 1180,
                    mx: "auto",
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
                            Quizzes
                        </Typography>
                    </Box>
                    <AddQuizz handleAddQuizz={handleAddQuizz}/>
                </Stack>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        border: "1px solid rgba(161, 197, 233, 0.55)",
                        backgroundColor: "rgba(255, 255, 255, 0.88)",
                        boxShadow: "0 24px 50px rgba(110, 154, 194, 0.16)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Box sx={{ width: "100%", minHeight: 520 }}>
                        <DataGrid
                            rows={quizz || []}
                            columns={columns}
                            getRowId={(row)=> row.id}
                            autoPageSize
                            rowSelection={false}
                            disableColumnMenu
                            sx={{
                                border: "none",
                                backgroundColor: "transparent",
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: "#edf7ff",
                                    color: "#163b77",
                                    borderBottom: "1px solid rgba(176, 207, 236, 0.9)",
                                    fontSize: 15,
                                    fontWeight: 700,
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 700,
                                },
                                '& .MuiDataGrid-row': {
                                    backgroundColor: "rgba(255, 255, 255, 0.94)",
                                    transition: "background-color 120ms ease",
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: "#f6fbff",
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: "1px solid rgba(224, 234, 244, 0.9)",
                                    color: "#1f2a44",
                                    alignItems: "center",
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: "1px solid rgba(224, 234, 244, 0.9)",
                                    backgroundColor: "rgba(248, 252, 255, 0.9)",
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    backgroundColor: "transparent",
                                },
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>

)
}



export default QuizList;
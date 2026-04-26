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
import DashboardHeader from "./DashboardHeader";

function QuizList(){

    const [quizz,setQuizzes]= useState<QuizzData[]>([]);

    const navigate = useNavigate();

    const columns : GridColDef<QuizzData>[] = [
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
                        navigate(`/quizz/${params.row.id}`);
                    }}
                >
                    {params.value}
                </Link>
            )
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
            valueGetter: (_, row) => row.categoryID?.name || row.category || "—"
        },
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
            width: 150,
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
            width: 72,
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
         width:72,
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
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <DataGrid
                            rows={quizz || []}
                            columns={columns}
                            getRowId={(row)=> row.id}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10, page: 0 } },
                            }}
                            pageSizeOptions={[5, 10, 25, 50]}
                            rowSelection={false}
                            disableColumnMenu
                            sx={{
                                border: "none",
                                backgroundColor: "#ffffff",
                                height: "100%",
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: "#e8f7ff",
                                    color: "#163b77",
                                    borderBottom: "1px solid #cfe3f5",
                                    fontSize: 14,
                                    fontWeight: 700,
                                },
                                '& .MuiDataGrid-topContainer': {
                                    backgroundColor: "#e8f7ff",
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: "#e8f7ff",
                                },
                                '& .MuiDataGrid-columnHeadersInner': {
                                    backgroundColor: "#e8f7ff",
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 700,
                                },
                                '& .MuiDataGrid-columnSeparator': {
                                    color: "rgba(22, 59, 119, 0.18)",
                                },
                                '& .MuiDataGrid-row': {
                                    backgroundColor: "#ffffff",
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: "#ffffff",
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: "1px solid #e5e7eb",
                                    color: "#1f2937",
                                    alignItems: "center",
                                },
                                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                                    outline: "none",
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: "1px solid #e5e7eb",
                                    backgroundColor: "#ffffff",
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    backgroundColor: "#ffffff",
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
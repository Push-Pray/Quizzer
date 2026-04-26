import { useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../../categoryapi";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddCategory from "./AddCategory";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardHeader from "./DashboardHeader";

interface Category {
  id: number;
  name: string;
  description: string;
}

function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  const getCategories = () => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error);
  };

  useEffect(() => {
    getCategories();
    document.title = "Categories";
  }, []);

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await deleteCategory(id);
      getCategories();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 600 },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Category>) => (
        <IconButton
          color="error"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteCategory(params.row.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
  <Box
    sx={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #edf6ff 0%, #eef8ff 36%, #f5fbff 100%)",
    }}
  >
    <DashboardHeader activePage="categories" />

    <Box sx={{ width: "100%", maxWidth: 1180, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button onClick={() => navigate("/")}>Back</Button>
        <AddCategory onAdded={getCategories} />
      </Stack>

      <Paper
        sx={{
          height: 500,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={categories}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Paper>
      
    </Box>
  </Box>
);
}

export default CategoryList;
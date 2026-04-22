import { useEffect, useState } from "react";
import { fetchCategories } from "../../categoryapi";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import AddCategory from "./AddCategory";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

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

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 600 },
  ];

  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      pt: 6,
      background: "linear-gradient(180deg, #eaf5ff 0%, #f4fbff 42%, #eef7ff 100%)",
    }}
  >
    <Box sx={{ width: "100%", maxWidth: 1180 }}>
      
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
import { useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../../categoryapi";
import AddCategory from "./AddCategory";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DashboardHeader from "./DashboardHeader";

interface Category {
  id: number;
  name: string;
  description: string;
}

function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#dcecff",
    }}
  >
    <DashboardHeader activePage="categories" />

    <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 3, md: 4 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography
          sx={{
            m: 0,
            fontSize: { xs: "2.1rem", md: "2.35rem" },
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Categories
        </Typography>

        <AddCategory onAdded={getCategories} />
      </Stack>

      <Paper
        elevation={0}
        sx={{
          minHeight: 420,
          borderRadius: 3,
          overflow: "hidden",
          border: "none",
          backgroundColor: "#ffffff",
          boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
        }}
      >
        <TableContainer>
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
                <TableCell>Category Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      size="small"
                      sx={{ color: "#ef4444" }}
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <DeleteIcon />
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
);
}

export default CategoryList;
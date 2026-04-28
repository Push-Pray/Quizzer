import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { addCategory } from "../../categoryapi";

function AddCategory({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    try {
      await addCategory({ name, description });
      onAdded();
      setOpen(false);
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: 3,
          px: 2.5,
          py: 1.15,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          boxShadow: "0 12px 24px rgba(0, 126, 167, 0.18)",
          background: "linear-gradient(135deg, #2e7cf6 0%, #0ea5c6 100%)",
          '&:hover': {
            background: "linear-gradient(135deg, #256ee0 0%, #0c95b2 100%)",
            boxShadow: "0 14px 28px rgba(0, 126, 167, 0.24)",
          },
        }}
      >
        Add New Category
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: "0 12px 30px rgba(74, 111, 147, 0.18)",
              width: "100%",
              maxWidth: 760,
              p: { xs: 0.25, sm: 0.5 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            px: { xs: 2.5, sm: 3 },
            pt: { xs: 2, sm: 2.5 },
            pb: 0.5,
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#14213d",
          }}
        >
          Add Category
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, py: 1.5 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: "#ffffff",
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={4}
            sx={{
              mt: 1.25,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: "#ffffff",
                alignItems: "flex-start",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: { xs: 2.5, sm: 3 }, pb: { xs: 2, sm: 2.5 }, pt: 0.25, justifyContent: "flex-start" }}>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2.25,
              py: 0.9,
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb 0%, #0ea5c6 100%)",
              boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)",
            }}
          >
            Save Category
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2.25,
              py: 0.9,
              fontWeight: 600,
              borderColor: "#bfdbfe",
              color: "#31425f",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCategory;
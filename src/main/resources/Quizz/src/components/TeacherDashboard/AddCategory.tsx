import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
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
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Category
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCategory;
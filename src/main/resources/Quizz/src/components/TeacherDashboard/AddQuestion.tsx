import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import type { QuestionInfo } from '../types';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


type AddQuestionProps = {
  quizId: number;
  onAdded: () => Promise<boolean>
};

export default function AddQuestion({ quizId, onAdded }: AddQuestionProps) {

  const [open, setOpen] = useState(false);



  const [question, setQuestion] = useState<QuestionInfo>({
    text: "",
    difficulty: "easy"
  });

  const handleOpen = () => {
    setQuestion({ text: "", difficulty: "easy" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {

    const difficultyMap: Record<string, number> = {
      "easy": 0,
      "medium": 1,
      "hard": 2
    };

    fetch(`${import.meta.env.VITE_API_URL}/quizz/${quizId}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: question.text,
        difficulty: difficultyMap[question.difficulty]
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Error adding question");
      return res.json();
    })
    .then(async () => {
      const saved = await onAdded();
      if (saved) {
        handleClose();
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          mb: 2,
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
        Add Question
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              width: { xs: "min(92vw, 420px)", sm: 520 },
              maxWidth: "92vw",
              overflowX: "hidden",
              boxShadow: "0 24px 50px rgba(110, 154, 194, 0.22)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,251,255,0.98) 100%)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Add Question
        </DialogTitle>

        <DialogContent sx={{ px: 3, pt: 2, pb: 0, overflow: "visible" }}>
          <TextField
            label="Question"
            value={question.text}
            onChange={e => setQuestion({ ...question, text: e.target.value })}
            fullWidth
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.88)",
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={question.difficulty}
              label="Difficulty"
              onChange={(e) => setQuestion({...question, 
                difficulty: e.target.value as "easy" | "medium" | "hard"})}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.88)",
              }}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
          <Button onClick={handleClose} sx={{ textTransform: "none", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
              px: 2.25,
              background: "linear-gradient(135deg, #2e7cf6 0%, #0ea5c6 100%)",
              boxShadow: "0 10px 20px rgba(0, 126, 167, 0.18)",
              '&:hover': {
                background: "linear-gradient(135deg, #256ee0 0%, #0c95b2 100%)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
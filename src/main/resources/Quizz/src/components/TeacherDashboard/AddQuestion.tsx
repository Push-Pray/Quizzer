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
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Question
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Question</DialogTitle>
        
        <TextField
          label="Question"
          value={question.text}
          onChange={e => setQuestion({ ...question, text: e.target.value })}
          fullWidth
          sx={{ m: 2 }}
        />

        <FormControl fullWidth sx={{ mx: 2, mb: 2 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={question.difficulty}
            label="Difficulty"
            onChange={(e) => setQuestion({...question, 
              difficulty: e.target.value as "easy" | "medium" | "hard"})}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
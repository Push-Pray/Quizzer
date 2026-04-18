import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import type { QuestionData } from "../types";
import { addQuestionOption, deleteQuestionOption, fetchQuestionDetails } from "../../optionapi";

export default function OptionList() {
  const navigate = useNavigate();
  const { quizId, questionId } = useParams();

  const resolvedQuizId = Number(quizId);
  const resolvedQuestionId = Number(questionId);

  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const loadQuestion = async () => {
    try {
      const data = await fetchQuestionDetails(resolvedQuizId, resolvedQuestionId);
      setQuestion(data);
      return true;
    } catch (error) {
      console.error(error);
      setQuestion(null);
      return false;
    }
  };

  const handleAddOption = async () => {
    if (!optionText.trim()) {
      return;
    }

    try {
      await addQuestionOption(resolvedQuestionId, optionText, isCorrect);
      const refreshed = await loadQuestion();
      if (refreshed) {
        setOptionText("");
        setIsCorrect(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOption = async (optionIndex: number) => {
    try {
      await deleteQuestionOption(resolvedQuestionId, optionIndex);
      await loadQuestion();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [resolvedQuizId, resolvedQuestionId]);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button onClick={() => navigate(`/quizz/${resolvedQuizId}`)}>Back</Button>
      </Stack>

      <Stack spacing={2} sx={{ maxWidth: 960 }}>
        <h1>Add an answer option to "{question?.text ?? ""}"</h1>

        <TextField
          label="Answer option text"
          value={optionText}
          onChange={(event) => setOptionText(event.target.value)}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isCorrect}
              onChange={(event) => setIsCorrect(event.target.checked)}
            />
          }
          label="Correct answer"
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleAddOption}>Add</Button>
          <Button onClick={() => {
            setOptionText("");
            setIsCorrect(false);
          }}>Cancel</Button>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          {question?.options.map((option, index) => (
            <Stack
              key={`${option}-${index}`}
              direction="row"
              sx={{
                border: "1px solid #e0e0e0",
                px: 2,
                py: 1,
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>
                {option}
                {question.correctIndex === index ? " (Correct)" : ""}
              </span>
              <IconButton color="error" onClick={() => handleDeleteOption(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
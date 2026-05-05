import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ReviewData } from "../types";

type ReviewListProps = {
  reviews: ReviewData[];
  loading: boolean;
  error: string | null;
  quizName: string;
  onSubmit: (review: Omit<ReviewData, "id" | "creationDate">) => Promise<void>;
};

const gradeOptions = [
  { value: 1, label: "1 - Useless" },
  { value: 2, label: "2 - Poor" },
  { value: 3, label: "3 - Ok" },
  { value: 4, label: "4 - Good" },
  { value: 5, label: "5 - Excellent" },
];

export default function ReviewList({ reviews, loading, error, onSubmit }: ReviewListProps) {
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState<number>(4);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    return reviews.reduce((sum, review) => sum + review.grade, 0) / reviews.length;
  }, [reviews]);

  const handleSubmit = async () => {
    if (!nickname.trim() || !text.trim()) {
      setSubmitError("Please provide a nickname and review text.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit({ nickname: nickname.trim(), grade, text: text.trim() });
      setNickname("");
      setGrade(4);
      setText("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: "0 14px 32px rgba(134, 175, 214, 0.18)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: { xs: 2.5, md: 3 } }}>
       
        <Typography sx={{ color: "#475569", mb: 2.5 }}>
          {reviews.length > 0
            ? `${averageRating.toFixed(1)} rating average based on ${reviews.length} review${reviews.length === 1 ? "" : "s"}.`
            : "No reviews yet. Be the first to share your experience."}
        </Typography>

        {showForm ? (
          <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3, border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
            <Typography sx={{ fontWeight: 700, mb: 2, color: "#0f172a" }}>Write your review</Typography>
            <Stack spacing={2}>
              <TextField
                label="Nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                fullWidth
                size="small"
                placeholder="quizlover9000"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
              <FormControl>
                <FormLabel sx={{ mb: 1, fontWeight: 600, color: "#0f172a" }}>Rating</FormLabel>
                <RadioGroup
                  row
                  value={String(grade)}
                  onChange={(event) => setGrade(Number(event.target.value))}
                >
                  {gradeOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={String(option.value)}
                      control={<Radio />}
                      label={option.label}
                      sx={{ mr: 2 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <TextField
                label="Review"
                value={text}
                onChange={(event) => setText(event.target.value)}
                fullWidth
                multiline
                rows={4}
                size="small"
                placeholder="Pretty good quiz for learning the basics of Scrum..."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
              {submitError && (
                <Typography color="error" sx={{ fontSize: "0.95rem" }}>
                  {submitError}
                </Typography>
              )}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={submitting}
                  sx={{
                    textTransform: "uppercase",
                    borderRadius: 2,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #2563eb 0%, #0ea5c6 100%)",
                    py: 0.7,
                    fontSize: "0.85rem",
                    letterSpacing: 0.5,
                  }}
                >
                  {submitting ? "Submitting..." : "Submit your review"}
                </Button>
                <Button
                  variant="text"
                  onClick={() => setShowForm(false)}
                  sx={{
                    textTransform: "none",
                    color: "#475569",
                    fontWeight: 700,
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ) : (
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{
              mb: 3,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb 0%, #0ea5c6 100%)",
              py: 1,
              fontSize: "0.95rem",
            }}
          >
            Write a review
          </Button>
        )}

        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading reviews...</Typography>
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Stack spacing={2}>
            {reviews.length === 0 ? (
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#f8fafc" }}>
                <Typography>No reviews have been shared yet.</Typography>
              </Paper>
            ) : (
              reviews.map((review) => (
                <Paper key={review.id} sx={{ p: 3, borderRadius: 3, bgcolor: "#f8fafc" }}>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>{review.nickname}</Typography>
                  <Typography sx={{ color: "#475569", fontSize: "0.9rem", mb: 1.5 }}>
                    Rating: {review.grade}/5 · Written on: {new Date(review.creationDate).toLocaleDateString()}
                  </Typography>
                  <Typography sx={{ color: "#334155", lineHeight: 1.5 }}>{review.text}</Typography>
                </Paper>
              ))
            )}
          </Stack>
        )}
      </Box>
    </Paper>
  );
}

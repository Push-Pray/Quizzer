import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LogoQuiz.png";

type StudentDashboardHeaderProps = {
  activePage?: "quizzes" | "categories";
};

function StudentDashboardHeader({ activePage }: StudentDashboardHeaderProps) {
  const navigate = useNavigate();

  const navButtonSx = {
    textTransform: "none",
    minWidth: "auto",
    px: 1.5,
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid rgba(191, 219, 254, 0.9)",
        boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: 1.1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Quizzer logo"
            sx={{
              width: { xs: 52, md: 62 },
              height: { xs: 52, md: 62 },
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1.65rem", md: "2rem" },
                fontWeight: 500,
                lineHeight: 1,
                color: "#0b66e8",
              }}
            >
              Quizzer
            </Typography>
            <Typography
              sx={{
                mt: 0.25,
                fontSize: "0.9rem",
                color: "#5b6b86",
              }}
            >
              Student Dashboard
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="text"
            disableElevation
            sx={{
              ...navButtonSx,
              fontWeight: activePage === "quizzes" ? 700 : 500,
              color: activePage === "quizzes" ? "#2156c9" : "#42526b",
            }}
            onClick={() => navigate("/student")}
          >
            Published quizzes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default StudentDashboardHeader;

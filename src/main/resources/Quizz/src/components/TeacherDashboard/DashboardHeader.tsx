import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LogoQuiz.png";

type DashboardHeaderProps = {
  activePage: "quizzes" | "categories";
};

function DashboardHeader({ activePage }: DashboardHeaderProps) {
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
        borderBottom: "1px solid #d9e2ec",
      }}
    >
      <Stack
        direction="row"
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: 1.5,
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
                fontSize: { xs: "1.7rem", md: "2rem" },
                fontWeight: 400,
                lineHeight: 1,
                color: "#1870d5",
              }}
            >
              Quizzer
            </Typography>
            <Typography
              sx={{
                mt: 0.25,
                fontSize: "0.85rem",
                color: "#5b6472",
              }}
            >
              Teacher Dashboard
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
              color: activePage === "quizzes" ? "#2456c7" : "#3f4a5a",
            }}
            onClick={() => navigate("/")}
          >
            Quizzes
          </Button>
          <Button
            variant="text"
            disableElevation
            sx={{
              ...navButtonSx,
              fontWeight: activePage === "categories" ? 700 : 500,
              color: activePage === "categories" ? "#2456c7" : "#3f4a5a",
            }}
            onClick={() => navigate("/categories")}
          >
            Categories
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default DashboardHeader;
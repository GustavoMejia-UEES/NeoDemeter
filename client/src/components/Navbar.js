import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/NEO_DEMETER_WHITE.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#0D47A1" }}>
        <Container>
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <img src={logo} alt="NeoDemeter Logo" width={40} height={40} style={{ marginRight: 10 }} />
              <Typography variant="h6" sx={{ color: "#F5F5F5", textDecoration: "none" }}>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                  NeoDemeter
                </Link>
              </Typography>
            </Box>
            <Button sx={{ color: "#F5F5F5", '&:hover': { color: "#64B5F6" } }} onClick={() => navigate("/satellite-data")}>Satellite Data</Button>
            <Button sx={{ color: "#F5F5F5", '&:hover': { color: "#64B5F6" } }} onClick={() => navigate("/nutritional-data")}>Nutritional Data</Button>
            <Button sx={{ color: "#F5F5F5", '&:hover': { color: "#64B5F6" } }} onClick={() => navigate("/economic-data")}>Economic Data</Button>
            <Button sx={{ color: "#F5F5F5", '&:hover': { color: "#64B5F6" } }} onClick={() => navigate("/other")}>Other</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

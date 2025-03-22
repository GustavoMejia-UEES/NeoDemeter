import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Importa el Footer
import HomePage from "./pages/HomePage";
import SatelliteDataPage from "./pages/SatelliteDataPage";
import NutritionalDataPage from "./pages/NutritionalDataPage";
import EconomicDataPage from "./pages/EconomicDataPage";
import CulturalPage from "./pages/CulturalPage";

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Asegura que el contenedor ocupe toda la altura de la pantalla
        }}
      >
        <Navbar />
        <Container sx={{ flexGrow: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/satellite-data" element={<SatelliteDataPage />} />
            <Route path="/nutritional-data" element={<NutritionalDataPage />} />
            <Route path="/economic-data" element={<EconomicDataPage />} />
            <Route path="/cultural-background" element={<CulturalPage />} />
          </Routes>
        </Container>
        <Footer /> {/* Agrega el Footer aquí */}
      </Box>
    </BrowserRouter>
  );
}
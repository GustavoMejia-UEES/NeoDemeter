import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SatelliteDataPage from "./pages/SatelliteDataPage";
import NutritionalDataPage from "./pages/NutritionalDataPage";
import EconomicDataPage from "./pages/EconomicDataPage";
import OtherPage from "./pages/OtherPage"; // Correcto



export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/satellite-data" element={<SatelliteDataPage />} />
          <Route path="/nutritional-data" element={<NutritionalDataPage />} />
          <Route path="/economic-data" element={<EconomicDataPage />} />
          <Route path="/other" element={<OtherPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

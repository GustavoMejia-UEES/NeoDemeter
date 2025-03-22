import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Divider,
} from "@mui/material";
import GEEEmbedMap from "../components/GEEEmbedMap";

const SatelliteDataPage = () => {
  const [bandCombination, setBandCombination] = useState("rgb");
  const [showMap, setShowMap] = useState(false);
  const [selectedResource, setSelectedResource] = useState(""); // Para los recursos adicionales

  const bandOptions = [
    { value: "rgb", label: "RGB (B4, B3, B2)" },
    { value: "air", label: "Aire (B5, B6, B7)" },
    { value: "water", label: "Agua (B2, B3, B5)" },
    { value: "land", label: "Vegetación (B4, B5, B6)" },
  ];

  const resourceOptions = [
    { value: "food_access", label: "Atlas de Acceso a Alimentos", link: "https://www.ers.usda.gov/data-products/food-access-research-atlas/go-to-the-atlas" },
    { value: "ndvi_drought", label: "Análisis de Sequía (NDVI)", link: "https://www.star.nesdis.noaa.gov/mapper/" },
    { value: "croplandcros", label: "Mapa de Tierras de Cultivo", link: "https://www.nass.usda.gov/Research_and_Science/Cropland/SARS1a.php" },
    { value: "noaa_climate", label: "Datos Climáticos de NOAA", link: "https://www.ncei.noaa.gov/" },
    { value: "nasa_eosdis", label: "Datos Satelitales de NASA", link: "https://www.earthdata.nasa.gov/about/esdis/eosdis" },
    { value: "web_soil_survey", label: "Encuesta de Suelos NRCS", link: "https://websoilsurvey.nrcs.usda.gov/app/" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMap(true);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Datos Satelitales - Phoenix, Arizona
      </Typography>

      {/* Sección de Selección de Bandas */}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Selecciona una Banda</InputLabel>
          <Select
            value={bandCombination}
            onChange={(e) => setBandCombination(e.target.value)}
          >
            {bandOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Mostrar Imagen
          </Button>
        </Box>
      </form>

      {/* Incrustar el mapa de GEE si el usuario ya seleccionó una banda */}
      {showMap && (
        <>
          <Divider sx={{ marginY: 4 }} />
          <GEEEmbedMap bandCombination={bandCombination} />
        </>
      )}

      {/* Sección de Recursos Adicionales */}
      <Divider sx={{ marginY: 4 }} />
      <Typography variant="h4" gutterBottom>
        Recursos Adicionales
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Selecciona un Recurso</InputLabel>
        <Select
          value={selectedResource}
          onChange={(e) => setSelectedResource(e.target.value)}
        >
          {resourceOptions.map((option) => (
            <MenuItem key={option.value} value={option.link}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedResource && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.open(selectedResource, "_blank")}
          >
            Ver en una Nueva Pestaña
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SatelliteDataPage;

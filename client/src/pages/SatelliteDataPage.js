import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import GEEEmbedMap from "../components/GEEEmbedMap"; // Make sure this component is correctly imported
import PlaintextImage from "../assets/ADHSGIS.jpg"; // Import the Plaintext.png image

const SatelliteDataPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [bandCombination, setBandCombination] = useState("rgb");
  const [showGEEForm, setShowGEEForm] = useState(false); // State to control the Google Earth Engine modal

  // Band options for Google Earth Engine
  const bandOptions = [
    { value: "rgb", label: "RGB (B4, B3, B2)" },
    { value: "air", label: "Air (B5, B6, B7)" },
    { value: "water", label: "Water (B2, B3, B5)" },
    { value: "land", label: "Vegetation (B4, B5, B6)" },
  ];

  // Descriptive content for each Google Earth Engine band
  const bandDescriptions = {
    rgb: {
      title: "RGB (B4, B3, B2)",
      description: "This band combination shows a natural color image, similar to what the human eye would see. It is useful for general analysis and terrain visualization.",
      additionalText: "The RGB mode is ideal for identifying general geographic features, such as mountains, rivers, and urban areas.",
    },
    air: {
      title: "Air (B5, B6, B7)",
      description: "This band combination is used to analyze air quality and the presence of particles in the atmosphere. Ideal for environmental studies.",
      additionalText: "The Air mode allows detecting pollutants and suspended particles, useful for monitoring air quality in urban areas.",
    },
    water: {
      title: "Water (B2, B3, B5)",
      description: "This band combination is optimized for detecting water bodies and analyzing their quality. Perfect for hydrological studies.",
      additionalText: "The Water mode is perfect for identifying water sources, such as lakes, rivers, and oceans, and assessing their health status.",
    },
    land: {
      title: "Vegetation (B4, B5, B6)",
      description: "This band combination highlights vegetation and is ideal for monitoring crop health and forest cover.",
      additionalText: "The Vegetation mode is ideal for analyzing crop health, deforestation, and vegetation cover in specific areas.",
    },
  };

  // Data for the cards (Earth Nullschool, Google Earth Engine, and Arizona Department of Health Services GIS)
  const resourceOptions = [
    {
      key: "earth_nullschool",
      label: "Earth Nullschool",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ARVV5FyZCeQej9Cl8NsyhOuFc-Iv9koEbQ&s", // New image for Earth Nullschool
      iframeUrl: "https://earth.nullschool.net/#current/wind/surface/level/orthographic/loc=10.507,19.874",
      description: "Earth Nullschool is an interactive tool that displays real-time meteorological data, such as winds, temperatures, and ocean currents. It is ideal for monitoring global weather conditions.",
      additionalText: "You can use Earth Nullschool to track weather patterns, such as hurricanes, cold fronts, and ocean currents, in real-time.",
    },
    {
      key: "google_earth_engine",
      label: "Google Earth Engine",
      imageUrl: "https://earthengine.google.com/static/images/earth-engine-logo.png", // Representative image for GEE
      description: "Google Earth Engine is a geospatial analysis platform that allows you to visualize and analyze satellite data. Select a band to view different types of information.",
    },
    {
      key: "az_health_gis",
      label: "Arizona Department of Health Services GIS",
      imageUrl: "https://crh.arizona.edu/sites/default/files/styles/az_large/public/2024-03/ADHS.png.webp?itok=V56Pg3kF", // Representative image for the Arizona Department of Health Services
      description: "The Geographic Information System (GIS) of the Arizona Department of Health Services provides geospatial data on public health, such as disease distribution, access to health services, and more.",
      additionalText: "This GIS is a key tool for public health decision-making in Arizona, enabling the visualization and analysis of data related to population health.",
      imageModalUrl: PlaintextImage, // Image for the modal
    },
  ];

  // Handle band form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedResource(null); // Close the modal after submitting the form
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Satellite Data Used in Phoenix, Arizona
      </Typography>

      {/* Resource cards */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {resourceOptions.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.key}>
            <Card
              onClick={() => {
                if (resource.key === "google_earth_engine") {
                  setShowGEEForm(true); // Open the GEE modal
                } else {
                  setSelectedResource(resource); // Open the modal with the iframe or image
                }
              }}
              sx={{ cursor: "pointer", height: "100%" }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={resource.imageUrl}
                  alt={resource.label}
                  sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <Typography variant="h6" sx={{ marginTop: 2, textAlign: "center" }}>
                  {resource.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Earth Nullschool and Arizona Department of Health Services GIS */}
      <Dialog
        open={Boolean(selectedResource)}
        onClose={() => setSelectedResource(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedResource?.label}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {selectedResource?.description}
          </Typography>
          {/* Show iframe or image depending on the resource */}
          {selectedResource?.key === "az_health_gis" ? (
            <Box
              component="img"
              src={selectedResource.imageModalUrl}
              alt={selectedResource.label}
              sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          ) : (
            <iframe
              src={selectedResource?.iframeUrl}
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title={selectedResource?.label}
            />
          )}
          {/* Additional text */}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedResource?.additionalText}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedResource(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Google Earth Engine */}
      <Dialog
        open={showGEEForm}
        onClose={() => setShowGEEForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Google Earth Engine</DialogTitle>
        <DialogContent>
          {/* General description of Google Earth Engine */}
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {resourceOptions.find((r) => r.key === "google_earth_engine")?.description}
          </Typography>

          {/* Band selection form */}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select a Band</InputLabel>
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
                Show Image
              </Button>
            </Box>
          </form>

          {/* Show descriptive content for the selected band */}
          {bandCombination && (
            <>
              <Divider sx={{ marginY: 4 }} />
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {bandDescriptions[bandCombination].title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {bandDescriptions[bandCombination].description}
              </Typography>
              <GEEEmbedMap bandCombination={bandCombination} />
              {/* Additional text for Google Earth Engine */}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {bandDescriptions[bandCombination].additionalText}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGEEForm(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SatelliteDataPage;
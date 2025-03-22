import React, { useState } from "react";
import { Container, Typography, TextField, MenuItem, Button, Box, Card, CardContent, Grid, Avatar } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { jsPDF } from "jspdf";

// Import images
import WalmartImage from "../assets/WalmartCenter.jpeg";
import SuperImage from "../assets/Elsuper.jpeg";
import McdonaldsImage from "../assets/Mcdonalds.jpeg";

// Define greenhouse costs by type and location
const greenhouseCosts = {
  "Walmart": {
    area: 18420,
    perimeter: 685,
    polycarbonate: { min: 54, max: 162 },
    glass: { min: 100, max: 250 },
    hydroponic: { min: 150, max: 400 },
    image: WalmartImage
  },
  "Super": {
    area: 4000,
    perimeter: 270,
    polycarbonate: { min: 54, max: 162 },
    glass: { min: 100, max: 250 },
    hydroponic: { min: 150, max: 400 },
    image: SuperImage
  },
  "McDonald's": {
    area: 328,
    perimeter: 82,
    polycarbonate: { min: 54, max: 162 },
    glass: { min: 100, max: 250 },
    hydroponic: { min: 150, max: 400 },
    image: McdonaldsImage
  }
};

const EconomicDataPage = () => {
  const [location, setLocation] = useState("");
  const [greenhouseType, setGreenhouseType] = useState("");
  const [comparisons, setComparisons] = useState([]);

  const calculateCosts = () => {
    if (!location || !greenhouseType) {
      alert("Please complete all fields.");
      return;
    }

    const { area, polycarbonate, glass, hydroponic } = greenhouseCosts[location];
    let minCost, maxCost;

    switch (greenhouseType) {
      case "Polycarbonate":
        minCost = area * polycarbonate.min;
        maxCost = area * polycarbonate.max;
        break;
      case "Glass":
        minCost = area * glass.min;
        maxCost = area * glass.max;
        break;
      case "Hydroponic":
        minCost = area * hydroponic.min;
        maxCost = area * hydroponic.max;
        break;
      default:
        minCost = 0;
        maxCost = 0;
    }

    const newComparison = {
      location,
      greenhouseType,
      minCost,
      maxCost
    };

    setComparisons([...comparisons, newComparison]);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // PDF Title
    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243); // Blue
    doc.text("Cost Simulation Report", 10, 20);

    // Add selected location image
    if (location) {
      const img = new Image();
      img.src = greenhouseCosts[location].image;
      doc.addImage(img, "JPEG", 10, 30, 150, 150);
    }

    // PDF Content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black
    let yOffset = 160;

    comparisons.forEach((item, index) => {
      doc.text(`Configuration ${index + 1}:`, 10, yOffset);
      doc.text(`Location: ${item.location}`, 10, yOffset + 10);
      doc.text(`Greenhouse Type: ${item.greenhouseType}`, 10, yOffset + 20);
      doc.text(`Minimum Cost: $${item.minCost.toLocaleString()}`, 10, yOffset + 30);
      doc.text(`Maximum Cost: $${item.maxCost.toLocaleString()}`, 10, yOffset + 40);
      yOffset += 60;
    });

    // Save the PDF
    doc.save("Cost_Simulation.pdf");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, color: "white" }}>
      <Typography variant="h4" gutterBottom>
        Rooftop Greenhouse Cost Simulator
      </Typography>

      {/* White Background Container */}
      <Box sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, color: "black" }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField 
                select 
                label="Select Location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                sx={{ "& .MuiInputBase-root": { color: "black" }, "& .MuiInputLabel-root": { color: "black" } }}
              >
                {Object.keys(greenhouseCosts).map((loc) => (
                  <MenuItem key={loc} value={loc} sx={{ color: "black" }}>{loc}</MenuItem>
                ))}
              </TextField>

              <TextField 
                select 
                label="Greenhouse Type" 
                value={greenhouseType} 
                onChange={(e) => setGreenhouseType(e.target.value)}
                sx={{ "& .MuiInputBase-root": { color: "black" }, "& .MuiInputLabel-root": { color: "black" } }}
              >
                <MenuItem value="Polycarbonate" sx={{ color: "black" }}>Polycarbonate</MenuItem>
                <MenuItem value="Glass" sx={{ color: "black" }}>Glass</MenuItem>
                <MenuItem value="Hydroponic" sx={{ color: "black" }}>Hydroponic</MenuItem>
              </TextField>

              <Button variant="contained" color="primary" onClick={calculateCosts}>
                Calculate Costs
              </Button>
            </Box>
          </Grid>

          <Grid item xs={6}>
            {location && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "black" }}>{location}</Typography>
                  <Avatar 
                    src={greenhouseCosts[location].image}
                    alt={location} 
                    sx={{ width: 400, height: 400, margin: 'auto', borderRadius: 0 }}
                  />
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>

      {comparisons.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3, color: "white" }}>Configuration Comparison:</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisons}>
              <XAxis dataKey="location" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Bar dataKey="minCost" fill="#8884d8" name="Minimum Cost" />
              <Bar dataKey="maxCost" fill="#82ca9d" name="Maximum Cost" />
            </BarChart>
          </ResponsiveContainer>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={generatePDF}>
            Download Report as PDF
          </Button>
        </>
      )}
    </Container>
  );
};

export default EconomicDataPage;

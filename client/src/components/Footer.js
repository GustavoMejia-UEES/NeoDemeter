import {
    Box,
    Container,
    Typography,
    Link as MuiLink,
    Grid,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import logo from "../assets/NEO_DEMETER_WHITE.png";
  
  export default function Footer() {
    return (
      <Box
        sx={{
          backgroundColor: "#000000", // Black background
          color: "#F5F5F5", // White text
          py: 4, // Vertical padding
          mt: "auto", // To keep the footer at the bottom
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {/* Logo and name */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <img
                  src={logo}
                  alt="NeoDemeter Logo"
                  width={40}
                  height={40}
                  style={{ marginRight: 10 }}
                />
                <Typography variant="h6" sx={{ color: "#F5F5F5" }}>
                  NeoDemeter
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#BDBDBD" }}>
                Innovating in urban and sustainable agriculture.
              </Typography>
            </Grid>
  
            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <MuiLink
                  component={Link}
                  to="/satellite-data"
                  sx={{ color: "#F5F5F5", textDecoration: "none", mb: 1 }}
                >
                  Satellite Data
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/nutritional-data"
                  sx={{ color: "#F5F5F5", textDecoration: "none", mb: 1 }}
                >
                  Nutritional Data
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/economic-data"
                  sx={{ color: "#F5F5F5", textDecoration: "none", mb: 1 }}
                >
                  Economic Data
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/cultural-background"
                  sx={{ color: "#F5F5F5", textDecoration: "none", mb: 1 }}
                >
                  Cultural Background
                </MuiLink>
              </Box>
            </Grid>
  
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ color: "#BDBDBD", mb: 1 }}>
                Email: neodemeterhack@gmail.com
              </Typography>
            </Grid>
          </Grid>
  
          {/* Copyright */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" sx={{ color: "#BDBDBD" }}>
              © {new Date().getFullYear()} NeoDemeter. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }
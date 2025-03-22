import React, { useState } from "react";
import { Container, Typography, TextField, MenuItem, Button, Box, Card, CardContent } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { jsPDF } from "jspdf";

const vegetablePrices = {
  "Lechuga": 10,
  "Tomate": 15,
  "Zanahoria": 12,
  "Albahaca": 20
};

const expertPrices = {
  "Básico": 500,
  "Intermedio": 1000,
  "Avanzado": 2000
};

const EconomicDataPage = () => {
  const [vegetal, setVegetal] = useState("");
  const [metros, setMetros] = useState("");
  const [experto, setExperto] = useState("");
  const [comparaciones, setComparaciones] = useState([]);

  const calcularCostos = () => {
    if (!vegetal || !metros || !experto) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const costoVegetal = vegetablePrices[vegetal] * metros;
    const costoExpertos = expertPrices[experto];
    const costoTotal = costoVegetal + costoExpertos;
    const gananciaPotencial = costoVegetal * 2.5;
    const retorno = ((gananciaPotencial / costoTotal) * 100).toFixed(2);

    const nuevaComparacion = {
      vegetal,
      metros,
      experto,
      costoTotal,
      gananciaPotencial,
      retorno
    };

    setComparaciones([...comparaciones, nuevaComparacion]);
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Simulación de Costos", 10, 10);
    comparaciones.forEach((item, index) => {
      doc.text(`Configuración ${index + 1}:`, 10, 20 + index * 20);
      doc.text(`Vegetal: ${item.vegetal}`, 10, 30 + index * 20);
      doc.text(`Metros cuadrados: ${item.metros}`, 10, 40 + index * 20);
      doc.text(`Experto: ${item.experto}`, 10, 50 + index * 20);
      doc.text(`Costo Total: $${item.costoTotal}`, 10, 60 + index * 20);
      doc.text(`Ganancia Potencial: $${item.gananciaPotencial}`, 10, 70 + index * 20);
      doc.text(`Retorno de inversión: ${item.retorno}%`, 10, 80 + index * 20);
    });
    doc.save("Simulacion_Costos.pdf");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Simulador de Costos para Huertos en Terrazas
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField select label="Selecciona el vegetal" value={vegetal} onChange={(e) => setVegetal(e.target.value)}>
          {Object.keys(vegetablePrices).map((veg) => (
            <MenuItem key={veg} value={veg}>{veg}</MenuItem>
          ))}
        </TextField>

        <TextField type="number" label="Metros cuadrados a instalar" value={metros} onChange={(e) => setMetros(e.target.value)} />

        <TextField select label="Nivel de asesoramiento" value={experto} onChange={(e) => setExperto(e.target.value)}>
          {Object.keys(expertPrices).map((level) => (
            <MenuItem key={level} value={level}>{level}</MenuItem>
          ))}
        </TextField>

        <Button variant="contained" color="primary" onClick={calcularCostos}>
          Calcular Costos
        </Button>
      </Box>

      {comparaciones.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>Comparación de Configuraciones:</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparaciones}>
              <XAxis dataKey="vegetal" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="costoTotal" fill="#8884d8" name="Costo Total" />
              <Bar dataKey="gananciaPotencial" fill="#82ca9d" name="Ganancia Potencial" />
            </BarChart>
          </ResponsiveContainer>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={generarPDF}>
            Descargar Reporte en PDF
          </Button>
        </>
      )}
    </Container>
  );
};

export default EconomicDataPage;

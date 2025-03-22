import React from "react";

// Diccionario con los IDs de las aplicaciones de GEE para cada tipo de banda
const geeAppUrls = {
  rgb: "https://spacehack-mentorship-group-9.projects.earthengine.app/view/rgb-phoenix-map",
  air: "https://spacehack-mentorship-group-9.projects.earthengine.app/view/air-quality-phoenix-map",
  water: "https://spacehack-mentorship-group-9.projects.earthengine.app/view/water-corpes-phoenix-map",
  land: "https://spacehack-mentorship-group-9.projects.earthengine.app/view/vegetation-phoenix-map",
};

const GEEEmbedMap = ({ bandCombination }) => {
  const geeUrl = geeAppUrls[bandCombination] || geeAppUrls.rgb; // Si no existe, usa RGB por defecto

  return (
    <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
      <iframe
        title="Google Earth Engine Map"
        width="100%"
        height="100%"
        src={geeUrl}
        frameBorder="0"
      />
    </div>
  );
};

export default GEEEmbedMap;

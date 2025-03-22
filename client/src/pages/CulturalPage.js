import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import "../styles/CulturalPage.css";

const sections = [
  {
    title: "Cultural Diversity and Food in Phoenix",
    text: [
      "Phoenix, the capital of Arizona, is a deeply diverse city, marked by a rich cultural mix resulting from decades of migration. Latino, Indigenous, African American, Asian, and Middle Eastern communities have transformed the urban social and food landscape.",
      "This cultural richness also brings significant challenges: traditional food systems often do not account for the diversity of dietary habits and restrictions present in these communities.",
      "The NeoDemeter project recognizes this reality and proposes inclusive urban food production, respecting diverse food cultures."
    ],
    img: require("../assets/cultural1.jpg"),
  },
  {
    title: "Immigration, Identity, and Food Inequality",
    text: [
      "Phoenix's migration history is deeply tied to its productive and social systems. Much of the agricultural and service workforce comes from migrant communities, especially those of Latin American origin.",
      "Cultural clashes are also reflected in the design of urban environments: many areas lack community markets with traditional foods, while industrialized diets replace fresh and native products.",
      "With NeoDemeter, we propose that access to food also be a space for identity recovery and dignity."
    ],
    img: require("../assets/Cultural2.jpg"),
  },
  {
    title: "Regulations, Certifications, and Inclusive Food Access",
    text: [
      "Compliance with food certifications and regulations is vital to ensure inclusion. In Phoenix, many communities require products certified according to their religious or cultural traditions, such as Kosher (Jewish) or Halal (Muslim) foods.",
      "Additionally, there are state regulations like the Maricopa County Food Systems Plan, which recognize the need for equitable and culturally appropriate access to food.",
      "NeoDemeter integrates these standards into its model to ensure a respectful, dignified, and equitable urban food system."
    ],
    img: require("../assets/cultural3.png"),
  },
];

const CulturalPage = () => {
  return (
    <div className="cultural-page">
      <Container className="content">
        <Typography variant="h3" gutterBottom>
          Cultural Context of Phoenix
        </Typography>

        {sections.map((section, index) => (
          <Box key={index} className="section">
            <div className="section-text">
              <Typography variant="h5" gutterBottom>
                {section.title}
              </Typography>
              {section.text.map((paragraph, i) => (
                <Typography key={i} variant="body1" paragraph>
                  {paragraph}
                </Typography>
              ))}
            </div>
            {section.img && <img src={section.img} alt={section.title} className="section-image" />}
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default CulturalPage;
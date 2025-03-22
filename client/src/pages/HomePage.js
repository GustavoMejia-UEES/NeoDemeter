import React, { useEffect } from "react";
import { Container, Typography, Grid, Avatar, Box } from "@mui/material";
import "../styles/HomePage.css";

const teamMembers = [
  { name: "Gustavo Mejía", img: require("../assets/Gustavo.png") },
  { name: "Daniel Vaca", img: require("../assets/Daniel.png") },
  { name: "Paul Aguirre", img: require("../assets/PAUL.png") },
  { name: "Luis Enriquez", img: require("../assets/Luis.png") },
];

const sections = [
  {
    title: "What is the project about?",
    text: [
      "NeoDemeter is a comprehensive solution that transforms underutilized urban rooftops into smart agricultural spaces, combining sustainability, IoT technology, and community engagement.",
      "Using humidity, temperature, and air quality sensors, automated irrigation systems, solar panels, and monitoring platforms, we design urban micro-gardens on rooftops that produce healthy, sustainable, and culturally appropriate food.",
      "The project is inspired by food preservation technologies developed for space by NASA, adapted to the urban environment."
    ],
    img: require("../assets/RooftopFarmS1.jpg"),
    alternate: false,
  },
  {
    title: "Challenges and Solutions",
    text: [
      "Phoenix faces critical challenges: food insecurity in vulnerable communities, increasing urban heat island effects, disconnection between people and food origins, and underutilized urban rooftops.",
      "NeoDemeter responds with a holistic solution that combines technology, social participation, and cultural respect. We use sensors, solar energy, desert climate-adapted urban agriculture, and community design."
    ],
    img: require("../assets/PhoenixArizonaS2.jpg"),
    alternate: false,
  },
  {
    title: "Impact and Benefits",
    text: [
      "NeoDemeter has a positive impact in multiple dimensions: it improves access to healthy food, reduces urban heat, strengthens social cohesion, promotes green employment, and connects communities with sustainable practices.",
      "The project directly contributes to the Sustainable Development Goals (SDGs 2 and 11)."
    ],
    img: require("../assets/ODS-2-11S5.jpg"),
    alternate: true,
  },
  {
    title: "Where are we from?",
    text: [
      "We are a team from the Universidad de Especialidades Espíritu Santo (UEES) in Ecuador",
      "United by our passion for innovation and technology. We belong to the Faculty of Engineering, with members from Computational, Civil, and Environmental Engineering, allowing us to address challenges from different perspectives. This hackathon not only pushed us to develop innovative solutions but also brought us closer together, strengthening our friendship and commitment to change."
    ],
    img: require("../assets/Uees.jpg"),
    alternate: false,
  },
  {
    title: "Our Logo",
    text: [
      "Our logo represents NeoDemeter",
      "Inspired by the Greek goddess Demeter, symbol of agriculture and fertility. 'Neo' reflects our vision of a new way to improve the relationship between technology and the environment. With this identity, we seek to create sustainable solutions that optimize natural resources and promote a more efficient and conscious future."
    ],
    img: require("../assets/LogoS5.jpeg"),
    alternate: true,
  },
];

const HomePage = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "starCanvas";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height * 0.5) {
          star.y = Math.random() * canvas.height * 0.1;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animateStars);
    }
    animateStars();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      canvas.remove();
    };
  }, []);

  return (
    <div className="homepage">
      <Container className="content">
        <Typography variant="h3" gutterBottom>
          Welcome to NeoDemeter
        </Typography>

        {sections.map((section, index) => (
          <Box key={index} className={`section ${section.special ? "special" : section.alternate ? "alternate" : ""}`}>
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

        <Typography variant="h4" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item key={index} className="team-member">
              <Avatar src={member.img} alt={member.name} className="avatar" />
              <Typography className="team-name">{member.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;

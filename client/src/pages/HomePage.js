import React, { useEffect } from "react";
import { Container, Typography, Grid, Avatar, Box } from "@mui/material";
import "../styles/HomePage.css";

const teamMembers = [
  { name: "Gustavo Mejía", img: require("../assets/PlainAvatar.jpg") },
  { name: "Daniel Vaca", img: require("../assets/PlainAvatar.jpg") },
  { name: "Paul Aguirre", img: require("../assets/PlainAvatar.jpg") },
  { name: "Luis Enriquez", img: require("../assets/PlainAvatar.jpg") },
];

const sections = [
  {
    title: "¿De qué trata el proyecto?",
    text: [
      "NeoDemeter es una solución integral que transforma techos urbanos subutilizados en espacios agrícolas inteligentes, combinando sostenibilidad, tecnología IoT y participación comunitaria.",
      "Mediante sensores de humedad, temperatura, calidad del aire, sistemas de riego automatizados, paneles solares y plataformas de monitoreo, diseñamos microhuertos urbanos en terrazas que producen alimentos saludables, sostenibles y culturalmente apropiados.",
      "El proyecto está inspirado en tecnologías de conservación de alimentos desarrolladas para el espacio por la NASA, adaptadas al entorno urbano."
    ],
    img: require("../assets/RooftopFarmS1.jpg"),
    alternate: false,
  },
  {
    title: "Retos y Soluciones",
    text: [
      "Phoenix enfrenta desafíos críticos: inseguridad alimentaria en comunidades vulnerables, aumento del efecto isla de calor, desconexión entre las personas y el origen de los alimentos, y techos urbanos desaprovechados.",
      "NeoDemeter responde con una solución holística que combina tecnología, participación social y respeto cultural. Usamos sensores, energía solar, agricultura urbana adaptada al clima del desierto y diseño comunitario."
    ],
    img: require("../assets/PhoenixArizonaS2.jpg"),
    alternate: false,
  },
  {
    title: "Impacto y Beneficios",
    text: [
      "NeoDemeter impacta positivamente en múltiples dimensiones: mejora el acceso a alimentos saludables, reduce el calor urbano, fortalece la cohesión social, promueve el empleo verde y conecta a las comunidades con prácticas sostenibles.",
      "El proyecto contribuye directamente a los Objetivos de Desarrollo Sostenible (ODS 2, 11, 12, 13 y 17)."
    ],
    img: require("../assets/ODSS3.jpg"),
    alternate: true,
  },
  {
    title: "¿De dónde somos?",
    text: [
      "Somos un equipo de la Universidad de Especialidades Espíritu Santo (UEES) en Ecuador",
      "Unidos por nuestra pasión por la innovación y la tecnología. Pertenecemos a la Facultad de Ingeniería, con miembros de Ingeniería Computacional, Civil y Ambiental, lo que nos permite abordar los desafíos desde distintas perspectivas. Esta hackathon no solo nos impulsó a desarrollar soluciones innovadoras, sino que también nos unió aún más, fortaleciendo nuestra amistad y nuestro compromiso con el cambio."
    ],
    img: require("../assets/Uees.jpg"),
    alternate: false,
  },
  {
    title: "Nuestro Logo",
    text: [
      "Nuestro logo representa a NeoDemeter",
      "Inspirado en la diosa griega Deméter, símbolo de la agricultura y la fertilidad. 'Neo' refleja nuestra visión de una nueva manera de mejorar la relación entre la tecnología y el medio ambiente. Con esta identidad, buscamos crear soluciones sostenibles que optimicen los recursos naturales y promuevan un futuro más eficiente y consciente."
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
          Bienvenidos a NeoDemeter
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
          Nuestro Equipo
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

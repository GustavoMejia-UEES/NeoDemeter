import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Definir traducciones
const translations = {
    en: {
        title: "Nutritional Data",
        description: "Explore nutritional data and rooftop farming viability for various crops.",
        selectLabel: "Select a culture:",
        viabilityLabel: "Viability of Rooftop Crops",
        modalTitle: "Nutritional Information",
        close: "Close",
        crops: {
            tomatoes: "Tomatoes",
            beans: "Beans",
            cilantro: "Cilantro",
            onions: "Onions",
            chili: "Chili",
            garlic: "Garlic",
            potatoes: "Potatoes"
        }
    },
    es: {
        title: "Datos Nutricionales",
        description: "Explora los datos nutricionales y la viabilidad de los cultivos en azoteas.",
        selectLabel: "Selecciona una cultura:",
        viabilityLabel: "Viabilidad de Cultivos en Azoteas",
        modalTitle: "Información Nutricional",
        close: "Cerrar",
        crops: {
            tomatoes: "Tomates",
            beans: "Frijoles",
            cilantro: "Cilantro",
            onions: "Cebollas",
            chili: "Chile",
            garlic: "Ajo",
            potatoes: "Papas"
        }
    },
    fr: {
        title: "Données Nutritionnelles",
        description: "Découvrez les données nutritionnelles et la viabilité des cultures sur les toits.",
        selectLabel: "Sélectionnez une culture :",
        viabilityLabel: "Viabilité des Cultures sur les Toits",
        modalTitle: "Informations Nutritionnelles",
        close: "Fermer",
        crops: {
            tomatoes: "Tomates",
            beans: "Haricots",
            cilantro: "Coriandre",
            onions: "Oignons",
            chili: "Piment",
            garlic: "Ail",
            potatoes: "Pommes de terre"
        }
    }
};

// Datos de los cultivos con información nutricional en varios idiomas
const cropData = [
    { 
        key: "tomatoes", value: 80,
        imageUrl: "https://fundacion-antama.org/wp-content/uploads/2020/01/2020-Tomates.jpg",
        nutrition: {
            en: "Tomatoes are an excellent source of lycopene, an antioxidant that protects against cardiovascular diseases and certain cancers. They contain vitamin C, potassium, and folates, essential for cell health and immune function. In urban gardening, tomatoes grow best in containers of at least 10 liters, require 6-8 hours of direct sunlight, and need vertical support like stakes or cages.",
            es: "El tomate es una excelente fuente de licopeno, un antioxidante que protege contra enfermedades cardiovasculares y ciertos tipos de cáncer. Contiene vitamina C, potasio y folatos, esenciales para la salud celular y la función inmunológica. En cultivo urbano, los tomates crecen mejor en contenedores de al menos 10 litros, requieren 6-8 horas de luz solar directa y un soporte vertical como estacas o jaulas para su crecimiento.",
            fr: "Les tomates sont une excellente source de lycopène, un antioxydant qui protège contre les maladies cardiovasculaires et certains cancers. Elles contiennent de la vitamine C, du potassium et des folates, essentiels pour la santé cellulaire et l’immunité. En culture urbaine, elles poussent mieux dans des conteneurs d’au moins 10 litres, nécessitent 6 à 8 heures de soleil direct et un support vertical comme des tuteurs."
        }
    },
    { 
        key: "beans", value: 70,
        imageUrl: "https://saborusa.pe/wp-content/uploads/2021/10/frejoles-1.jpg",
        nutrition: {
            en: "Beans are rich in plant-based protein, fiber, and iron, aiding in red blood cell production and blood sugar regulation. They are efficient for rooftop farming, thriving in deep pots or hydroponic systems. They require a trellis or climbing support and well-drained soil with regular watering.",
            es: "Los frijoles son ricos en proteínas vegetales, fibra y hierro, ayudando a la formación de glóbulos rojos y la regulación del azúcar en sangre. Su cultivo en azoteas es eficiente, ya que pueden crecer en macetas profundas o sistemas hidropónicos. Necesitan un enrejado o soporte para trepar y un suelo bien drenado con riego regular.",
            fr: "Les haricots sont riches en protéines végétales, fibres et fer, favorisant la production de globules rouges et la régulation du sucre sanguin. Ils sont idéaux pour l’agriculture sur les toits, poussant bien dans des pots profonds ou des systèmes hydroponiques. Ils nécessitent un treillis pour grimper et un sol bien drainé avec un arrosage régulier."
        }
    },
    { 
        key: "cilantro", value: 85,
        imageUrl: "https://www.paulinacocina.net/wp-content/uploads/2024/05/para-que-se-usa-el-cilantro-Paulina-Cocina-Recetas-Cocina-1722430355-1200x676.jpg",
        nutrition: {
            en: "Cilantro provides vitamin A, K, and antioxidants, improving eye health and reducing inflammation. It is ideal for small-space cultivation, as it adapts well to small pots with good drainage. It grows best in partial shade and requires frequent but light watering.",
            es: "El cilantro aporta vitamina A, K y antioxidantes, mejorando la salud ocular y reduciendo la inflamación. Es ideal para cultivos en espacios reducidos, ya que se adapta a macetas pequeñas con buen drenaje. Crece mejor en semisombra y necesita riego frecuente pero ligero.",
            fr: "La coriandre apporte de la vitamine A, K et des antioxydants, améliorant la santé oculaire et réduisant l’inflammation. Elle est parfaite pour la culture en petit espace, s’adaptant bien aux petits pots avec un bon drainage. Elle pousse mieux à mi-ombre avec un arrosage fréquent mais léger."
        }
    },
    { 
        key: "onions", value: 75,
        imageUrl: "https://www.marthastewart.com/thmb/FUIH9qC_SOw1kaVYqfXrRH31wT0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-onions-1123-60b66c5747b64855ac56561a9bb1ea1e.jpg",
        nutrition: {
            en: "Onions are rich in quercetin, an antioxidant with anti-inflammatory and immune-boosting properties. They can be grown on rooftops using pots at least 20 cm deep with direct sunlight exposure. They require sandy soil and minimal watering to prevent rot.",
            es: "La cebolla es rica en quercetina, un antioxidante con propiedades antiinflamatorias y protectoras del sistema inmunológico. Su cultivo en azoteas es viable con macetas de al menos 20 cm de profundidad y exposición solar directa. Requiere suelo arenoso y poco riego para evitar la pudrición.",
            fr: "Les oignons sont riches en quercétine, un antioxydant aux propriétés anti-inflammatoires et immunostimulantes. Ils peuvent être cultivés sur les toits dans des pots d’au moins 20 cm de profondeur avec une exposition directe au soleil. Ils nécessitent un sol sableux et un arrosage minimal pour éviter la pourriture."
        }
    },
    { 
        key: "chili", value: 90,
        imageUrl: "https://keviniscooking.com/wp-content/uploads/2022/02/chiles-mexicanos.jpg",
        nutrition: {
            en: "Chili peppers are a great source of capsaicin, which boosts metabolism and improves circulation. They grow best in 15-20 liter pots, requiring at least 6 hours of daily sunlight. They prefer dry, well-drained soil with moderate watering to avoid excess moisture.",
            es: "El chile es una fuente de capsaicina, que estimula el metabolismo y mejora la circulación. Se desarrolla mejor en macetas de 15-20 litros, con mínimo 6 horas de sol diario. Prefiere suelos secos y bien drenados, con riego moderado para evitar el exceso de humedad.",
            fr: "Le piment est riche en capsaïcine, qui stimule le métabolisme et améliore la circulation. Il pousse mieux dans des pots de 15-20 litres, nécessitant au moins 6 heures de soleil par jour. Il préfère un sol sec et bien drainé, avec un arrosage modéré."
        }
    },
    { 
        key: "garlic", value: 95,
        imageUrl: "https://media.gq.com.mx/photos/65be9857fde5069e143b6d24/4:3/w_2664,h_1998,c_limit/diente%20de%20ajo.jpg",
        nutrition: {
            en: "Garlic has antibacterial and antioxidant properties and is rich in selenium and sulfur compounds, which support cardiovascular health. It is easy to grow in small containers with well-drained soil and minimal watering. It needs at least 5 hours of sunlight and takes 6-8 months to mature.",
            es: "El ajo tiene propiedades antibacterianas y antioxidantes, además de ser rico en selenio y compuestos azufrados que benefician la salud cardiovascular. Es fácil de cultivar en contenedores pequeños, con suelo bien drenado y poca agua. Necesita mínimo 5 horas de sol y un ciclo de crecimiento de 6-8 meses.",
            fr: "L’ail possède des propriétés antibactériennes et antioxydantes et est riche en sélénium et composés soufrés, bénéfiques pour le cœur. Il est facile à cultiver en petits contenants, avec un sol bien drainé et un arrosage minimal. Il a besoin de 5 heures de soleil minimum et d’un cycle de 6-8 mois."
        }
    },
    { 
        key: "potatoes", value: 60,
        imageUrl: "https://saborusa.com.pa/imagesmg/imagenes/5ff3e6a0b703f_potatoes-food-supermarket-agriculture-JG7QGNY.jpg",
        nutrition: {
            en: "Potatoes are an excellent source of complex carbohydrates, vitamin C, and potassium. For rooftop farming, they should be grown in large bags or containers (at least 40 liters) with loose, deep soil. They require constant but moderate watering and can yield 2-3 kg per plant in a small space.",
            es: "Las papas son una gran fuente de carbohidratos complejos, vitamina C y potasio. Para su cultivo en azoteas, se recomienda usar sacos o macetas grandes (mínimo 40 litros) con suelo suelto y profundo. Requieren riego constante pero sin encharcamiento y pueden producir hasta 2-3 kg por planta en un espacio reducido.",
            fr: "Les pommes de terre sont une source importante de glucides complexes, vitamine C et potassium. Pour la culture en toiture, elles doivent être plantées dans des sacs ou grands pots (au moins 40 litres) avec un sol profond et meuble. Elles nécessitent un arrosage constant mais modéré et peuvent produire 2-3 kg par plante sur un petit espace."
        }
    }
];

const NutritionalDataPage = () => {
    const [language, setLanguage] = useState('en');
    const [selectedCrop, setSelectedCrop] = useState(null);

    const chartData = {
        labels: cropData.map(crop => translations[language].crops[crop.key]),
        datasets: [{
            label: translations[language].viabilityLabel,
            data: cropData.map(crop => crop.value),
            backgroundColor: 'rgb(255, 255, 255)'
        }]
    };
    
    // Opciones personalizadas para el gráfico
    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: 'white', // Color del texto en el eje X
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Color de la cuadrícula del eje X
                },
            },
            y: {
                ticks: {
                    color: 'white', // Color del texto en el eje Y
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Color de la cuadrícula del eje Y
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Color del texto en la leyenda
                },
            },
        },
    };
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                {translations[language].title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {translations[language].description}
            </Typography>
            
            <Select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ marginBottom: 20 }}>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
            </Select>
            
            <Grid container spacing={3}>
                {cropData.map((crop) => (
                    <Grid item xs={12} sm={6} md={4} key={crop.key}>
                        <Card onClick={() => setSelectedCrop(crop)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Typography variant="h5">{translations[language].crops[crop.key]}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" style={{ marginTop: 20 }}>{translations[language].viabilityLabel}</Typography>
            <Bar data={chartData} options={chartOptions} />

            
            {/* Modal de Información Nutricional */}
            <Dialog open={Boolean(selectedCrop)} onClose={() => setSelectedCrop(null)} sx={{ '& .MuiPaper-root': { borderRadius: '16px' } }}>
                <DialogTitle>{translations[language].modalTitle}</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                        <Box
                            component="img"
                            src={selectedCrop?.imageUrl}
                            alt={selectedCrop?.key}
                            sx={{
                                width: { xs: '100%', md: '40%' },
                                height: 'auto',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                marginRight: { md: 2 }
                            }}
                        />
                        <Box>
                            <Typography variant="h6">{translations[language].crops[selectedCrop?.key]}</Typography>
                            <Typography variant="body1">{selectedCrop ? selectedCrop.nutrition[language] : ""}</Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedCrop(null)}>{translations[language].close}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default NutritionalDataPage;

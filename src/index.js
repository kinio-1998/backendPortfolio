// index.js
import express from "express";
import cors from "cors";
import { getVisits, incrementVisits } from "./firebase.js";

const app = express();
app.use(cors()); // habilita CORS para que el frontend pueda llamar a la API
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/api/visits", async (req, res) => {
  try {
    const visits = await getVisits();
    res.json({ visits });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener visitas" });
  }
});

app.post("/api/visit", async (req, res) => {
  try {
    const updatedCount = await incrementVisits();
    res.json({ visits: updatedCount });
  } catch (error) {
    res.status(500).json({ error: "Error al contar visita" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// index.js
import express from "express";
import { getVisits } from "./firebase.js"; // Importamos la función para obtener visitas

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/visits", async (req, res) => {
  try {
    const visits = await getVisits();
    res.json({ visits });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener visitas" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

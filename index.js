const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const visits = []; // Esto será reemplazado por Firestore más adelante

app.post("/api/visit", (req, res) => {
  const { ip, fingerprint } = req.body;
  const timestamp = new Date().toISOString();

  visits.push({ ip, fingerprint, timestamp });

  // Opcional: enviar a Telegram
  // sendTelegram(ip, fingerprint);

  res.json({ message: "Visit registered", ip, fingerprint });
});

app.get("/api/visits", (req, res) => {
  res.json(visits);
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

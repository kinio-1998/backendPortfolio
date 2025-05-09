import { db, FieldValue } from "./firebase.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // o especifica: "http://localhost:5173"
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const ref = db.collection("contador").doc("visitas");
    await ref.update({ cantidad: FieldValue.increment(1) });
    const updated = await ref.get();
    res.status(200).json({ visits: updated.data().cantidad });
  } catch (error) {
    console.error("Error al incrementar visitas:", error);
    res.status(500).json({ error: "Error al contar visita" });
  }
}

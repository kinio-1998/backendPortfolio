import { db } from "./firebase.js"; // Asegúrate que uses la versión correcta de firebase.js con { db }

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const ref = db.collection("contador").doc("visitas");
    const snapshot = await ref.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    const data = snapshot.data();
    res.status(200).json({ visits: data.cantidad });
  } catch (error) {
    console.error("Error al obtener visitas:", error);
    res.status(500).json({ error: "Error al obtener visitas" });
  }
}

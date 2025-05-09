import db from "../firebase.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const doc = await db.collection("contador").doc("visitas").get();
    const data = doc.data();
    res.status(200).json({ visits: data.cantidad });
  } catch (error) {
    console.error("Error al obtener visitas:", error);
    res.status(500).json({ error: "Error al obtener visitas" });
  }
}

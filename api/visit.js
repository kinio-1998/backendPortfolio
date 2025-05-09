import { db, FieldValue } from "../../firebase.js"; // o "../firebase.js" según ubicación

export default async function handler(req, res) {
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

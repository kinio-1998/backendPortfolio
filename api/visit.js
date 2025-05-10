import { db, FieldValue } from "./firebase.js";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { ip, fingerprint } = req.body;

    if (!ip || !fingerprint) {
      return res.status(400).json({ error: "Faltan datos: IP o fingerprint" });
    }

    // 🔍 Obtener ubicación por IP
    let ciudad = "", region = "", pais = "";
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoRes.json();
      ciudad = geoData.city || "";
      region = geoData.region || "";
      pais = geoData.country_name || "";
    } catch (geoError) {
      console.warn("Error al obtener ubicación IP:", geoError);
    }

    const docRef = db.collection("visitors").doc(fingerprint);
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({
        visitas: FieldValue.increment(1),
        ultimoIngreso: FieldValue.serverTimestamp(),
      });
    } else {
      await docRef.set({
        ip,
        fingerprint,
        ubicacion: `${ciudad}, ${region}, ${pais}`,
        visitas: 1,
        timestamp: FieldValue.serverTimestamp(),
        ultimoIngreso: FieldValue.serverTimestamp(),
      });      
    }

    // Actualizar contador global
    const counterRef = db.collection("contador").doc("visitors");
    await counterRef.update({ cantidad: FieldValue.increment(1) });

    return res.status(200).json({ message: "Visita registrada con ubicación" });

  } catch (error) {
    console.error("Error al registrar visita:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}

import fetch from "node-fetch";
import { corsMiddleware } from "../middleware/cors";

export default async function handler(req, res) {
  if(!corsMiddleware(req,res)) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const response = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: req.body, // forward the body as-is
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: "Error al enviar el mensaje", data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error de red", details: error.message });
  }
}
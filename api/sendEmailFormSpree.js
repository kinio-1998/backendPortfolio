import fetch from "node-fetch";
import { corsMiddleware } from "../middleware/cors";

export const config = {
  api: {
    bodyParser: false, // 👈 importante: desactivar el bodyParser de Next.js/Vercel
  },
};

export default async function handler(req, res) {
  if (!corsMiddleware(req, res)) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = Buffer.concat(buffers);

    const response = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": req.headers["content-type"], // 👈 respeta el tipo de contenido
      },
      body, // 👈 reenviamos el body tal como lo mandó el navegador
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

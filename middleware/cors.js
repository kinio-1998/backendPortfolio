export const corsMiddleware = (req, res) => {
  const allowedOrigins = process.env.FRONTEND_ORIGINS?.split(",") || [];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // Opcional: deniega o ignora si no está permitido
    res.status(403).json({ error: "CORS origin not allowed" });
    return false;
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return false; // corta la ejecución
  }

  return true; // continuar con el handler principal
};

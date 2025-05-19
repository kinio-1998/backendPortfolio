export const corsMiddleware = (req, res) => {
  const allowedOrigin = process.env.FRONTEND_ORIGINS;

  if (req.headers.origin !== allowedOrigin) {
    res.status(403).json({ error: "Origen no autorizado" });
    return false;
  }

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return false;
  }

  return true;
};

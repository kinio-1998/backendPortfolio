export const corsMiddleware = (req, res) => {
  const allowedOrigins = process.env.FRONTEND_ORIGINS?.split(",") || [];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
  res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return false;
  }

  return true; 
};

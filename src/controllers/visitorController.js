import { saveVisit } from "../services/firebase.js";
import { sendTelegramNotification } from "../services/telegram.js";

export const handleVisitor = async (req, res) => {
  const { ip, fingerprint } = req.body;

  try {
    await saveVisit(ip, fingerprint);
    await sendTelegramNotification(ip, fingerprint);
    res.status(200).json({ message: "Visita registrada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la visita" });
  }
};

import axios from "axios";

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendTelegramNotification = async (ip, fingerprint) => {
  const message = `📢 *Nuevo visitante*\n🌐 IP: ${ip}\n🧠 Fingerprint: ${fingerprint}`;

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  });
};

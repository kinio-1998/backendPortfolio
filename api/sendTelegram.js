export const sendTelegramNotification = async (ip, fingerprint,ubicacion) => {
  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const mensaje = `📢 *Nuevo visitante*\n🌐 IP: ${ip}\n🧠 Fingerprint: ${fingerprint} La ip es de: ${ubicacion}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensaje,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("Error al enviar mensaje de Telegram:", data);
    }
  } catch (err) {
    console.error("Error en la petición a Telegram:", err);
  }
};
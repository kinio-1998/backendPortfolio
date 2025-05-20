# 📦 Backend Portfolio

Este backend está construido con **Node.js** y **Express** y da soporte a funcionalidades clave de mi portafolio web:

## 🚀 Funcionalidades
- ✅ Registro de visitas únicas por IP y fingerprint
- ✅ Envío de notificaciones en tiempo real vía **Telegram**
- ✅ Gestión segura del formulario de contacto a través de **Formspree**
- ✅ Middleware CORS para proteger el acceso desde el frontend
- ✅ Desplegado en **Vercel**

---

## 🛠️ Tecnologías
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin)
- [Formspree](https://formspree.io/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Vercel](https://vercel.com/)
- [FingerprintJS](https://fingerprint.com/)

---

## 📁 Estructura del Proyecto
/api
├── sendFormspree.js # Endpoint para enviar formularios
├── visitRegister.js # Endpoint para registrar visitas
/middleware
└── cors.js # Middleware CORS personalizado

yaml
Copiar
Editar

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
TELEGRAM_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-chat-id
FIREBASE_API_KEY=your-firebase-api-key
FORMSPREE_ID=your-formspree-id
FRONTEND_ORIGINS=https://your-frontend-url.com
Puedes basarte en el archivo .env.example.
```
🧪 Cómo correr localmente
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/kinio-1998/backendPortfolio.git
cd backendPortfolio
Instala las dependencias:

bash
Copiar
Editar
npm install
Agrega tu archivo .env

Ejecuta el servidor en desarrollo:

bash
Copiar
Editar
npm run dev
🌐 Deploy
Este backend está desplegado en Vercel y se consume desde el frontend alojado en GitHub Pages.

📩 Autor
Carlos Duarte (Kinio)
🔗 linkedin.com/in/licarlosduarte
💻 kinio.dev (si ya tienes dominio personalizado)


import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/api/contact', async (req, res) => {
  const { from_name, reply_to, company, phone, province, locality, location, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: reply_to,
      subject: `Nuevo mensaje: ${subject}`,
      html: `
        <h3>Nuevo mensaje desde el sitio web Katana Gin</h3>
        <p><strong>Nombre:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${reply_to}</p>
        <p><strong>Empresa:</strong> ${company || "No especificada"}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Provincia:</strong> ${province}</p>
        <p><strong>Localidad:</strong> ${locality}</p>
        <p><strong>Ubicación:</strong> ${location || "No especificada"}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ status: 'Ok', message: 'Email enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ status: 'Error', message: 'Error interno al enviar el correo' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

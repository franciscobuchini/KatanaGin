import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { from_name, reply_to, company, phone, province, locality, location, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ''),
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Formulario Web Katana" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: reply_to,
      subject: `Nuevo mensaje: ${subject}`,
      html: `
        <h3>Nuevo mensaje desde el sitio web</h3>
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

    console.log('Email enviado:', info.messageId);
    return res.status(200).json({ status: 'Ok', message: 'Email enviado con éxito' });
  } catch (error: any) {
    console.error('Error al enviar email (transporter):', error);
    // Temporalmente devolvemos el error específico para diagnosticar el problema en producción
    return res.status(500).json({ 
      status: 'Error', 
      message: `Error de envío: ${error.message || 'Error interno al enviar el correo'}` 
    });
  }
}

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuración del transporte de correo (ajusta según tu proveedor de correo)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Ej: 'smtp.gmail.com'
  port: 587, // Ej: 587 para TLS
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'jtgngm20@gmail.com',
    pass: 'Juliantg10'
  },
  tls: {
    rejectUnauthorized: false // Solo para desarrollo, en producción debería ser true
  }
});

router.post('/enviar-cotizacion', async (req, res) => {
  try {
    const { to_email, pdfBase64, nombreCliente } = req.body;

    // Decodificar el Base64 del PDF
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    const mailOptions = {
      from: 'TU_CORREO_ELECTRONICO',
      to: to_email,
      subject: 'Cotización de viaje',
      text: 'Aquí está tu cotizacion de viaje adjunta.',
      html: `<h3>Estimado/a ${nombreCliente},</h3><p>Aquí está tu cotizacion de viaje adjunta.</p>`,
      attachments: [
        {
          filename: 'cotizacion.pdf',
          content: pdfBuffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Cotización enviada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar la cotización' });
  }
});

module.exports = router; 

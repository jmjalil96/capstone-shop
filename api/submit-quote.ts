import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { insuranceType, quote, contactInfo, formData, referenceNumber } = req.body

  try {
    // Send notification email to company
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@capstone.com.ec',
      to: 'hola@capstone.com.ec',
      subject: `Nueva Cotización ${insuranceType.toUpperCase()} - ${referenceNumber}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nueva Cotización</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background-color: #0c2939; color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Nueva Solicitud de Cotización</h1>
      <p style="margin: 10px 0 0; opacity: 0.9;">Referencia: ${referenceNumber}</p>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">

      <!-- Customer Info -->
      <h2 style="color: #0c2939; font-size: 18px; margin: 0 0 15px;">Información del Cliente</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 40%;">Nombre:</td>
          <td style="padding: 8px 0; color: #0c2939; font-weight: bold;">${contactInfo.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${contactInfo.email}" style="color: #008c7e; text-decoration: none;">${contactInfo.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Teléfono:</td>
          <td style="padding: 8px 0;"><a href="tel:${contactInfo.phone}" style="color: #008c7e; text-decoration: none;">${contactInfo.phone}</a></td>
        </tr>
      </table>

      <!-- Quote Info -->
      <h2 style="color: #0c2939; font-size: 18px; margin: 0 0 15px;">Cotización</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 40%;">Tipo de Seguro:</td>
          <td style="padding: 8px 0; color: #0c2939; font-weight: bold; text-transform: capitalize;">${insuranceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Prima Mensual:</td>
          <td style="padding: 8px 0; color: #008c7e; font-weight: bold; font-size: 18px;">$${quote.monthlyPremium.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Prima Anual:</td>
          <td style="padding: 8px 0; color: #008c7e; font-weight: bold;">$${quote.annualPremium.toLocaleString()}</td>
        </tr>
      </table>

      <!-- Form Data -->
      <h2 style="color: #0c2939; font-size: 18px; margin: 0 0 15px;">Detalles del Formulario</h2>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; word-wrap: break-word;">
${JSON.stringify(formData, null, 2)}
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #999; font-size: 12px;">
        Enviado desde Capstone Shop el ${new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })}
      </p>
    </div>

  </div>
</body>
</html>
      `,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@capstone.com.ec',
      to: contactInfo.email,
      subject: `Confirmación de Cotización - ${referenceNumber}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Confirmación de Cotización</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden;">

    <div style="background-color: #0c2939; color: white; padding: 40px 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">Capstone</h1>
      <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Tu cotización está lista</p>
    </div>

    <div style="padding: 40px 30px;">
      <p style="color: #333; font-size: 16px; margin: 0 0 20px;">Hola ${contactInfo.name},</p>

      <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 30px;">
        Gracias por tu interés en nuestros servicios de seguros. Hemos recibido tu solicitud de cotización y un agente experto te contactará dentro de las próximas 24 horas.
      </p>

      <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
        <h2 style="color: #0c2939; font-size: 18px; margin: 0 0 20px;">Detalles de tu Cotización</h2>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 10px 0; color: #666;">Referencia:</td>
            <td style="padding: 10px 0; color: #0c2939; font-weight: bold; text-align: right;">${referenceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Tipo de Seguro:</td>
            <td style="padding: 10px 0; color: #0c2939; font-weight: bold; text-align: right; text-transform: capitalize;">${insuranceType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Prima Mensual:</td>
            <td style="padding: 10px 0; color: #008c7e; font-weight: bold; font-size: 16px; text-align: right;">$${quote.monthlyPremium.toLocaleString()}</td>
          </tr>
          <tr style="border-top: 1px solid #e5e7eb;">
            <td style="padding: 10px 0; color: #666;">Prima Anual:</td>
            <td style="padding: 10px 0; color: #008c7e; font-weight: bold; font-size: 16px; text-align: right;">$${quote.annualPremium.toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
        Si tienes alguna pregunta, no dudes en contactarnos.
      </p>
    </div>

    <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #999; font-size: 12px; margin: 0 0 10px;">
        © ${new Date().getFullYear()} Capstone Seguros C.A. Todos los derechos reservados.
      </p>
      <p style="color: #999; font-size: 12px; margin: 0;">
        <a href="mailto:hola@capstone.com.ec" style="color: #008c7e; text-decoration: none;">hola@capstone.com.ec</a> |
        <a href="tel:+59343917828" style="color: #008c7e; text-decoration: none;">+593 4-391-7828</a>
      </p>
    </div>

  </div>
</body>
</html>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Quote submitted successfully',
      referenceNumber,
    })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again.',
    })
  }
}

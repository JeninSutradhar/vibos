import nodemailer from "nodemailer"

type NotifyParams = {
  subject: string
  payload: Record<string, unknown>
}

function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  })
}

export async function sendLeadNotification({ subject, payload }: NotifyParams) {
  const transporter = createTransporter()
  const to = process.env.LEADS_NOTIFY_TO
  const from = process.env.LEADS_NOTIFY_FROM || process.env.SMTP_USER

  if (!transporter || !to || !from) {
    return { delivered: false as const, reason: "Email not configured" }
  }

  const body = JSON.stringify(payload, null, 2)
  await transporter.sendMail({
    from,
    to,
    subject,
    text: body,
  })

  return { delivered: true as const }
}

const BREVO_API = 'https://api.brevo.com/v3/smtp/email'
const SENDER = { name: 'Mike @ SalesRepOS', email: 'hello@salesrepos.com' }

export async function sendEmail(options: {
  to: string
  subject: string
  html: string
  scheduledAt?: string
}) {
  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: options.to }],
      subject: options.subject,
      htmlContent: options.html,
      ...(options.scheduledAt ? { scheduledAt: options.scheduledAt } : {}),
    }),
  })
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`)
}

import { Resend } from 'resend'
import { services } from '@/data/services'

const resend = new Resend(process.env.RESEND_API_KEY)

type Body = {
  name: string
  email: string
  phone?: string
  programId: string
  goal: string
  source: string
}

function findProgram(programId: string) {
  for (const [, config] of Object.entries(services)) {
    const program = config.programs.find((p) => p.id === programId)
    if (program) return { program, config }
  }
  return null
}

function notificationHtml(body: Body, programLabel: string, modeLabel: string) {
  const rows = [
    ['Name', body.name],
    ['Email', `<a href="mailto:${body.email}" style="color:#8F6E5A">${body.email}</a>`],
    ...(body.phone ? [['Phone', body.phone]] : []),
    ['Program', `${modeLabel} — ${programLabel}`],
    ['Goal', body.goal.replace(/\n/g, '<br>')],
    ['Found via', body.source],
    ['Submitted', new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })],
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#7A6B62;white-space:nowrap;vertical-align:top;border-bottom:1px solid #F0EBE5">${label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#2C2820;border-bottom:1px solid #F0EBE5">${value}</td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08)">
        <!-- Header -->
        <tr>
          <td style="background:#2C2820;padding:28px 32px">
            <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:#A8B5A0">New inquiry</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:400;color:#FAF8F4;line-height:1.3">${body.name}</h1>
            <p style="margin:4px 0 0;font-size:13px;color:#7A7A6A">${modeLabel} — ${programLabel}</p>
          </td>
        </tr>
        <!-- Fields -->
        <tr>
          <td style="padding:0">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${tableRows}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #F0EBE5">
            <a href="mailto:${body.email}?subject=Re: Your inquiry about ${programLabel}"
               style="display:inline-block;background:#8F6E5A;color:#FAF8F4;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:99px">
              Reply to ${body.name.split(' ')[0]} →
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:20px 0 0;font-size:11px;color:#B0A89E">Sent from katiebellenger.com</p>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: Request) {
  if (!process.env.KATIE_EMAIL) {
    console.error('KATIE_EMAIL env var is not set')
    return Response.json({ error: 'Server configuration error' }, { status: 500 })
  }

  let body: Body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, programId, goal, source } = body
  if (!name?.trim() || !email?.trim() || !programId || !goal?.trim() || !source) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const match = findProgram(programId)
  const programLabel = match?.program.label ?? programId
  const modeLabel = match?.config.label ?? ''

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
      to: process.env.KATIE_EMAIL,
      subject: `New inquiry: ${name} — ${programLabel}`,
      html: notificationHtml(body, programLabel, modeLabel),
    })
  } catch (err) {
    console.error('Resend error:', err)
    return Response.json({ error: 'Failed to send email' }, { status: 502 })
  }

  return Response.json({ ok: true })
}

import { NextResponse } from 'next/server'

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const HOW_HEARD_LABELS: Record<string, string> = {
  search: 'Google / search',
  social: 'Social media',
  friend: 'Friend or colleague',
  upwork: 'Upwork / freelance community',
  other: 'Other',
}

const HS = 'https://api.hubapi.com'

function stripUndefined<T extends Record<string, string | undefined>>(o: T): Record<string, string> {
  return Object.fromEntries(
    Object.entries(o).filter((e): e is [string, string] => e[1] !== undefined && e[1] !== '')
  ) as Record<string, string>
}

export async function POST(request: Request) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  const listId = process.env.HUBSPOT_WAITLIST_LIST_ID
  const howProp = process.env.HUBSPOT_HOW_HEARD_PROPERTY || 'how_did_you_hear_about_us'

  if (!token || !listId) {
    return NextResponse.json(
      { ok: false, error: 'Waitlist is not configured.' },
      { status: 503 }
    )
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  } as const

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const b = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}
  const email = typeof b.email === 'string' ? b.email.trim() : ''
  const firstname = typeof b.firstname === 'string' ? b.firstname.trim() : ''
  const howHeard = typeof b.howHeard === 'string' ? b.howHeard.trim() : ''

  if (!emailOk(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 })
  }
  if (!howHeard) {
    return NextResponse.json({ ok: false, error: 'Please select how you heard about us.' }, { status: 400 })
  }

  const howLabel = HOW_HEARD_LABELS[howHeard] || howHeard

  const createProps = stripUndefined({
    email,
    firstname: firstname || undefined,
    [howProp]: howLabel,
  })

  const createRes = await fetch(`${HS}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ properties: createProps }),
  })

  const createJson = (await createRes.json().catch(() => ({}))) as { id?: string }

  if (!createRes.ok) {
    console.error('HubSpot contact create failed', createRes.status, createJson)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  const contactId = createJson.id ? String(createJson.id) : undefined
  if (!contactId) {
    console.error('HubSpot create returned no id', createJson)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  const addRes = await fetch(`${HS}/crm/v3/lists/${listId}/memberships/add`, {
    method: 'PUT',
    headers,
    body: JSON.stringify([contactId]),
  })

  if (!addRes.ok) {
    const text = await addRes.text().catch(() => '')
    console.error('HubSpot list add failed', addRes.status, text)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

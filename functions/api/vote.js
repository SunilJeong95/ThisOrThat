// GET  → returns vote counts for all questions: { q1: { left, right }, ... }
// POST → { questionId, side: 'left'|'right' } → increments and returns { left, right }

export async function onRequestGet({ env }) {
  try {
    const entries = await Promise.all(
      Array.from({ length: 10 }, (_, i) => env.PRESENCE.get(`vote:q${i + 1}`))
    )
    const counts = {}
    entries.forEach((val, i) => {
      counts[`q${i + 1}`] = val ? JSON.parse(val) : { left: 0, right: 0 }
    })
    return Response.json(counts)
  } catch {
    return Response.json({})
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const { questionId, side } = await request.json()
    if (!questionId || (side !== 'left' && side !== 'right')) {
      return Response.json({ error: 'invalid' }, { status: 400 })
    }
    const key = `vote:q${questionId}`
    const current = await env.PRESENCE.get(key)
    const counts = current ? JSON.parse(current) : { left: 0, right: 0 }
    counts[side] = (counts[side] || 0) + 1
    await env.PRESENCE.put(key, JSON.stringify(counts))
    return Response.json(counts)
  } catch {
    return Response.json({ left: 0, right: 0 })
  }
}

// GET  → 현재 접속자 수 반환
// POST → 세션 등록/갱신 (body: { sessionId, leaving? })

export async function onRequestGet({ env }) {
  try {
    const list = await env.PRESENCE.list({ prefix: 'sess:' })
    return Response.json({ count: list.keys.length })
  } catch {
    return Response.json({ count: 0 })
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const { sessionId, leaving } = await request.json()
    const key = `sess:${sessionId}`

    if (leaving) {
      await env.PRESENCE.delete(key)
    } else {
      // 90초 TTL — 45초마다 heartbeat로 갱신
      await env.PRESENCE.put(key, '1', { expirationTtl: 90 })
    }

    const list = await env.PRESENCE.list({ prefix: 'sess:' })
    return Response.json({ count: list.keys.length })
  } catch {
    return Response.json({ count: 0 })
  }
}

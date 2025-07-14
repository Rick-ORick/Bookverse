// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { messages } = req.body

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages
      })
    })

    const data = await openaiRes.json()
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'No reply' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error communicating with OpenAI' })
  }
}

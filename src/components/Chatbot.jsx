
import { useState } from 'react'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hi! Ask me about any book or author.' }
  ])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })

    const data = await res.json()
    const reply = data.reply || 'Sorry, something went wrong.'
    setMessages([...newMessages, { role: 'assistant', content: reply }])
  }

  return (
    <div className="mt-10 bg-gray-100 p-4 rounded shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-2">📚 BookVerse Chat Assistant</h3>
      <div className="h-40 overflow-y-auto bg-white p-2 border mb-2 rounded">
        {messages.slice(1).map((msg, i) => (
          <p key={i} className={msg.role === 'user' ? 'text-blue-700' : 'text-green-700'}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        className="w-full p-2 border rounded"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
    </div>
  )
}

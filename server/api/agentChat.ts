// server/api/voiceChat.ts
import { defineEventHandler, readMultipartFormData } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const formData = await readMultipartFormData(event)

  const audioFile = formData?.find(f => f.name === 'audio')
  const sessionId = formData?.find(f => f.name === 'sessionId')?.data

  let userText = ''

  // If audio is provided, do STT
  if (audioFile) {
    const sttResponse = await $fetch<{ text: string }>('https://api.elevenlabs.io/v1/stt', {
      method: 'POST',
      headers: { 'xi-api-key': config.elevenlabsApiKey },
      body: audioFile.data
    })
    userText = sttResponse.text || ''
  } else {
    // No audio means this is the first click → inject intro prompt
    userText = "Hello! Please introduce yourself to the user."
  }

  // 2️⃣ Send text to agent
  const agentResponse = await $fetch<{ output?: { text?: string } }>(
    'https://api.elevenlabs.io/v1/convai/agents/agent_7001k9m8nx7wfjrtrvzjm71c2jv0/conversations',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xi-api-key': config.elevenlabsApiKey },
      body: { session_id: sessionId, input: { text: userText } }
    }
  )

  const replyText = agentResponse.output?.text || ''

  // 3️⃣ Generate audio from agent reply (TTS)
  const ttsResponse = await $fetch<{ audio_url: string }>(
    'https://api.elevenlabs.io/v1/text-to-speech/QzclONYwRWvec152I3wf',
    {
      method: 'POST',
      headers: {
        'xi-api-key': config.elevenlabsApiKey,
        'Content-Type': 'application/json'
      },
      body: { text: replyText }
    }
  )

  // 4️⃣ Return text + audio
  return { reply: replyText, audioUrl: ttsResponse.audio_url }
})

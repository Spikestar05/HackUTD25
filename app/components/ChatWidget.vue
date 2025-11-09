const response = await $fetch('/api/agentChat', {
  method: 'POST',
  body: { sessionId, message: userMessage }
})
showBotReply(response.reply)
if (response.audioUrl) {
  const audio = new Audio(response.audioUrl)
  audio.play()
}

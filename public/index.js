// Functions
async function get(uri) {
  const origin = document.location.origin
  const url = `${origin}${uri}`
  const options = { method: 'GET' }
  // Fetch
  let response = await fetch(url, options)
  if (!response.ok) { return 'REQUEST FAILED' }
  const res = await response.json()
  return res
}

// Elements
const sleepTime = document.getElementById('sleepTime')
const minsUntilSleep = document.getElementById('minsUntilSleep')
const setSleepTimer = document.getElementById('setSleepTimer')
const setSleepTimer01 = document.getElementById('setSleepTimer01')
const setSleepTimer10 = document.getElementById('setSleepTimer10')
const setSleepTimer20 = document.getElementById('setSleepTimer20')
const setSleepTimer30 = document.getElementById('setSleepTimer30')
const brightnessPercentage = document.getElementById('brightnessPercentage')
const openClock = document.getElementById('openClock')

// Events
setSleepTimer.addEventListener('click', async () => {
  const res = await get(`/api/sleep?minutes=${minsUntilSleep.value}`)
})
setSleepTimer01.addEventListener('click', async () => {
  const res = await get(`/api/sleep?minutes=0.1`)
})
setSleepTimer10.addEventListener('click', async () => {
  const res = await get(`/api/sleep?minutes=10`)
})
setSleepTimer20.addEventListener('click', async () => {
  const res = await get(`/api/sleep?minutes=20`)
})
setSleepTimer30.addEventListener('click', async () => {
  const res = await get(`/api/sleep?minutes=30`)
})
openClock.addEventListener('click', async () => {
  const res = await get(`/api/clock/show`)
})
brightnessPercentage.addEventListener('change', async () => {
  const brightnessPercentage = event.target.value
  console.log("brightnessPercentage", brightnessPercentage)
  localStorage.setItem("brightnessPercentage", brightnessPercentage)
})

// Poll
setInterval(async () => {
  const minsRemaining = await get(`/api/sleep/timer`)
  sleepTime.innerText = `Sleep After ${minsRemaining} Minutes`
}, 2 * 1000)



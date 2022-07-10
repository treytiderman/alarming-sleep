
async function get(uri) {
  const origin = document.location.origin;
  const url = `${origin}${uri}`;
  const options = { method: 'GET' };
  // Fetch
  let response = await fetch(url, options);
  if (!response.ok) { return 'REQUEST FAILED' }
  const res = await response.json();
  return res;
}



const sleepTime = document.getElementById('sleepTime');
const minsUntilSleep = document.getElementById('minsUntilSleep');
const setSleepTimer = document.getElementById('setSleepTimer');
const openClock = document.getElementById('openClock');



setSleepTimer.addEventListener('click', async () => {
  const res = await get(`/api/sleep?minutes=${minsUntilSleep.value}`);
});
openClock.addEventListener('click', async () => {
  const res = await get(`/api/clock/show`);
});

setInterval( async () => {
  const minsRemaining = await get(`/api/sleep/timer`);
  sleepTime.innerText = `Sleep After ${minsRemaining} Minutes`;
}, 2*1000);

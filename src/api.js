// Create Express router
const express = require('express');
const router = express.Router();

// Require
const { BrowserWindow } = require('electron');
const { clickCenterScreen, muteAudio } = require('./ioRobot');

// Functions 
let clockWindow;
function clockExit() {
  const windows = BrowserWindow.getAllWindows();
  for (let i = 0; i < windows.length; i++) {
    if (windows[i].getBackgroundColor() === '#000000') { 
      windows[i].close()
    }
  }
}
function clockShow() {
  // Close any clock windows and mute
  clockExit();
  muteAudio();
  // Create a new clock window
  clockWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: '#000000',
    // opacity: .8
  });
  clockWindow.loadURL('http://localhost:42069/clock')
  clockWindow.on('show', () => {
    clockWindow.setAlwaysOnTop(true, "screen-saver");
    setTimeout(() => {
      clockWindow.focus();
      clickCenterScreen();
    }, 200);
  });
  clockWindow.show();
}



// Routes
let sleepTimer = {
  timeout: {},
  set: false,
  setAt: Date.now(),
  minTotal: 0,
  minPassed: 0,
  minLeft: 0
};
// http://localhost:42069/api/sleep?minutes=60
router.get('/sleep', (req, res) => {
  if (req.query.minutes && req.query.minutes > 0) {
    // Recieve Data
    sleepTimer.set = true;
    sleepTimer.setAt = Date.now();
    sleepTimer.minTotal = Number(req.query.minutes)
    console.log('sleepTimer.minTotal', sleepTimer.minTotal);
    // Set timeout
    sleepTimer.timeout = setTimeout(() => {
      console.log('timeout');
      clockShow();
      sleepTimer.set = false;
    }, sleepTimer.minTotal*60*1000);
  }
  res.json(sleepTimer.minTotal);
});
router.get('/sleep/timer', (req, res) => {
  if (sleepTimer.set) {
    sleepTimer.minPassed = (Date.now() - sleepTimer.setAt) / (1000 * 60);
    sleepTimer.minPassed = Math.floor(sleepTimer.minPassed);
    sleepTimer.minLeft = sleepTimer.minTotal - sleepTimer.minPassed;
    console.log('sleepTimer.minLeft', sleepTimer.minLeft);
    res.json(sleepTimer.minLeft);
  }
  else {
    res.json('x');
  }
});
router.get('/sleep/cancel', (req, res) => {
  sleepTimer.set = false;
  clearTimeout(sleepTimer.timeout);
  res.json('CANCELED SLEEP TIMER');
});

router.get('/clock/show', (req, res) => {
  clockShow();
});
router.get('/clock/exit', (req, res) => {
  clockExit();
});

router.get('/alarm', (req, res) => {
  res.json();
});


// Export
exports.router = router;




// // Timer
// let alarm;
// const timeInput = document.getElementById('timeInput')
// timeInput.addEventListener('input', e => {
//   // Vars
//   const dateNow = getCurrentDate();
//   const temp = timeInput.value.split(":");
//   const dateAlarm = {
//     hour: Number(temp[0]),
//     minute: Number(temp[1])
//   }
//   let hoursDiff = dateAlarm.hour - dateNow.hour;
//   let minutesDiff = dateAlarm.minute - dateNow.minute;
//   console.log(`Current Time: ${dateNow.hour}:${dateNow.minute}`);
//   console.log(`    Alarm at: ${dateAlarm.hour}:${dateAlarm.minute}`);
//   // Tomorrow
//   if (hoursDiff < 0) hoursDiff += 24;
//   else if (hoursDiff === 0 && minutesDiff < 0) hoursDiff += 24;
//   console.log(`  Difference: ${hoursDiff}:${minutesDiff}`);
//   // Set Alarm
//   const alarmTimer = hoursDiff*60*60*1000 + minutesDiff*60*1000;
//   alarm = setTimeout(() => {
//     console.log('Alarm');
//   }, alarmTimer);
// });


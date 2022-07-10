// Control local mouse and keyboard
// https://nutjs.dev/API/datatypes
const { mouse, straightTo, Button, screen, keyboard, Key } = require("@nut-tree/nut-js");
mouse.config.autoDelayMs = 10; // configures the delay between mouse clicks and / or scrolls
mouse.config.mouseSpeed = 10000; // configures mouse movement speed in pixels per second

// Functions
async function clickCenterScreen() {
  const width = await screen.width()
  const height = await screen.height()
  await mouse.setPosition({ x: width/2, y: height/2 });
  await mouse.click(Button.LEFT);
}
async function muteAudio() {
  await keyboard.type(Key.AudioVolDown);
  await keyboard.type(Key.AudioStop);
}
async function unmuteAudio() {
  await keyboard.type(Key.AudioVolUp);
  await keyboard.type(Key.AudioStop);
}


// Export
exports.clickCenterScreen = clickCenterScreen;
exports.muteAudio = muteAudio;

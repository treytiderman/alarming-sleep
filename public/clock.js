// Classes
class Canvas {
  constructor(canvas, dpi) {
    this.canvas = canvas || document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this.dpi = dpi || window.devicePixelRatio;
    this.scale = this.dpi;
    this.updateScreenSize();
  }
  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  updateScreenSize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * this.dpi;
    this.canvas.height = rect.height * this.dpi;
    this.ctx.scale(this.scale, this.scale);
  }
  update(render) {
    this.frame++;
    this.clearScreen();
    this.updateScreenSize();
    render();
    // setTimeout(() => {this.update(render)}, 1000/120);
    requestAnimationFrame(() => {this.update(render)});
  }
}
class Partical {
  constructor(x, y, xVel, yVel, radius, color) {
    // Possition
    this.x = x || 100;
    this.y = y || 100;
    // Circle
    this.radius = radius || 4;
    this.hue = randomBetween(0, 360);
    this.saturation = 100;
    this.lightness = 90;
    this.alpha = randomBetween(10, 100)/100;
    this.color = color || `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    // Velocity
    this.xVel = xVel || 0;
    this.yVel = yVel || 0;
  }
  draw() {
    // Move
    this.x += this.xVel
    this.y += this.yVel
    // Collision
    if (this.x <= this.radius || this.x + this.radius >= canvas.width / c.scale) this.xVel *= -1
    if (this.y <= this.radius || this.y + this.radius >= canvas.height / c.scale) this.yVel *= -1
    // Circle
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  updateHue(add) {
    this.hue += add;
    if (this.hue > 360) this.hue = 0;
    this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
  }
}
class Clock {
  constructor(x, y, text, h, color, xVel, yVel) {
    // Circle
    this.h = h || canvas.width * c.scale * .6
    console.log(canvas.height);
    if (canvas.height < canvas.width) {this.h = h || canvas.height * c.scale * .6}
    this.text = text || `10:30`;
    this.font = `${this.h}px 'Fira Code'`;
    this.hue = 0;
    this.saturation = 90;
    this.lightness = 60;
    this.alpha = .2;
    this.color = color || `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    // Possition
    this.x = x || 20;
    this.y = y || this.h;
    // Velocity
    this.xVel = xVel || .1;
    this.yVel = yVel || .1;
  }
  draw() {
    // Move
    this.x += this.xVel
    this.y += this.yVel
    // Collision
    ctx.font = this.font;
    const w = ctx.measureText(this.text).width;
    if (this.x <= 0 || this.x + w >= canvas.width / c.scale) this.xVel *= -1
    if (this.y <= this.h * .8 || this.y + 10 >= canvas.height / c.scale) this.yVel *= -1
    // Text
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
  updateHue(add) {
    this.hue += add;
    if (this.hue > 360) this.hue = 0;
    this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
  }
}

// Functions
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function cancelFullscreen() {
  var el = document;
  var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen || el.webkitExitFullscreen;
  if (requestMethod) { requestMethod.call(el) }
}
function requestFullscreen(el) {
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (requestMethod) { requestMethod.call(el) }
  return false
}
function toggleFullscreen(el) {
  if (!el) { el = document.body } // Default to body
  var isInFullScreen = document.fullScreenElement || document.mozFullScreen || document.webkitIsFullScreen;
  if (isInFullScreen) { cancelFullscreen() }
  else { requestFullscreen(el) }
  return false;
}
function createParticals() {
  let p = [];
  for (let i = 0; i < 1000; i++) {
    let radius = (randomBetween(5, 30)/50)+.5;
    let x = randomBetween(radius, canvas.width*c.dpi - radius);
    let y = randomBetween(radius, canvas.height*c.dpi - radius);
    let neg = 1 + randomBetween(1, 2)%2 * -2;
    let xVel = randomBetween(1, 1000) * neg / 10000;
    let yVel = randomBetween(1, 1000) * neg / 10000;
    p[i] = new Partical(x, y, xVel, yVel, radius);
  }
  return p
}
function drawParticals(p) {
  for (let i = 0; i < p.length; i++) {
    p[i].updateHue( randomBetween(0.1, 0.5) );
    p[i].draw();
  }
}
function drawClock(clock) {
  const time = new Date(Date.now()).toLocaleTimeString('en-US');
  let hr = new Date(Date.now()).getHours();
  let min = new Date(Date.now()).getMinutes();
  hr = hr%12;
  let hr0 = `${hr}`;
  if (hr < 10) hr0 = `0${hr}`;
  let min0 = `${min}`;
  if (min < 10) min0 = `0${min}`;
  clock.text = time;
  clock.text = `${hr0}:${min0}`
  clock.updateHue(0.1);
  clock.draw();
}
function getCurrentDate() {
  let date = new Date(Date.now());
  const dateObj = {
    date: date,
    minute: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear(),
  }
  return dateObj;
}


// Create Canvas
let c = new Canvas();
let canvas = c.canvas;
let ctx = c.ctx;

// Canvas Render
let t = new Clock();
// let p = createParticals();
c.update(() => { 
  drawClock(t); 
  // drawParticals(p);
});

// Hide Mouse
let timeout;
canvas.addEventListener('mousemove', e => {
  canvas.style.cursor = "default";
  clearTimeout(timeout);
  timeout = setTimeout(() => canvas.style.cursor = "none", 1000);
});

// Click to fullscreen
canvas.addEventListener('click', e => toggleFullscreen(canvas));


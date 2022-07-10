const { uIOhook, UiohookKey } = require('uiohook-napi');

// Events
uIOhook.on('keydown', e => {
  if (e.keycode === UiohookKey.Escape) clockExit();
});

uIOhook.start();

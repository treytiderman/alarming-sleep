// Require Express - Web server
const express = require('express');
const app = express();

// Public folder, auto handle routes to /css/base.css for example
app.use(express.static(__dirname + '/public'));

// Require fs - File system
const fs = require('fs').promises;

// Router /
app.get('/', async (req, res) => {
  res.send( await fs.readFile(__dirname + '/public/index.html','utf8') );
});
app.get('/clock', async (req, res) => {
  res.send( await fs.readFile(__dirname + '/public/clock.html','utf8') );
});

// Router /api
const { router } = require(__dirname + '/src/api');
app.use('/api', router);

// Start web server
const port = 42069;
app.listen(port, () => {
  console.log(`Alarming sleep server`)
  console.log(`>> this hosts the web pages available at: http://localhost:${port} \n`)
})

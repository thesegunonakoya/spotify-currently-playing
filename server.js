// npm init -y

// npm install axios querystring

// node server.js

// node getToken.js

const express = require('express');
const app = express();

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  res.send("Authorization code: " + code);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
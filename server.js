const express = require('express');
const axios = require('axios');
const qs = require('querystring');

const clientId = 'd2c2ae197b8d4f3bb9c069d1a528817d';
const clientSecret = '01883acb64ae4272ae252f576e4ea9f7';
const redirectUri = 'http://localhost:3000/callback'; 

const app = express();

let storedRefreshToken = ''; 

app.get('/login', (req, res) => {
  const scopes = 'user-read-currently-playing';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri));
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    data: qs.stringify({
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri
    })
  })
  .then(response => {
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    storedRefreshToken = refreshToken;

    console.log('Access Token: ', accessToken);
    console.log('Refresh Token: ', refreshToken);

    res.send('Success! You can now close the window.');
  })
  .catch(error => {
    console.error('Error:', error);
    res.send('Error! Check the console for details.');
  });
});

app.get('/refresh_token', (req, res) => {
  if (!storedRefreshToken) {
    return res.send('No refresh token stored. Please authenticate first.');
  }

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    data: qs.stringify({
      'grant_type': 'refresh_token',
      'refresh_token': storedRefreshToken
    })
  })
  .then(response => {
    const newAccessToken = response.data.access_token;
    console.log('New Access Token: ', newAccessToken);

    res.send('New Access Token: ' + newAccessToken);
  })
  .catch(error => {
    console.error('Error:', error);
    res.send('Error! Check the console for details.');
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

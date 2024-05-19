const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const clientId = 'CLIENT_ID';
  const clientSecret = 'CLIENT_SECRET';
  const refreshToken = 'REFRESH_TOKEN';

  const base64Encode = (str) => Buffer.from(str).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64Encode(clientId + ':' + clientSecret)
      },
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to refresh access token' });
    }

    const data = await response.json();

    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.status(200).json(data);
  } catch (error) {
    console.error('Error refreshing access token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const clientId = 'd2c2ae197b8d4f3bb9c069d1a528817d';
  const clientSecret = '01883acb64ae4272ae252f576e4ea9f7';
  const refreshToken = 'AQA15K_GrH3pwdVWA9HYnW0a9LSF4uz6264AReZO0uBSbm3XDzH8SSkdbpbivJM63AKa3nLf6VN8-sJKIkjuWdrjA-TJmVSzKyJOe4vjZCdov9T66OdQmS_k6-jmIGjKcYI';

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

const axios = require('axios');
const qs = require('querystring');

const clientId = 'CLIENT_ID'; 
const clientSecret = 'CLIENT_SECRET'; 
const code = 'AUTHORIZATION_CODE';

const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:3000/callback' // Your redirect URI
};

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), {
    headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => {
    console.log('Access Token:', response.data.access_token);
    console.log('Refresh Token:', response.data.refresh_token);
})
.catch(error => {
    console.error('Error:', error);
});
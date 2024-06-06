module.exports = async (req, res) => {
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const refreshToken = 'YOUR_REFRESH_TOKEN';


    const base64Encode = (str) => Buffer.from(str).toString('base64');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const fetch = await import('node-fetch');

        const tokenResponse = await fetch.default('https://accounts.spotify.com/api/token', {
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

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('Failed to refresh access token:', tokenResponse.status, errorText);
            return res.status(tokenResponse.status).json({ error: 'Failed to refresh access token', details: errorText });
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const currentlyPlayingResponse = await fetch.default('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!currentlyPlayingResponse.ok) {
            const errorText = await currentlyPlayingResponse.text();
            console.error('Failed to fetch currently playing track:', currentlyPlayingResponse.status, errorText);
            return res.status(currentlyPlayingResponse.status).json({ error: 'Failed to fetch currently playing track', details: errorText });
        }

        const currentlyPlayingData = await currentlyPlayingResponse.json();
        res.status(200).json(currentlyPlayingData);

    } catch (error) {
        console.error('Error in API request:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

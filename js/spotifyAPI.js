async function getAccessToken() {
    try {
        const response = await fetch('./api/refreshToken');
        if (!response.ok) {
            throw new Error('Failed to fetch access token: ' + response.statusText);
        }
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
}

async function fetchCurrentlyPlaying() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        return;
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const text = await response.text();
        const currentlyPlayingElement = document.getElementById('currently-playing');

        const currentHour = new Date().getHours();
        let endText;
        if (currentHour >= 5 && currentHour < 12) {
            endText = "&nbsp; How's your morning going?&nbsp;🌄";
        } else if (currentHour >= 12 && currentHour < 17) {
            endText = "&nbsp; How's your day going?&nbsp;🌅";
        } else if (currentHour >= 17 && currentHour < 21) {
            endText = "&nbsp; How's your evening going?&nbsp;🌃";
        } else if (currentHour >= 21 || currentHour < 4) {
            endText = "&nbsp; How's your night going?&nbsp;🌇";
        } else {
            endText = "&nbsp; Up all night too huh?&nbsp;🌆";
        }

        const svgIcon = '<img src="./svg/spotify.svg" class="spotify-svg" />';

        if (!text) {
            currentlyPlayingElement.innerHTML = svgIcon + "I'm not listening to anything at the moment&nbsp;😴" + endText;
            return;
        }

        const data = JSON.parse(text);

        if (data && data.item && data.item.name) {
            const artistName = data.item.artists[0].name;
            currentlyPlayingElement.innerHTML = svgIcon + "I'm currently listening to '" + data.item.name + "' by " + artistName + "&nbsp;🔥" + endText;
        } else {
            currentlyPlayingElement.innerHTML = svgIcon + "I'm not listening to anything at the moment&nbsp;😴" + endText;
        }
    } catch (error) {
        console.error('Error:', error);
        const currentlyPlayingElement = document.getElementById('currently-playing');
        currentlyPlayingElement.innerHTML = svgIcon + "I'm not listening to anything at the moment&nbsp;😴" + endText;
    }
}

window.onload = function() {
    fetchCurrentlyPlaying();
    setInterval(fetchCurrentlyPlaying, 60 * 60 * 1000);
};
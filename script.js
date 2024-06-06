async function fetchCurrentlyPlaying() {
    const svgIcon = '<img src="../svg/spotify.svg" class="spotify-svg"/>';
    const currentlyPlayingElement = document.getElementById('currently-playing');

    const currentHour = new Date().getHours();
    let endText;
    if (currentHour >= 5 && currentHour < 12) {
        endText = "&nbsp; How's your morning going?&nbsp;&nbsp; 🎈";
    } else if (currentHour >= 12 && currentHour < 17) {
        endText = "&nbsp; How's your day going?&nbsp;&nbsp; 🎈";
    } else if (currentHour >= 17 && currentHour < 21) {
        endText = "&nbsp; How's your evening going?&nbsp;&nbsp; 🎈";
    } else if (currentHour >= 21 || currentHour < 4) {
        endText = "&nbsp; How's your night going?&nbsp;&nbsp; 🎈";
    } else {
        endText = "&nbsp; Up all night too huh?&nbsp;&nbsp; 🎈";
    }

    try {
        const response = await fetch('https://api.thesegunonakoya.me/api/spotify.js');
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();

        if (!data.item) {
            currentlyPlayingElement.innerHTML = svgIcon + "I'm not listening to anything at the moment&nbsp;&nbsp;😴" + endText;
            return;
        }

        const artistName = data.item.artists[0].name;
        currentlyPlayingElement.innerHTML = svgIcon + "I'm currently listening to '" + data.item.name + "'  by " + artistName + '&nbsp;&nbsp;&nbsp;🎧&nbsp;📀&nbsp;' + endText;

    } catch (error) {
        console.error('Error fetching currently playing track:', error);
        currentlyPlayingElement.innerHTML = svgIcon + "I'm not listening to anything at the moment&nbsp;&nbsp;😴" + endText;
    }
}


window.onload = function() {
    fetchCurrentlyPlaying();
    setInterval(fetchCurrentlyPlaying, 60 * 60 * 1000);
};

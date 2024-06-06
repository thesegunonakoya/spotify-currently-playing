# spotify-currently-playing

<samp>

This project is a serverless function i deployed on Vercel that fetches and returns information about the track currently playing on my Spotify. It utilizes the Spotify API to retrieve real-time data about the currently playing track. You can see a live demo of this feature on <a href="https://thesegunonakoya.me" target="_blank">my personal website</a>, where a scrolling text in the header dynamically updates to show what I am currently listening to on my Spotify and unlike you, i have a very good taste in music.

</samp>

## Features

<samp>

- Displays whatever song you are currently playing on your Spotify no matter how boring or weird it is.
- Updates the display in real-time to reflect any changes in the currently playing song when the page is refreshed or reloaded.
- Deployed as a serverless function on Vercel, allowing for scalability and minimal maintenance.
- With an additional greeting message based on the time of day to make you seem a bit polite even though you are not ( for example "I'm currently listening to 'Wells Fargo' by Vibez Inc 🎧 📀 How's your night going? 🎈").

</samp>

# Getting Started

<samp>

Follow these steps to set up and deploy the Spotify Currently Playing API:

</samp>

## Prerequisites

<samp>

- Ensure Node.js is installed on your system.
- You need a Vercel account and Spotify Developer account if you haven't already.
- Get a first aid box close by just in case.
- Breathe in a breathe out deeply.

</samp>

## Installation

<samp>
1. Clone this repository to your local machine:

git clone https://github.com/thesegunonakoya/spotify-currently-playing.git


2. Navigate to the project directory:

cd spotify-currently-playing


3. Install dependencies using npm:

npm install

</samp>

## Configuration

<samp>

Before deploying the serverless function, you need to configure the Spotify API credentials:

1. Go to the <a href="https://developer.spotify.com/dashboard/login" target="_blank">Spotify Developer Dashboard</a> and log in with your Spotify account.

2. Create a new application and note down the Client ID and Client Secret.

3. Obtain a refresh token for your Spotify account using the <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/" target="_blank">Spotify Authorization Guide</a>.

4. Update the spotify.js script with your Spotify API credentials:

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const refreshToken = 'YOUR_REFRESH_TOKEN';

</samp>

## Deployment

<samp>

Now you're ready to deploy the serverless function to Vercel:

1. Install the Vercel CLI globally:

npm install -g vercel

2. Log in to your Vercel account using the CLI:

vercel login

3. Deploy the project to Vercel:

vercel --prod

4. Follow the prompts to confirm the deployment settings.

</samp>

## Usage

<samp>

Once deployed, you can access the Spotify Currently Playing API endpoint using the generated URL:

https://your-vercel-project-url.vercel.app/api/spotify

Visiting this URL will return JSON data containing information about the track currently playing on Spotify.

</samp>

## Calling the API from Frontend

<samp>

To fetch and display the currently playing track on the frontend, you can use the provided script.js. Here's how you can integrate it into your HTML:

<div id="currently-playing"></div>
<script src="script.js"></script>

</samp>


## License

<samp>

This project is licensed under the <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank">MIT License</a>

</samp>

## Acknowledgments

<samp>

<a href="https://vercel.com/" target="_blank">Vercel</a> for providing an excellent platform for serverless deployments.
<a href="https://developer.spotify.com/" target="_blank">Spotify Developer</a> for the Spotify API.
<a href="https://github.com/deji-ice" target="_blank">Ayodeji Atanda</a> for the inspiration and continuous guidance.

</samp>
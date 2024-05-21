# spotify-currently-playing

<samp>

This is a simple web application that showcases the song currently playing on Spotify by leveraging Spotify's Web API to fetch and display this information in real-time on a webpage. You can see a live demonstration of this feature on <a href="https://thesegunonakoya.vercel.app" target="_blank">my portfolio</a>, where the header dynamically updates to show what I am currently listening to.

</samp>

## Features

<samp>

- Displays the currently playing song on Spotify.
- Updates the display in real-time to reflect any changes in the currently playing song.
- With an additional greeting message based on the time of day ("I'm currently listening to 'ocean eyes' by Billie Eilish 🔥  How's your night going? 🌇").

</samp>

## Prerequisites

<samp>

- Ensure Node.js and npm are installed on your system.
- Create a Spotify Developer account if you haven't already.

</samp>

## Setup Instructions

<samp>
1. Initialize the Project

In your terminal, navigate to the root directory of your project and run the following command:

npm init -y

2. Install Dependencies

Install the required dependencies by executing the following command:

npm install express axios querystring

3. Create a Spotify App

Visit the Spotify Developer Dashboard and create a new application.
Set http://localhost:3000/callback as the Redirect URI.
Choose "Web API" when prompted for the APIs/SDKs you intend to use.
After creating the app, copy the Client ID and Client Secret from your app's details.

4. Configure the Server

Open the server.js file in your project and replace CLIENT_ID and CLIENT_SECRET with the respective values obtained in the previous step.

5. Start the Server

Launch the server by executing the following command in your terminal:

node server.js

6. Authorize the Application

Open your web browser and navigate to http://localhost:3000/login. This action will redirect you to the Spotify login page for authorization. Upon successful authorization, you'll see a message indicating success.

7. Obtain Tokens

Return to your terminal, where you'll find two tokens generated: an Access Token and a Refresh Token. You'll only need the Refresh Token for ongoing use.

8. Update refreshToken.js

Open the /api/refreshToken.js file and update the placeholders CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN with your actual values.

9. Implement the Frontend

The /js/spotifyAPI.js script manages the retrieval of a new access token from the /api/refreshToken endpoint. It then utilizes this token to fetch the currently playing track from Spotify and updates the webpage. Ensure you have an HTML element with the ID currently-playing to display the track information.

</samp>


## License

<samp>

This project is licensed under the [MIT License](LICENSE).

</samp>
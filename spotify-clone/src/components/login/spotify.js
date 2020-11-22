// Spotify logic will be contained in this file and used in the login component

// authorization endpoint using Spotify API
// use when client clicks the login page
export const authEndpoint = "https://accounts.spotify.com/authorize";

// redirect to home page once logged in 
const redirectUri = "https://spotify-clone-apancorb.web.app/";

// client id
const clientId = "524b79690185433b95c645cc429e7eb0";

// scopes for Spotify needs 
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// get the token received after logging in 
export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((intial, item) => {
        // #accessToken=mysuperkey&name=john&...
        var parts = item.split('=');
        intial[parts[0]] = decodeURIComponent(parts[1]);
        return intial;
    }, {});
}

// the login url we will use in the app
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

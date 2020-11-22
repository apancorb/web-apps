import React, { useEffect, useState } from "react";
import "./App.css";

/* Components */
import Login from "./components/login/Login.js";
import Player from "./components/player/Player.js";

/* Functionality */
import { getTokenFromUrl } from "./components/login/spotify.js";

/* React Context API */
import { useDataLayerValue } from "./DataLayer.js";

/* Wrapper for easier use of Spotify API */
import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();



function App() {
  
  // grab anything from the data layer
  const [{ user , token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = ""; // for some security reasons
    const _token = hash.access_token;

    if (_token) {
      
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcMz2DqOALLVg').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      }); 

    } 
  }, []);

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
          <Login />
        )
      }
     
    </div>
  );
}

export default App;

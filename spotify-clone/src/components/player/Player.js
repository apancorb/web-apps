import React from "react";
import "./Player.css";
import Sidebar from "./sidebar/Sidebar.js";
import Body from "./body/Body.js";
import Footer from "./footer/Footer.js"


function Player({ spotify }) {
    return (
        <div className="player">
            <div className="player__body">
                {/* Sidebar */}
                <Sidebar />
                {/* Body */}
                <Body spotify={spotify}/>
            </div>
            {/*Footer */}
            <Footer />
        </div>
    );
}

export default Player;
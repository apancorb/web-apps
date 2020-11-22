import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./../../../DataLayer";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledSharp";
import SongRow from "./SongRow";


function Body({ spotify }) {
    const [{ discover_weekly }, dispatch] = useDataLayerValue();

    const dw_var = discover_weekly.images
    const dw_var_ = discover_weekly.tracks
    console.log("a ->" , dw_var)
    return (
        <div className="body">

            <Header spotify={spotify} />

            <div className="body__info">

                <img src={dw_var ? dw_var[0].url : ""} alt="" />

                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>

            </div>

            <div className="body__songs">

                <div className="body__icons">
                    <PlayCircleFilledIcon className="body__shuffle" />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {dw_var_ ? dw_var_.items.map((item) => (
                    <SongRow track={item.track} />
                )) : <h4>No songs available</h4>}

            </div>

        </div>
    );
}

export default Body;
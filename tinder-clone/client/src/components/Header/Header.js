import React from "react";
import "./Header.css";
import PersonIcon from '@material-ui/icons/Person';
import IconButtom from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';

function Header() {
    return (
        <div className="header">

            <IconButtom>
                <PersonIcon fontSize="large" className="header__icon"/>
            </IconButtom>

            <img 
                className="header__logo"
                src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png"
                alt=""
            />

            <IconButtom>
                <ForumIcon fontSize="large" className="header__icon"/>
            </IconButtom>

        </div>
    );
}

export default Header;

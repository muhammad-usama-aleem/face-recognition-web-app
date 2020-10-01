import React from 'react';
import Tilt from 'react-tilt';
import "./CSS/Title.css";
import logo from "../img/brain.png"


export default function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3">
                <img style={{paddingTop: '5px'}} src={ logo} alt="logo" />
            </div>
            </Tilt>
        </div>
    )
}

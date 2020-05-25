import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { KeyboardArrowDown } from '@material-ui/icons'
import { SvgIcon } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import Image_1 from './Image_1.png';
import { Link } from 'react-router-dom';
import watboy_text from './watboy_text.png'
import CancelIcon from '@material-ui/icons/Cancel';

const NavBar = (props) => {
    const [nar, setNar] = useState(false);
    const [left, setLeft] = useState('3%')
    const [flex, setFlex] = useState('0.97')
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (props.big === true) {
            setNar(true)
            setLeft('18.05%')
            setFlex('0.77')
        }
        else {
            setNar(false)
            setLeft('9.5%')
            setFlex('0.85')
        }
    })
    //to close watboy
    const closewatboy = () => {
        setShow(false)
    }
    //for navigation
    const imagehandler = () => {
        props.datacallback()
    }
    //to display watboy
    const handleClick = () => {
        setShow(true)
    }
    return (
        <div>
            <header className="toolbar" style={{ left: left }}>
                <div className="toolbar_pageheading">
                    {props.heading}
                </div>
                <div style={{ flex: flex }} />
                <Link to="/Settings">
                    <div className="toolbar_settingsicon">
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path style={{ "fill": "#bcbccb" }} d="M14.963,5.85,16.2,3.487,14.625,1.912,12.263,3.15a4.03,4.03,0,0,0-1.238-.45l-.9-2.7H7.875l-.9,2.587a4.7,4.7,0,0,0-1.125.45L3.487,1.8,1.8,3.487,3.038,5.85a4.7,4.7,0,0,0-.45,1.125L0,7.875v2.25l2.587.9c.112.45.338.787.45,1.238L1.8,14.625,3.375,16.2l2.362-1.237a4.03,4.03,0,0,0,1.238.45L7.875,18h2.25l.9-2.588c.45-.113.787-.337,1.238-.45L14.625,16.2,16.2,14.625l-1.237-2.362a4.03,4.03,0,0,0,.45-1.238l2.588-.9V7.875l-2.588-.9A4.7,4.7,0,0,0,14.963,5.85ZM9,12.375A3.315,3.315,0,0,1,5.625,9,3.315,3.315,0,0,1,9,5.625,3.315,3.315,0,0,1,12.375,9,3.315,3.315,0,0,1,9,12.375Z" transform="translate(3 3)" />
                                <path style={{ "fill": "none" }} d="M0,0H24V24H0Z" /></svg>
                        </SvgIcon>
                    </div>
                </Link>
                <div className="toolbar_notificationsicon" onClick={handleClick}>
                    <SvgIcon>
                        <svg width="24" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path fill="rgb(0,0,0)" stroke="rgb(0,0,0)" stroke-width="1" opacity="0" d="M 0 0 L 15 0.5 L 13 1 L 12 7 Q 7.3 6 6 9.5 L 6 14.5 L 3 20 L 18.5 20 L 19 18.5 Q 15 17.1 16 12 L 23 11 L 23.5 9 L 24 25 L 0 25 L 0 0 Z M 9 21 Q 8 25 13 23 Q 14 19 9 21 Z "></path>
                            <path fill="rgb(0,0,0)" stroke="rgb(0,0,0)" stroke-width="1" opacity="0" d="M 21.5 0 Q 25.3 -1.3 24 2.5 L 23 2.5 Q 23.8 0.3 21.5 1 L 21.5 0 Z "></path>
                            <path fill="rgb(255,192,107)" stroke="rgb(255,192,107)" stroke-width="1" opacity="1" d="M 17.5 2 L 21 3 L 22 6.5 L 21 9 L 17.5 10 L 15 9 L 14 5.5 L 15 3 L 17.5 2 Z "></path>
                            <path fill="rgb(187,187,202)" stroke="rgb(187,187,202)" stroke-width="1" opacity="0.6" d="M 8.5 7 L 10 7.5 L 6.5 10 L 8.5 7 Z "></path>
                            <path fill="rgb(187,187,202)" stroke="rgb(187,187,202)" stroke-width="1" opacity="0.6" d="M 5.5 15 L 6 16.5 L 4 17.5 L 5.5 15 Z "></path>
                            <path fill="rgb(187,187,202)" stroke="rgb(187,187,202)" stroke-width="1" opacity="0.6" d="M 16.5 16 L 17.5 18 L 16.5 16 Z "></path>
                            <path fill="rgb(250,242,231)" stroke="rgb(250,242,231)" stroke-width="1" opacity="0.9921568627450981" d="M 15.5 1 Q 21.8 -0.3 23 3.5 Q 24.3 9.8 20.5 11 Q 14.5 12.5 13 9.5 L 12 7.5 L 13 3.5 L 15.5 1 Z M 17 2 Q 13 3 14 8 Q 15 11 20 10 Q 23 9 22 5 Q 21 1 17 2 Z "></path>
                            <path fill="rgb(255,255,255)" stroke="rgb(255,255,255)" stroke-width="1" opacity="0.8196078431372549" d="M 15.5 0 Q 20.9 -0.6 23 1 Q 24.6 3.1 24 8.5 L 23 11 L 16.5 12 L 16.5 11 Q 22 12 23 8.5 Q 24.3 2.3 20.5 1 Q 14.3 -0.3 13 3.5 L 12.5 7 L 12 3.5 L 13 1 L 15.5 0 Z "></path>
                            <path fill="rgb(188,188,203)" stroke="rgb(188,188,203)" stroke-width="1" opacity="1" d="M 10.5 7 L 13 8.5 L 14.5 11 Q 17.3 10.4 16 16.5 L 19 18 L 18.5 20 L 3 20 Q 1.9 17.3 4.5 18 Q 7.5 16.5 6 10.5 L 8.5 8 L 10.5 7 Z "></path>
                            <path fill="rgb(188,188,203)" stroke="rgb(188,188,203)" stroke-width="1" opacity="1" d="M 9.5 21 L 13 21.5 L 10.5 23 L 9.5 21 Z "></path>
                        </svg>
                    </SvgIcon>
                </div>
                <div className="toolbar_username">
                    <p className="toolbar_username_text">Ganesh</p>
                    <KeyboardArrowDown className="toolbar_username_drop" />
                </div>
                <div className="toolbar_useravatar">
                    <Avatar alt="Remy Sharp" src={Image_1} />
                </div>
            </header >
            < div className="yash" >
                {/* <TextField variant="filled" value="yash  this is the watboy image , checking for overflow" className="textbox" /> */}
                {show && <textarea id="w3mission" rows="3" cols="30" className="textbox" >OHT 2 is full, please turn off the pump</textarea>
                }{/* {this.state.show &&
            
          } */}

                <CancelIcon className="icon" onClick={closewatboy}></CancelIcon>
                {show && <img src={watboy_text} width="530" height="200" onClick={imagehandler} ></img>}

            </div >
        </div>
    )
}

export default NavBar;
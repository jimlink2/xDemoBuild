import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import SignupSquare from './signupSquare.js'
import Copyright from './copyrite.js';

class Footer extends Component {

    render() {
        return (
            <div className="row py-5 text-white" id="footer-wrapper">
                <div className="col-12 footer">
                    <div className="row" id="footer-container">
                        <div className="col-10 offset-1">
                            <div className="row align-items-center" id="row1">
                                <div className="col-5 d-flex justify-content-center">
                                    <ColorBallImg />
                                </div>
                                <div className="col-2 offset-1 text-left">
                                    <span><a href="/">Home</a></span>
                                    <span><a href="/about">About</a></span>
                                    <span><a href="/terms">Terms</a></span>
                                    <span><a href="/play">Play Now</a></span>
                                </div>
                                <div className="col-2 text-center bg-primary boxBG">
                                    <SignupSquare />
                                </div>
                            </div>
                            <Copyright />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
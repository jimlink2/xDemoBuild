import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import SignupSquare from './signupSquare.js'
import Copyright from './copyrite.js';

class Footer extends Component {

    render() {
        let myColorBallImg2 = <ColorBallImg height="3em" />;
        return (
            <div className="row py-5 text-white" id="footer-wrapper">
                <div className="col-12 footer">
                    <div className="row" id="footer-container">
                        <div className="col-10 offset-1">
                            <div className="row align-items-center" id="row1">
                                <div className="col-5 d-flex justify-content-center">
                                    {myColorBallImg2}
                                </div>
                                <div className="col-6 text-right">
                                    <span><a href="/">Home</a></span>
                                    <span><a href="/about">About</a></span>
                                    <span><a href="/privacy">Policy</a></span>
                                    <span><a href="/legality">Legality</a></span>
                                    {/* <span><a href="/videoAds">Video Ads</a></span> */}
                                    {/* <span><a href="/Kiosks">Kiosks</a></span> */}
                                    {/* <span><a href="/signup">Sign Up</a></span> */}
                                    {/* <span><a href="/play">Play</a></span> */}
                                    {/* <span><a href="/advertisers">Advertisers</a></span> */}
                                    {/* <span><a href="/guys">ViewAds_Guys</a></span> */}
                                    {/* <span><a href="/gals">ViewAds_Gals</a></span> */}

                                </div>
                                {/* <div className="col-2 text-center bg-primary boxBG">
                                    <SignupSquare />
                                </div> */}
                            </div>
                            {/* <Copyright /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
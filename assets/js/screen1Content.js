import React, { Component } from "react";
import ReactPlayer from 'react-player';
import Player from '@vimeo/player';
import $ from 'jquery';
import ColorBallTxt from './colorballTxt.js';
import AdsTxt from './adsTxt.js';
import config from './config.js';
import CGATxt from './CGATxt.js';
import EDGETxt from './EDGETxt.js';
import MethodTxt from './methodTxt.js';
import ColorballQuickTxt from './colorballQuickTxt.js';


class Screen1Content extends Component {
    render() {
        return (
			            <div className="bg-white text-center">
			                <div className="col-12 kiosk_container">
                        <div>
                        <div>
                            <div id="mainDiv5" className="row">
                              <div id="leftDiv3">
                                <div id="cash_prize_div2">
                                    You can win<br />
                                    <span class="emphasis"><span class="big"> <p style={{ fontFamily: 'Arial' }}></p> $1,000.00</span></span> <br />
                                    right here at<br /><br />
                                </div>
                                <div id="store_name2">
                                   
                                </div>
                                <div id="play_five2">
                                    Every day, you get 
                                    <span class="emphasis big"> <p style={{ fontFamily: 'Arial' }}>Five Free Plays</p></span>
                                    <div id="ColorBallQuickPick4">
                                        <ColorballQuickTxt />
                                    </div>
                                </div>
                              </div>
                              <div id="rightDiv3">
                            <a href="Screen2.html">
                              <div id="tap_gently_rules2">
                                  Tap Here<br />
                                  Gently<br />
                                  For Rules
                              </div>
                            </a>
                            <a href="Screen3.html">
                              <div id="tap_gently2">
                                  Tap Here<br />
                                  Gently<br />
                                  to Start
                              </div>
                            </a>
                              <div id="chambers_div">
                                  <img src="./assets/img/MixingChambers.png" id="chambers_start2" />
                              </div>
                              </div>
                            </div>
                        </div>
			                </div>
			                </div>
			            </div>

       )
    }
}

export default Screen1Content;
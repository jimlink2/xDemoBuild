'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

function App() {
	    return (
	      <a href="Screen1.html" id="main_anchor">
	        <div className="row" id="Screen_Start">
	            <div className="col-12" style={{ background: '#FFF', height: '100%vh' }}>
			            <div className="bg-white text-center">
			                <div className="col-12 kiosk_container">
                        <div id="left_kiosk" class="kiosk_div">
                            <div class="screen_text" id="top_label_div2">
                                Kiosk
                            </div>
                            <div>
                                <img src="./assets/img/Kiosk_with_sign.png" class="kiosk_img2" id="idle_kiosk" />
                            </div>
                        </div>
                        <div>
                        <div className="kiosk_div screen_text" id="top_label_div">
                            E-Tablet Screen of Idle Kiosk
                        </div>
                        <div>
                            <div id="mainDiv" className="row">
                              <div id="leftDiv">
                                <div id="cash_prize_div">
                                    You can win<br />
                                    <span class="emphasis">$<span class="free text-GRB">1,000.00</span></span><br />
                                    here at<br /><br />
                                </div>
                                <div id="store_name">
                                   
                                </div>
                                <div id="play_five">
                                    <br />
                                    every day, you get<br />
                                    <span class="emphasis">Five </span>
                                    <span class="emphasis free text-GRB">Free </span>
                                    <span class="emphasis">Plays </span>
                                    <br />
                                    <span class="red3">C</span><span class="lime1">o</span><span class="yellow1">l</span><span class="blue2">o</span><span class="lime1">r</span><span class="blue2">b</span><span class="red3">a</span><span class="yellow1">l</span><span class="purple1">l</span>
                                    &nbsp;<span class="blue3">Q</span><span class="pink1">u</span><span class="red3">i</span><span class="lime1">c</span><span class="yellow2">k</span><span class="blue2">-</span><span class="lime1">P</span><span class="yellow1">i</span><span class="purple1">c</span><span class="blue3">k</span><span class="blue2">-</span><span class="purple1">4</span>
                                </div>

                              </div>
                            <div id="rightDiv">
                              <div id="tap_gently_rules">
                                  Tap Here<br />
                                  Gently<br />
                                  For Rules
                              </div>
                              <div id="tap_gently">
                                  Tap Here<br />
                                  Gently<br />
                                  to Start
                              </div>
                            <div>
                                <img src="./assets/img/MixingChambers.png" id="chambers_start" />
                            </div>
                            </div>
                            </div>
                        </div>
			                </div>
			                </div>
			            </div>
	            </div>
	        </div>
	      </a>
	    );
}
    
const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';
import Header from './header.js';
import MenuBar from './menuBar.js';
import Footer from './footer.js';
import AdsTxt from './adsTxt.js';
import ColorBallTxt from './colorballTxt.js';
import CGATxt from './CGATxt.js';
import MethodTxt from './methodTxt.js';

function App() {
	    return (
	        <div className="row">
	            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
	            <MenuBar />
	            <Header />
			            <div className="row bg-white">
			                <div className="col-12 kiosk_container">
                        <div id="left_kiosk" class="kiosk_div">
                            <img src="./assets/img/Kiosk.png" class="kiosk_img" />
                        </div>
                        <div id="center_column">
                          <p class="kiosk_label">WINNING NUMBERS</p>
                          <img id="item2" src="./assets/img/MixingChambers.png" class="center_img" />
                          <div id="item3">
                            <p class="kiosk_label">REWARDED VIDEO ADS</p>
                            <img src="./assets/img/CocaColaAd.png" class="center_img" />
                          </div>
                        </div>
                        <div id="right_kiosk" class="kiosk_div">
                            <img src="./assets/img/Kiosk.png" class="kiosk_img" />
                        </div>
			                </div>
			            </div>
	                <div className="row bg-white text-center">
	                    <div className="col-12" style={{ background: '#FFFFFF', height: '100%vh' }}>
	                        <div className="row bg-white text-center">
	                            <div className="col-12">
	                                <div className="row">
	                                    <div className="col-10 offset-1">
	                                        <br />
                                            <br />
	                                        <h1><font size="+5"><center><b>R.F.P. to SUPPLY KIOSKS & e-TABLETS </b> </center></font></h1>
	                                        <br />
                                            <br />
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div className="row bg-white text-justify">
	                            <div>
	                                <div className="col-12 text-left font-weight-bolder my-5 standardText">
	                                    <div className="col-10 offset-1">
                                        <p>
                                            The <ColorBallTxt /> Games & Ads Company (<CGATxt />) (<a href="http://colorball-ads.com" 
                                            target="_blank">colorball-ads.com</a>), has created a game-changing <MethodTxt /> of advertising and marketing that will 
                                            attract visitors into retail stores such as Walmart, Target and Dick's. The <MethodTxt /> will enhance conversions by giving  
                                            the visitors FIVE chances to win CA$H prizes of $1,000.00 every day while playing instant, lottery-style <ColorBallTxt /> Pick-4 games, FOR FREE, on e-tablets. In exchange for the FIVE FREE PLAYS, the visitors must fully view FIVE video ads. 
                                        <br />
                                        <br />
                                            For each complete view of a video-ad by each viewer, retailers will charge advertisers a reasonable "ad-displaying" fee.
                                        </p>    
                                        <p>    
                                            As a final hardware addition before launching the <MethodTxt />, <CGATxt /> is considering the use of free standing kiosks, similar to the images above of PYLE model PSPADLK60 floor stands and PRITOM M-10 e-tablets, that will serve as engagement stations for viewing the video ads and playing
                                            the <ColorBallTxt /> games. <CGATxt /> is publishing this RFP to invite proposals directly from manufacturers 
                                            that can provide optimized kiosks to perform the novel functions described herein and at other pages of this website.
                                        </p>
                                        <p>
                                            The proposals should include detailed software and hardware specifications for 10&quot;-12&quot; Android e-tablets that 
                                            are best suited for the <ColorBallTxt /> <MethodTxt />. Please base pricing on orders of 100, 2,500, and 10,000 units
                                        </p>
                                            <li>The e-tablets must be capable of storing three separate pools of 20 thirty-second videos. </li>
                                            <li>The e-tablets' battery life must be at least eight hours.</li>
                                            <li>The e-tablets must include Wi-Fi, LTE, and Bluetooth connectivity options.</li>
                                            <li>The e-tablets' screen resolution and durability must accomodate high-traffic retail environments.</li>
                                        <p>
                                        <br />    
                                            Requests for additional technical details or for scheduling discussions will be welcome. 
                                        </p>
                                        <p>
                                         <br />    
                                            Best regards to all members of the global kiosk manufacturing industry.
                                        </p>
                                        <p>
                                            Alan Frank, Founder, 
                                        <br />    
                                            <ColorBallTxt /> Games & Ads
                                        <br />    
                                        </p>
                                        <p>
                                            <a href="mailto:colorball923@gmail.com">alan@colorball-ads.com</a>
                                        </p>
                                      </div>
                                  </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <Footer />
	            </div>
	        </div>
	    );
}
    
const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
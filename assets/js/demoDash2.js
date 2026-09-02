import React, { Component } from "react";
import config from './config.js';

class DemoDash2 extends Component {
  
    render() {
        return (
          <div className="row">
            <div className="row">
                <div className="col-10 offset-1 text-white" id="dash_container2">
                  <div className="col-10" id="FreePlaysDiv">
                    <p id="FreePlayText">Sorry you didn't win. You can try again tomorrow.</p>
                    {/* <a href="/guys"><img id="GuysImg" src="./assets/img/GuysImage.jpg" alt="Guys Ads" /></a> */}
                    {/* <a href="/gals"><img id="GalsImg" src="./assets/img/GalsImage.jpg" alt="Gals Ads" /></a> */}
                  </div>
                  <div className="col-10" id="FreePlaysDiv2">
                    <a href="/noThanks"><img id="NoThanksImg" src="./assets/img/GoHome.jpg" alt="No Thanks" /></a>
                  </div>
                  <div className="col-10" id="TooManyBets">
                    <p id="TooManyBetsText">The playing limit is five games every 24 hours. Please try again tomorrow.</p>
                  </div>
                  <div className="col-10" id="TooManyBets2">
                    <a href="/noThanks"><img id="NoThanksImg" src="./assets/img/GoHome.jpg" alt="No Thanks" /></a>
                  </div>
                  <div className="col-11 text-white" id="top_div2">
                    <div className="row text-center" id="clock_div2">
                        <div className="col text-center" id="clock_text2">Next game starts in <span className='red1' id="countdown_clock"></span> secs.</div>
                    </div>
                    <div className="row" id="player_div2">
                        <div className="col text-center" id="player_text2">Player Info:</div>
                    </div>
                  </div>
                    <div className="row" id="interim_image">
                    </div>
                    <div className="row" id="video_container5">
                        {/* <div className="col" id="video_container">  */}
                        {/* <div id="left_kiosk" class="kiosk_div_3">
                            <img src="./assets/img/Kiosk.png" class="kiosk_img" />
                        </div> */}
                        <div id="funnel_container2">
                            <div className="row justify-content-center">
                                <div className="btn btn-primary" id="unmute">Unmute</div>
                            </div>

                            <div className='row' id='videoWinNumbers'>
                                <span className='h1' id='vid1_num_b'  style={{opacity: 0}}>0</span>
                                <span className='h1' id='vid2_num_b'  style={{opacity: 0}}>0</span>
                                <span className='h1' id='vid3_num_b'  style={{opacity: 0}}>0</span>
                                <span className='h1' id='vid4_num_b'  style={{opacity: 0}}>0</span>
                            </div>
                            <div className='row dash2row' id='vids0'>
                                <div className='col-3'>
                                    <div id='vid1' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid2' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid3' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid4' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                            </div>
                            <div className='row hidden' id='vids1'>
                                <div className='col-3'>
                                    <div id='vid5' className="d-flex justify-content-center"></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid6' className="d-flex justify-content-center"></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid7' className="d-flex justify-content-center"></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid8' className="d-flex justify-content-center"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">

                    </div>

                    <div className="col custom_input" id="selections-drawingnumber"></div>

                </div>
            </div>
            <div id="zeroTally4"></div>
            <div id="zeroTally3"></div>
          </div>
        );
    }
}

export default DemoDash2;

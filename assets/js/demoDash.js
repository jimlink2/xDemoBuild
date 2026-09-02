import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import config from './config.js';

class DemoDash extends Component {

    render() {
        return (
          <div className="row">
            <div className="row">
                <div className="col-10 offset-1 text-white" id="dash_container">
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
                  <div className="col-11 text-white" id="top_div">
                    <div className="row text-center" id="clock_div">
                        <div className="col text-center" id="clock_text">Next game starts in <span className='red1' id="countdown_clock"></span> secs.</div>
                    </div>
                    <div className="row" id="player_div">
                        <div className="col text-center" id="player_text">Player Info:</div>
                    </div>
                  </div>
                    <div className="row" id="interim_image">
                    </div>
                    <div className="row" id="video_container3">
                        {/* <div className="col" id="video_container">  */}
                        {/* <div id="left_kiosk" class="kiosk_div_3">
                            <img src="./assets/img/Kiosk.png" class="kiosk_img" />
                        </div> */}
                        <div className="" id="numpad_container">

                            <div className="row hidden">YOUR BALANCE: <span id="credit">$0</span></div>

                            <div className="row d-flex flex-row" id="numpad_pad">
                                <div id="numpad_mask"></div>
                                <div className="col">
                                  <div>
                                    <img className='numpad regularButton' numval='1' src="./assets/img/Ball1.png" />
                                    <img className='numpad regularButton' numval='2' src="./assets/img/Ball2.png" />
                                    <img className='numpad regularButton' numval='3' src="./assets/img/Ball3.png" />
                                    <img className='numpad regularButton' numval='4' src="./assets/img/Ball4.png" />
                                  </div>
                                  <div>
                                    <img className='numpad regularButton' numval='5' src="./assets/img/Ball5.png" />
                                    <img className='numpad regularButton' numval='6' src="./assets/img/Ball6.png" />
                                    <img className='numpad regularButton' numval='7' src="./assets/img/Ball7.png" />
                                    <img className='numpad regularButton' numval='8' src="./assets/img/Ball8.png" />
                                  </div>
                                  <div>
                                    <img id='numpad-delete' className='numpad btn-danger clearButton numpad-control' src="./assets/img/Ball_delete.png" />
                                    <img className='numpad regularButton' numval='9' src="./assets/img/Ball9.png" />
                                    <img className='numpad regularButton' numval='0' src="./assets/img/Ball0.png" />
                                    <img id='numpad-submit' className='numpad enterButton btn-primary numpad-control' src="./assets/img/Ball_submit.png" />
                                  </div>
                                {/* </div> */}
                                {/* <div className="col"> */}
                                {/* </div> */}
                                {/* <div className="col"> */}
                                    {/* <div className="row numpad dummy">
                                    </div> */}
                                {/* </div> */}
                                {/* <div className="col"> */}
                                    {/* <div className='numpad rightButton mt-2' numval=''>YES</div> */}
                                    {/* <div className='numpad rightButton mt-2' numval=''>NO</div> */}
                                    {/* <div className='numpad cancelButton mt-2' numval=''>CANCEL</div> */}
                                    {/* <div className='numpad helpButton mt-2'>HELP</div> */}
                                </div>
                            </div>
                        </div>
                        <div id="funnel_container">
                            <div className="row justify-content-center">
                                <div className="btn btn-primary" id="unmute">Mute</div>
                            </div>

                            <div className='row'>
                                <div className='col-3 text-center h1' id='vid1_num_b'  style={{opacity: 0}}>0</div>
                                <div className='col-3 text-center h1' id='vid2_num_b'  style={{opacity: 0}}>0</div>
                                <div className='col-3 text-center h1' id='vid3_num_b'  style={{opacity: 0}}>0</div>
                                <div className='col-3 text-center h1' id='vid4_num_b'  style={{opacity: 0}}>0</div>
                            </div>
                            <div className='row' id='vids0'>
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
                        {/* <div id="right_kiosk" class="kiosk_div_3">
                            <img src="./assets/img/Kiosk.png" class="kiosk_img" />
                        </div> */}
                    </div>

                    <div className="selected_digits" >
                        <div id="PressedText">
                            Digits selected: <span id="numpad-selection">
                            </span>
                            <div class="marquee">
                                <span id="marquee_info"></span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="row">
                        {/* <div className="col d-flex flex-column justify-content-around" id="selections-container">
                            <div className="row">
                                <div className='col text-left'>Hi, <u>Mark Z.</u> of California.</div>
                            </div>
                            <div className='row'>
                                <div className='col text-left'>ADDITIONAL SELECTION ____</div>
                                <div className='col'>
                                    <div className='row d-flex flex-row'>
                                        <div className="col" id="selection_col_1">
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_1" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_2" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_3" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_4" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                        </div>
                                        <div className="col" id="selection_col_2">
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_5" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_6" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_7" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_8" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                        </div>
                                        <div className="col" id="selection_col_3">
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_9" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_10" style={{ opacity: '0' }}>xxxx</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div id='free_plays' className='col custom_input'>You have _____ more free plays today.</div>
                            </div>
                        </div> */}

                    </div>
                    <div className="row">
                        <div className="col d-flex flex-column" id="info_container">
                            <div className="row">
                                <div className="col text-center">PLAYING DIRECTIONS......READ CAREFULLY</div>
                                <div className="temp_name">
                                  Players can create either 3-digit or 4-digit numbers by tapping the numbered keys on the keypad, and then tapping the SUBMIT button on the keypad.  The selected digits will appear in the green box above the keypad and above the mixing chambers.
                                  <br /><br />If a player submits a 4-digit number into play, and it becomes EXACTLY matched by any of the winning 4-digit numbers in the next five games, the player will win $1,000.00.  If the player submits a 3-digit number and it become EXACTLY matched by the first three digits of the of the winning numbers in the next five games, the player will win $100.00.
                                  When a win occurs, a screenshot will automatically be taken and saved until the store personnel viewes it, verifies it and pays the CA$H prize.
                                </div>
                            </div>
                            {/* <div className="row"><div className="col custom_input" id="winning_number">Winning #:</div></div>*/}

                            {/* <div className="row"><div className="col custom_input" id="submittedNum">Submitted #:</div></div>*/}

                            {/* <div className="row justify-content-center">
                                <div className="btn btn-primary" id="unmute">Unmute</div>
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" id="history_container">
                            <div className="row">
                                <div className="col text-center">PREVIOUS WINNING NUMBERS:</div>
                            </div>
                            <div className="row" id="history_row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_1">Game #001: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_2">Game #002: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_3">Game #003: YYY</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_4">Game #004: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_5">Game #005: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_6">Game #006: YYY</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_7">Game #007: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_8">Game #008: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_9">Game #009: YYY</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_10">Game #010: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_11">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_12">Game #XXX: YYY</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="history"></div>
                        </div>
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

export default DemoDash;

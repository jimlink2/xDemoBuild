import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import config from './config.js';

class DemoDash extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-10 offset-1 text-white" id="dash_container">
                    <div className="row">
                        <div className="col text-center">Time until next game: <span className='red1' id="countdown_clock">30 (seconds)</span></div>
                    </div>
                    <div className="row">
                        <div className="col" id="video_container">

                            <div className="row justify-content-center">
                                <div className="btn btn-primary" id="unmute">Unmute</div>
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
                            <div className='row'>
                                <div className='col-3 text-center h1' id='vid1_num'  style={{opacity: 0}}>0</div>
                                <div className='col-3 text-center h1' id='vid2_num'  style={{opacity: 0}}>0</div>
                                <div className='col-3 text-center h1' id='vid3_num'  style={{opacity: 0}}>0</div>
                                <div className='col-3 text-center h1' id='vid4_num'  style={{opacity: 0}}>0</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex flex-column justify-content-around" id="selections-container">
                            <div className="row">
                                <div className='col text-left'>WELCOME, <u>__MR. Sandy Claws</u>_ of_<u>__INDIA__</u>.</div>
                            </div>
                            <div className='row'>
                                <div className='col text-left'>ADDITIONAL SELECTION ____</div>
                                <div className='col'>
                                    <div className='row d-flex flex-row'>
                                        <div className="col" id="selection_col_1">
                                            {/* <div className="row">
                                                <div className="col-12 selection_row_text" id="selection_row_text_1" style={{ opacity: '0' }}>xxxx</div>
                                            </div> */}
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
                                <div id='free_plays' className='col custom_input'>YOUR ACCOUNT HAS _____ FREE EXTRA PLAYS IN IT.</div>
                            </div>
                        </div>

                        <div className="col d-flex flex-column justify-content-between" id="info_container">

                            <div className="row">
                                <div className="temp_name">
                                    PLAYING INSTRUCTIONS----
                                    Using the keypad, create your own 4-digit number. You can enter it into any one of the next <span id="remaining_selections" className="ccb_box">five</span> games, but not the current game, by clicking on the blue <span className="quotes">Submit</span> button.  If you don't click the Submit button, your number won't be entered into play.
                                </div>
                            </div>
                            <div className="row"><div className="col custom_input" id="winning_number">Winning #:</div></div>

                            <div className="row"><div className="col custom_input" id="submittedNum">Submitted #:</div></div>

                            <div className="row"><div className="col custom_input" id="selections-drawingnumber"></div></div>

                            <div className="row">
                                <div className="col custom_input" id="selection_row_text_1" style={{ opacity: '0' }}>xxxx</div>
                            </div>

                            {/* <div className="row justify-content-center">
                                <div className="btn btn-primary" id="unmute">Unmute</div>
                            </div> */}
                        </div>
                        <div className="col d-flex flex-column justify-content-between" id="numpad_container">

                            <div className="row hidden">YOUR BALANCE: <span id="credit">$0</span></div>
                            <div className="row custom_input" id="numpad-selection"></div>

                            <div className="row d-flex flex-row">
                                <div className="col">
                                    <div className='numpad mt-2' numval='1'>1</div>
                                    <div className='numpad mt-2' numval='4'>4</div>
                                    <div className='numpad mt-2' numval='7'>7</div>
                                </div>
                                <div className="col">
                                    <div className='numpad mt-2' numval='2'>2</div>
                                    <div className='numpad mt-2' numval='5'>5</div>
                                    <div className='numpad mt-2' numval='8'>8</div>
                                </div>
                                <div className="col-4">
                                    <div className='numpad mt-2' numval='3'>3</div>
                                    <div className='numpad mt-2' numval='6'>6</div>
                                    <div className='numpad mt-2' numval='9'>9</div>
                                </div>
                                <div className="col-4 offset-4">
                                    <div className='numpad mt-2' numval='0'>0</div>
                                </div>
                            </div>

                            <div className='row mt-1 justify-content-center'>
                                <div id='numpad-delete' className='numpad-control col-4 offset-0 btn-danger mt-2'>Delete</div>
                                <div id='numpad-submit' className='numpad-control col-4 offset-3 btn-primary mt-2'>Submit</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" id="history_container">
                            <div className="row">
                                <div className="col">PREVIOUS NUMBERS:</div>
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
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_4">Game #004: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_5">Game #005: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_6">Game #006: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_7">Game #007: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_8">Game #008: YYY</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_9">Game #009: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_10">Game #010: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_11">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_12">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_13">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_14">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_15">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_16">Game #XXX: YYY</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_17">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_18">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_19">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_20">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_21">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_22">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_23">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_24">Game #XXX: YYY</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_25">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_26">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_27">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_28">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_29">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_30">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_31">Game #XXX: YYY</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" id="history_drawing_32">Game #XXX: YYY</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="history"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DemoDash;
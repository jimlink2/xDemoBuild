import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import config from './config.js';

class innerStrip extends Component {

    render() {
        return (
            <div className="row innerStripBG" style={{ padding: '3em 0' }}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 offset-3">
                            <p className="h1 text-AEH" style={{ textAlign: "center" }}>
                                What's The Catch?
                            </p>
                            <p className="text-bold text-center">There really isn't one.</p>
                            {/* <p>But there are a few limitations:</p> */}
                            <p className="text-center">
                                {/* <ul>
                                    <li>You can play only 1 2-game sequence every other day.</li>
                                    <li>You’ll need to disable your ad blocker to play.</li>
                                    <li>You’ll need to give us your email address for win notifications and questionnaires.</li>
                                    <li>You’ll need to opt in to receive our questionnaires.</li>
                                </ul> */}
                                During the start-up promo, you can watch five games every
day but you can enter your favorite number into only one of them.
                            </p>
                        </div>
                        {/* <div className="col-2">
                            <img src={config.baseURL + "./assets/img/icons/unlicensed/qMark2.png"} style={{ width: '100%' }} />
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default innerStrip;
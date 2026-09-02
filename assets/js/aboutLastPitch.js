import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import config from './config.js';

class InnerLastPitch extends Component {

    render() {
        return (
            <div className="row bg-white text-center" style={{paddingTop: '3em'}}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 offset-4">
                            <img src={config.baseURL + './assets/img/icons/colorball_table.jpg'} style={{width: '100%'}} />
                        </div>
                        <div className="col-10 offset-1 bottomImageWrapper">
                            <img className="bottomImage" src={config.baseURL + "./assets/img/icons/lastPitchImg.png"} />
                            <ColorBallImg cname="bottomImageBtn" />
                            <p className="bottomImageText h2">The game that no one loses</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InnerLastPitch;
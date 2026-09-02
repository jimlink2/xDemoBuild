import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';
import config from './config.js';
import ColorBallTxt from './colorballTxt.js';

class HomeLastPitch extends Component {

    render() {
        return (
            <div className="row bg-white text-center">
                <div className="SampleAds">
                    <p class="instructionText">
                      <h3 className="instructions">
                      </h3>
                    </p>
                    <br/>
                </div>
                     {/*  <h3 className="instructions">
                      HAPPY WINNERS 
                      </h3>
                    <img id="shapeOutside5jpeg" src="./assets/img/hires/5.jpeg" class="fright" />
                    <br /><br /> */}
               {/*  <div className="col-10 offset-1 bottomImageWrapper">
                    <img className="bottomImage" src={config.baseURL + "./assets/img/icons/lastPitchImg.png"} />
                    <ColorBallImg cname="bottomImageBtn" />
                    <p className="bottomImageText h2">..</p>
                </div> */}
            </div>
        );
    }
}

export default HomeLastPitch;

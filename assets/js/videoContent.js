import React, { Component } from "react";
import ColorBallTxt from './colorballTxt.js';
import AdsTxt from './adsTxt.js';
import config from './config.js';
class VideoContent extends Component {

    render() {
        return (
            <div className="row bg-white text-center" style={{ padding: '3em 0' }}>
              <div id="VideoContainer">
                 <video id="CroppedChambers4" class="homeImage" controls autoplay loop>
                    <source type="video/mp4" src={config.baseURL + "./assets/img/Cropped-60-sec-two-mix.mp4"} />
                 </video>
              </div>
            </div>
        );
    }
}

export default VideoContent;
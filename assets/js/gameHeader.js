import React, { Component } from "react";
import config from './config.js';

class GameHeader extends Component {

    render() {
        return (
            <div className="row bg-white" style={{ background: '#fff' }}>
                <div className="col-10 offset-1">
                    <div className="row justify-content-center prelative">
                        <img className="homeImage" src={config.baseURL + "./assets/img/Facebook-ad-8.png"} />
                        <img className="homeImage" src={config.baseURL + "./assets/img/play-img.png"} />
                        <video id="FrankVideo" className="homeImage" controls>
                            <source type="video/mp4" src={config.baseURL + "./assets/img/10secondAF-3.mp4"} />
                        </video>
                        {/* <div class="col-2 pa-tr-10" style={{ position: 'absolute', top: '1%', left: '1%' }}>
                            <a href="/login"><img width="100%" src={config.baseURL + "./assets/img/icons/play.png"} /></a>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameHeader;
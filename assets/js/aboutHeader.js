import React, { Component } from "react";
import config from './config.js';

class InnerHeader extends Component {

    render() {
        return (
            <div className="row bg-white" style={{ background: '#fff' }}>
                <div className="col-10 offset-1">
                    <div className="row justify-content-center prelative">
                        <img className="homeImage" src={config.baseURL + "./assets/img/circle_3_and_4.png"} />
                        <img className="homeImage" src={config.baseURL + "./assets/img/icons/Renoir.jpg"} />
                        <video id="FrankVideo" className="homeImage" controls>
                            <source type="video/mp4" src={config.baseURL + "./assets/img/10secondAF-3.mp4"} />
                        </video>
                    </div>
                </div>
            </div>
        );
    }
}

export default InnerHeader;
import React, { Component } from "react";
import config from './config.js';

class InnerHeader extends Component {

    render() {
        return (
            <div className="row bg-light" style={{ background: '#fff' }}>
                <div className="col-10 offset-1">
                    <div className="row justify-content-center prelative">
                        <img width="100%" src={config.baseURL + "./assets/img/icons/innerHeader.jpg"} />
                        <div class="col-2 pa-tr-10" style={{ position: 'absolute', top: '1%', left: '1%' }}>
                            <a href="/login"><img width="100%" src={config.baseURL + "./assets/img/icons/play.png"} /></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InnerHeader;
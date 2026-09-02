import React, { Component } from "react";
import config from './config.js';
import LoginForm from './loginForm.js';

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class ImageWheel extends Component {

    render() {
        let user = getCookie("user");
        let showLogout = "";
        if (user.length > 0) {
            showLogout = " hidden";
        }
        return (
            <div className="row bg-light" style={{ background: '#fff' }}>
                <div className="col-6 offset-3">
                    <div className="row justify-content-center prelative">
                        <img width="100%" height="100%" src={config.baseURL + "./assets/img/hires/7_reversed.jpeg"} />
                        <div class="col-4 pa-bl-10" style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                            <a href="/play"><img width="100%" src={config.baseURL + "./assets/img/icons/play_big.png"} /></a>
                        </div>
                        <div class="col-2 pa-tr-10" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                            <a href="/play"><img width="100%" src={config.baseURL + "./assets/img/icons/play.png"} /></a>
                        </div>
                    </div>
                </div>
                <div className={"col-3" + showLogout}>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default ImageWheel;

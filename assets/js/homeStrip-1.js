import React, { Component } from "react";
import SignupSquare from './signupSquare.js'
import config from './config.js';

class HomeStrip extends Component {

    render() {
        return (
            <div className="row bg-blue temp-bg text-center text-white py-5" style={{ position: 'relative' }}>
                <div className="col-10 offset-1" style={{ position: 'absolute', bottom: '0px', opacity: '0' }}>
                    <img src={config.baseURL + "./assets/img/icons/ppl.png"} width='70%' />
                </div>
                <div className="col-10 offset-1">
                    <div className="row align-items-center">
                        <div className="col-3 offset-3">
                            <span className="underlined">When you sign up, please provide a nickname, your city's name, your email address
                            <br />
                            and an 8-digit ID number to protect your identity and your prize money.</span>
                            <br /><br />
                            Playing is fun, it's free, and there’s
                            <br />
                            nothing to lose.
                        </div>
                        <div className="col-2 offset-1">
                            <SignupSquare cname="grey" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeStrip;
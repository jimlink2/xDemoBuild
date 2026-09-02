import React, { Component } from "react";
//import SignupSquare from './signupSquare.js'
import config from './config.js';

class HomeStrip extends Component {

    render() {
        return (
            <div className="row bg-blue temp-bg text-left text-white py-5" id="signupDiv" style={{ position: 'relative' }}>
                <div className="col-11 offset-1" id="signupDetail">
                    <div className="row align-items-left">
                        <div className="col-8 offset-2">
                            To play a demo, please text:
                            <br />
                            your first name only to:
                            <br />
                            304-504-3104.
                            <br />
                            <br /><br />
                            CONTACT:
                            <br />
                            support@colorballnumbers.com
                        </div>
                    </div>
                </div>
                {/* <div className="col-11 offset-1">
                    <div className="row align-items-right">
                        <div className="col-7 offset-3">
                            <SignupSquare cname="grey" />
                        </div>
                    </div>
                </div>--> */}
            </div>
        );
    }
}

export default HomeStrip;
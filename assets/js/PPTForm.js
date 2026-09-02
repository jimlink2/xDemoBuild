import React, { Component } from "react";
//import Greeting from "./greeting";
import config from './config.js';


class PPTForm extends Component {


    render() {
        const path = window.location.pathname;
        let tempStyle = { paddingTop: 'initial' };
        // if (path === '/login') {
        //     tempStyle = { paddingTop: '50px' };
        // }

        return (
            <div className="row innerStripBG" style={tempStyle}>
                <div id="vimeoDiv" className="col-12">
                    <a id="vimeoLink" href="https://vimeo.com/912629514?share=copy" target="_blank">THE&nbsp;&nbsp;COLORBALL&nbsp;&nbsp;STORY</a>
                </div>
            </div>

        );
    }

}

export default PPTForm;

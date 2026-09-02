import React, { Component } from "react";
import config from './config.js'

class ColorBallTxt extends Component {
    constructor(props) {
        super(props);
        // this.special = 'david';
        this.height = 'auto';
        this.cname = '';
        // if (props.special) {
        //     this.special = props.special;
        // }
        if (props.height) {
            this.height = props.height;
        }
        if (props.cname) {
            this.cname = props.cname
        }
    }
    render() {
        return (<span className="text-GRB"><span className="red1">C</span><span className="blue1">O</span><span className="yellow1">L</span><span className="blue2">O</span><span className="green1">R</span><span className="blue3">B</span><span className="red2">A</span><span className="yellow1">L</span><span className="green2">L</span></span>);
    }
}

export default ColorBallTxt;
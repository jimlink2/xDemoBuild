import React, { Component } from "react";
import config from './config.js'

class MethodTxt extends Component {
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
        return (<span className="text-GRB"><span className="purple1">M</span><span className="red1">E</span><span className="lime1">T</span><span className="blue3">H</span><span className="yellow2">O</span><span className="purple1">D</span></span>);
    }
}

export default MethodTxt;
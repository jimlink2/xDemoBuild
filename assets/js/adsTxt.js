import React, { Component } from "react";
import config from './config.js'

class AdsTxt extends Component {
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
        return (<span className="text-GRB"><span className="blue3">A</span><span className="green1">d</span><span className="red1">s</span></span>);
    }
}

export default AdsTxt;
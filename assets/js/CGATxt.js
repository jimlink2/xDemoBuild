import React, { Component } from "react";
import config from './config.js'

class CGATxt extends Component {
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
        return (<span className="text-GRB"><span className="red1">C</span><span className="green1">G</span><span className="blue1">A</span></span>);
    }
}

export default CGATxt;
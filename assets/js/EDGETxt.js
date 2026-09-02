import React, { Component } from "react";
import config from './config.js'

class EDGETxt extends Component {
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
        return (<span className="text-GRB"><span className="red3">E.</span><span className="blue3">D.</span><span className="lime1">G.</span><span className="red4">E.</span></span>);
    }
}

export default EDGETxt;
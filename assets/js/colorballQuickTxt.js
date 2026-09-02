import React, { Component } from "react";
import config from './config.js'

class ColorballQuickTxt extends Component {
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
        return (<span><span class="red3">C</span><span class="lime1">o</span><span class="yellow1">l</span><span class="blue2">o</span><span class="lime1">r</span><span class="blue2">b</span><span class="red3">a</span><span class="yellow1">l</span><span class="purple1">l</span> <span class="blue3">Q</span><span class="pink1">u</span><span class="red3">i</span><span class="lime1">c</span><span class="yellow2">k</span><span class="blue2">-</span><span class="lime1">P</span><span class="yellow1">i</span><span class="purple1">c</span><span class="blue3">k</span><span class="blue2">-</span><span class="purple1">4</span></span>);
    }
}

export default ColorballQuickTxt;
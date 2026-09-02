import React, {Component} from "react";
import config from './config.js'

class ColorBallImg extends Component {
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
    render (){
    return(<a href="#" className={this.cname}><img style={{height: this.height}} className="image-box-image-new colorball-img"
        src={config.baseURL + "./assets/img/icons/logo.png"} /></a>);
}
}

export default ColorBallImg;
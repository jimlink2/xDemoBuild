import React, { Component } from "react";
//import Vimeo from '@u-wave/react-vimeo';
import ColorBallTxt from './colorballTxt.js';
class adContent extends Component {

    render() {
        return (
            /*<Vimeo
                video="https://vimeo.com/786686779"
                autoplay
            
            /> */

            <><iframe src="https://player.vimeo.com/video/786686779?h=15d784d8bd&autoplay=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><p><a href="https://vimeo.com/786686779">AF + BALLS-VEED</a> from <a href="https://vimeo.com/user37512928">Alan Frank</a> on <a href="https://vimeo.com">Vimeo</a>.</p></>
        );
    }
}

export default adContent;
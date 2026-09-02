'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import ColorBallTxt from './colorballTxt.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{background:'#FFFFFF', height:'100%vh'}}>
                <Header />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);import React, { Component } from "react";
class legality extends Component {

    render() {
        return (
            <div className="row innerStripBG" style={{ padding: '3em 0' }}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 offset-3">
                                <div className="text-left"/>
                                <h1><font size="+5"><center><ColorBallTxt /> LEGALITY</center></font></h1>
                                <br></br>
                                <img src="./assets/img/icons/Legality scrabble.jpg" alt="Legality" title="Legality" id="Legality_img" />
                                <h2><font size="+4"><center>CERTIFICATION</center></font></h2>
                                <p>The legal experts of the HomeBingo Network, Inc, and its <ColorBallTxt /> divisions have conducted a thorough search, investigation and study of the laws and regulations of each of the states of the U.S.A. and its territories, and each province of Canada and of England. The legal experts have determined that the free-play <ColorBallTxt /> Pick-4 number guessing games of this website comply fully with said laws and regulations. </p> <br></br>
                                <p>An alphabetical list of the applicable laws of all states and provinces of the U.S.A., Canada and England and other countries can be viewed at: <a href="/Gambling%20law%20compilation-USA-CANADA-ENGLAND-OTHERS.pdf" target="_blank">Compilation of gambling laws</a> </p>
                                <br></br>
                                <p>Based upon said search, investigation and study, <ColorBallTxt /> assures and guarantees all registrants, players, ad-viewers, advertisers, browser sponsors and contractors that the <ColorBallTxt /> Pick-4 number guessing games and the policy of this website comply completely with all of said laws and regulations and will continue complying forever.</p>
                                <br></br>
                                <h2><font size="+4"><center>CONTACT</center></font></h2>
                                <p>For more information, contact: <a href="mailto:support@colorballnumbers.com">support@colorballnumbers.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default legality;
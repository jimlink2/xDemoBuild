'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import AboutHeader from './aboutHeader.js';
import AboutContent from './aboutContent.js';
import AboutStrip from './aboutStrip.js';
import AboutLastPitch from './aboutLastPitch.js';
import GameHeader from './gameHeader.js';
import Footer from './footer.js';
import React from "react";
import ReactDOM from 'react-dom';


function App() {
    return (
        <div className="row">
            <div className="col-12" style={{background:'#004283', height:'100%vh'}}>
                <MenuBar />
                <Header />
                <GameHeader />
                <AboutContent />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
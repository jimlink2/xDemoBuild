'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import Header from './header.js';
import MenuBar from './menuBar.js';
// import ColorBallImg from './colorballImg.js';
import ImageWheel from './imageWheel.js';
import AnswerContent from './answerContent.js';
//import HomeStrip from './homeStrip.js';

import Footer from './footer.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <AnswerContent />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);

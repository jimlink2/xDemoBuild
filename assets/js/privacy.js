'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import GameHeader from './gameHeader.js';
import PrivacyHeader from './privacyHeader.js';
import PrivacyContent from './privacyContent.js';
import Footer from './footer.js';
import React from "react";
import ReactDOM from 'react-dom';


function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <PrivacyHeader />
                <PrivacyContent />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
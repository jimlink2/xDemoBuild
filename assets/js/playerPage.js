'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import PlayerContent from './playerContent.js';
import React from "react";
import ReactDOM from 'react-dom';


function App() {
    return (
        <div className="row">
            <div className="col-12" style={{height:'100%vh'}}>
                <MenuBar />
                <Header />
                <PlayerContent />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import Screen4Content from './screen4Content.js';
import Footer from './footer.js';
import CGATxt from './CGATxt.js';
import EDGETxt from './EDGETxt.js';
import AdsTxt from './adsTxt.js';
import MethodTxt from './methodTxt.js';

import React from "react";
import ReactDOM from 'react-dom';

//var sessionstorage = require('sessionstorage');
//let videoStuff = sessionstorage.getItem("videoList");
//console.log('videoStuff A is ' + videoStuff);

function App() {
    //const queryParameters = new URLSearchParams(window.location.search);
    //const lastFour = queryParameters.get('lastFour');
    //const faveNums = queryParameters.get('faveNums');
    //const pronoun = queryParameters.get('pronoun');
    return (
        <div className="row">
          <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
             <Screen4Content />
          </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
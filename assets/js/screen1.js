'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import Screen1Content from './screen1Content.js';
import Footer from './footer.js';
import CGATxt from './CGATxt.js';
import EDGETxt from './EDGETxt.js';
import AdsTxt from './adsTxt.js';
import MethodTxt from './methodTxt.js';

import React from "react";
import ReactDOM from 'react-dom';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <Screen1Content />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
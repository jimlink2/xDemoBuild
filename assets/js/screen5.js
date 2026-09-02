'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import DemoDash2 from './demoDash2.js';

function App() {

    const params = new URLSearchParams(window.location.search);
    const user = params.get("user") || "";
    const incr       = Number(params.get("incr") || 0);
    const store      = params.get("store")   || "";
    const lastFour   = params.get("lastFour")   || "";
    const pronoun    = params.get("pronoun")    || "";
    let phonePlays   = Number(params.get("phonePlays") || 0);
    const faveNums   = params.get("faveNums")   || "";
    let   lastReset  = Number(params.get("lastReset") || 0);
    let   playsRaw   = params.get("plays") || "";
    
    return (
        <div className="row">
            <div id="top_div"></div>
            <div id="clock_text"></div>
            <div className="col-12" style={{height:'100%vh'}}>
                <DemoDash2 isDemo={user === 'demo'} />
            </div>
        </div>
    );
}

const renderObject = <App />;
const domContainer = document.querySelector('#container');
ReactDOM.render(renderObject, domContainer);

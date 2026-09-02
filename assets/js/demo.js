'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import Header from './header.js';
import MenuBar from './menuBar.js';
import DemoDash from './demoDash.js'

import Footer from './footer.js';

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let user = decodeURI(getCookie("user"));
console.log(`the user is: `, user);

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{background:'#004283', height:'100%vh'}}>
                <MenuBar />
                <Header />
                <DemoDash isDemo={user === 'demo'}/>
                <Footer />
            </div>
        </div>
    );
}


console.log(`$$$$ window headers: `, user);
const renderObject = <App />;
const domContainer = document.querySelector('#container');
ReactDOM.render(renderObject, domContainer);
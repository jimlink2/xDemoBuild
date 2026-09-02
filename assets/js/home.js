'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import Header from './header.js';
import MenuBar from './menuBar.js';
// import ColorBallImg from './colorballImg.js';
import ImageWheel from './imageWheel.js';
import HomeContent from './homeContent.js';
//import HomeStrip from './homeStrip.js';
import HomeLastPitch from './homeLastPitch.js';

import Footer from './footer.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <HomeContent />
                <HomeLastPitch />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);

//document.getElementById("submit").addEventListener("click", async function (event) {
//    event.preventDefault();
//    let user = document.getElementById('user').value;
//    let pass = document.getElementById("pass").value;
//    console.log('In home.js: user is ' + user + ' and pass is ' + pass);
//    if(!user || user === '' || user === null || user === undefined) user = 'demo';
//    if(!pass || pass === '' || pass === null || pass === undefined) pass = 'demo';
//    const msgUint8 = new TextEncoder().encode(pass);
//    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
//    const hashArray = Array.from(new Uint8Array(hashBuffer));
//    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//    //alert("yo");
//    $('#ghost_user').val(user);
//    $('#ghost_pass').val(hashHex);
//    $('#ghost').trigger('submit');
//});
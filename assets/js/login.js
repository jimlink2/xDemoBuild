'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import Header from './header.js';
import MenuBar from './menuBar.js';
import LoginForm from './loginForm.js';

import Footer from './footer.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <LoginForm />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);

// document.getElementById("submit").addEventListener("click", async function (event) {
//     event.preventDefault();
//     const user = document.getElementById('user').value;
//     const pass = document.getElementById("pass").value;
//     const msgUint8 = new TextEncoder().encode(pass);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     // alert("yo");
//     $('#ghost_user').val(user);
//     $('#ghost_pass').val(hashHex);
//     $('#ghost').trigger('submit');
// });

// document.getElementById("submit").addEventListener("click", async function (event) {
//     event.preventDefault();
//     // alert('heyo');
//     let user = document.getElementById('user').value;
//     let pass = document.getElementById("pass").value;
//     if(!user || user === '' || user === null || user === undefined) user = 'demo';
//     if(!pass || pass === '' || pass === null || pass === undefined) pass = 'demo';
//     const msgUint8 = new TextEncoder().encode(pass);
//     console.log('1');
//     const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
//     // console.log(`hashBuffer: ${hashBuffer}`);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     // console.log("login fool");
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     $('#ghost_user').val(user);
//     $('#ghost_pass').val(hashHex);
//     // $('#ghost').submit();
//     $('#ghost').trigger('submit');
//     // document.forms['ghost'].requestSubmit();
//     // return false;
// });
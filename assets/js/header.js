import React, { Component } from "react";
import ColorBallImg from './colorballImg.js';

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

function parseJSON (json_string) {
  var json_stuff = JSON.parse(json_string);
  return json_stuff;
}

function stringifyJSON (json_data) {
  var json_stuff = JSON.stringify(json_data);
  return json_stuff;
}

window.addEventListener("beforeunload", function() {
    navigator.sendBeacon("/analytics");
});

function getPath() {
    return window.location.pathname;
}

class Header extends Component {

    render() {
        let showSpecialView = getCookie("showSpecialView");
        // console.log('showSpecialView: ', showSpecialView);
        if (showSpecialView == 1) {
            // console.log('exit!!!');
            return (<div className="row">
                <div className="col-12 headerBar fixed-top" id="headerBar">
                    <a className="nav-link" href="/logout">Logout</a>
                </div>
            </div>);
        }
        let user = decodeURI(getCookie("user"));
        let uvi = decodeURI(getCookie("uvi"));
        let access = decodeURI(getCookie("access"));
        if (uvi == 0 || uvi == null || uvi == '') {
          let uvi = parseJSON(window.localStorage.getItem("uvi"));
        }
        console.log('uvi in header is ' + uvi);
        if (uvi != 0 && uvi != null && uvi != '') {
          /* Let's store the uvi in local storage: */
          console.log('Storing uvi in localStorage...');
          window.localStorage.setItem('uvi', stringifyJSON(uvi));
        } else {
          /* Let's see if uvi is IN localStorage already... */
          console.log('Getting uvi from localStorage...');
          let uvi = parseJSON(window.localStorage.getItem("uvi"));
        }
        console.log('uvi (b) in header is ' + uvi);
        let showLogout = "";
        let showLogin = "";
        let showPlayerStuff = "";
        console.log('user in header is ' + user);
        if (user.length === 0 && (uvi == 0 || typeof uvi == "undefined")) {
            showLogout = " hidden";
            showLogin = " visible";
            //showLogin = " hidden";
        } else {
            //showLogout = "";
            //showLogout = " hidden";
            showLogout = " visible";
            showLogin = " hidden";
        }

        console.log('user.length: ' + user.length);
        console.log('access: #' + access + '#');

        if (user.length === 0 || typeof access == "undefined" || access == '' || access < 8 ) {
            showPlayerStuff = " hidden";
        } else {
            showPlayerStuff = " visible";
        }
//        if (uvi != 0 && uvi != null && uvi != '') {
//        }
        let pathName = getPath();
        let activeHome = '';
        let activeAbout = '';
        let activeSignup = '';
        let activePlayNow = '';
        let activeTerms = '';
        let activePrivacy = '';
        let activeLegality = '';
        let activeAdvertisers = '';
        let activeGuys = '';
        let activeGals = '';
        let activeLogin = '';
        let activeVideoAds = '';
        let activeKiosks = '';
        if (pathName === '/about') {
            activeAbout = ' active';
        } else if (pathName === '/play') {
            activePlayNow = ' active';
        } else if (pathName === '/signup') {
            activeSignup = ' active';
        } else if (pathName === '/privacy') {
            activePrivacy = ' active';
        } else if (pathName === '/legality') {
            activeLegality = ' active';
        } else if (pathName === '/guys') {
            activeGuys = ' active';
        } else if (pathName === '/gals') {
            activeGals = ' active';
        } else if (pathName === '/login') {
            activeLogin = ' active';
        } else if (pathName === '/advertisers') {
            activeAdvertisers = ' active';
        } else if (pathName === '/videoAds') {
            activeVideoAds = ' active';
        } else if (pathName === '/Kiosks') {
            activeKiosks = ' active';
        } else if (pathName === '/') {
            activeHome = ' active';
        }
        let myColorBallImg = <ColorBallImg height="2.4em" />;
        return (
            <div className="row">
                <div className="col-12 headerBar fixed-top" id="headerBar">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    {/* <div className="row justify-content-center">
                        <div className="btn btn-primary" id="unmute">Unmute</div>
                    </div> */}
                    {myColorBallImg}
                    <button id="hamburger" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span id="hamburger2" className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContentLargeScreen">
                    <ul className="navbar-nav">
                        <li className={"nav-item" + activeHome}>
                            <a className="nav-link" href="/home">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className={"nav-item" + activeAbout}>
                            <a className="nav-link" href="/about">About</a>
                        </li>

                        {/* <li className={"nav-item" + activePlayNow}>
                            <a className="nav-link" href="/play">Play</a>
                        </li> */}
                        <li className={"nav-item" + activePrivacy}>
                            <a className="nav-link" href="/privacy">Policy</a>
                        </li>
                        <li className={"nav-item" + activeLegality}>
                            <a className="nav-link" href="/legality">Legality</a>
                        </li>
                        {/* 
                        <li className={"nav-item" + activeVideoAds}>
                            <a className="nav-link" href="/videoAds">Video Ads</a>
                        </li>
                        <li className={"nav-item" + activeKiosks}>
                            <a className="nav-link" href="/Kiosks">Kiosks</a>
                        </li>
                        */}
                        <li className={"nav-item" + activeSignup}>
                            <a className="nav-link" href="/signup">...</a>
                        </li> {/* <li className={"nav-item" + activeAdvertisers}>
                            <a className="nav-link" href="/advertisers">Advertisers</a>
                        </li> */}
                        {/* <li className={"nav-item" + activeGuys}>
                            <a className="nav-link" href="/guys">ViewAds_Guys</a>
                        </li> */}
                        {/* <li className={"nav-item" + activeGals}>
                            <a className="nav-link" href="/gals">ViewAds_Gals</a>
                        </li>
                        <li className={"nav-item" + showLogout}>
                            <a className="nav-link" href={"/logout?uvi=" + uvi}>Logout</a>
                        </li> */}
                        <li className={"nav-item" + showLogin + activeLogin}>
                            <a className="nav-link" href={"/login"}>...</a>
                        </li>
                        <li className={"nav-item" + showPlayerStuff}>
                            <a className="nav-link" href={"/playerGet"}>...</a>
                        </li>
                        {/* <li className="nav-item nav-link">{user}</li>> */}
                    </ul>
                </div>
                    </nav>
                </div>
                <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className={"nav-item" + activeHome}>
                            <a className="nav-link" href="/home">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className={"nav-item" + activeAbout}>
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className={"nav-item" + activeSignup}>
                            <a className="nav-link" href="/signup">...</a>
                        </li>
                        {/* <li className={"nav-item" + activePlayNow}>
                            <a className="nav-link" href="/play">Play</a>
                        </li> */}
                        <li className={"nav-item" + activePrivacy}>
                            <a className="nav-link" href="/privacy">Policy</a>
                        </li>
                        <li className={"nav-item" + activeLegality}>
                            <a className="nav-link" href="/legality">Legality</a>
                        </li>
                        {/* <li className={"nav-item" + activeVideoAds}>
                            <a className="nav-link" href="/videoAds">Video Ads</a>
                        </li>
                        <li className={"nav-item" + activeKiosks}>
                            <a className="nav-link" href="/Kiosks">Kiosks</a>
                        </li>*/}
                        {/* <li className={"nav-item" + activeAdvertisers}>
                            <a className="nav-link" href="/advertisers">Advertisers</a>
                        </li> */}
                        {/* <li className={"nav-item" + activeGuys}>
                            <a className="nav-link" href="/guys">ViewAds_Guys</a>
                        </li> */}
                        {/* <li className={"nav-item" + activeGals}>
                            <a className="nav-link" href="/gals">ViewAds_Gals</a>
                        </li>
                        <li className={"nav-item" + showLogout}>
                            <a className="nav-link" href={"/logout?uvi=" + uvi}>Logout</a>
                        </li> */}
                        <li className={"nav-item" + showLogin + activeLogin}>
                            <a className="nav-link" href={"/login"}>...</a>
                        </li>
                        <li className={"nav-item" + showPlayerStuff}>
                            <a className="nav-link" href={"/playerGet"}>...</a>
                        </li>
                        {/* <li className="nav-item nav-link">{user}</li> */}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
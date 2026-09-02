'use strict';
import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';
import Header from './header.js';
import MenuBar from './menuBar.js';
import Footer from './footer.js';
import AdsTxt from './adsTxt.js';
import ColorBallTxt from './colorballTxt.js';
import MethodTxt from './methodTxt.js';

function App() {
    var click1Ready = false;
    var click1Clicked = false;
    var click2Ready = false;
    var click2Clicked = false;
    var click3Ready = false;
    var click3Clicked = false;
    var click4Ready = false;
    var click4Clicked = false;
    var click5Ready = false;
    var click5Clicked = false;
    var click6Ready = false;
    var click6Clicked = false;
    var click7Ready = false;
    var click7Clicked = false;
    var click8Ready = false;
    var click8Clicked = false;
    var gender = 'unknown';
    var keepGoing = true;

    const reportGender = () => {
      console.log('Getting gender...');
	    if (httpRequest2.readyState === XMLHttpRequest.DONE) {
	        console.log('httpRequest2.status in reportGender: ', httpRequest2.status);
	        if (httpRequest2.status === 200) {
	            console.log('received response in reportGender');
	            let data = JSON.parse(httpRequest2.responseText);
	            console.log('data in reportGender:');
	            for (let x in data) {
	            	console.log('x: ' + x + ' -- ' + data[x]);
	            }
	            gender = data['gender'];
	            console.log('gender: ' + gender + ' in reportGender()');
	        } else {
	            console.log('There was a problem with the GENDER request.');
	        }
	    }
    }
    
    const httpRequest2 = new XMLHttpRequest();
    httpRequest2.onreadystatechange = reportGender;
    httpRequest2.open('POST', 'gender');
    httpRequest2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest2.send();

    const reportCreditAdd = () => {
      console.log('Free plays added!');
      //document.getElementById("addTime").style.backgroundColor = 'pink';
      document.getElementById("addTime").disabled = true;
      document.getElementById("addTime").style.visibility = 'hidden';
      if (click1Ready) { click1Clicked = true };
      if (click2Ready) { click2Clicked = true };
      if (click3Ready) { click3Clicked = true };
      if (click4Ready) { click4Clicked = true };
    }
    
    const addTime = () => {
      console.log('Adding free plays!');
      const httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = reportCreditAdd;
      httpRequest.open('POST', 'credit_add');
      httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      httpRequest.send();
    }

    const checkState = (info) => {
      console.log(info);
      if (info['played'] >= 0.20 && info['played'] <= 0.25) {
      	document.getElementById("ClickYes").style.visibility = 'visible';
        if (click1Clicked == false) {
          document.getElementById("addTime").style.backgroundColor = 'transparent';
          document.getElementById("addTime").style.border = '3px solid red';
          document.getElementById("addTime").disabled = false;
          document.getElementById("addTime").style.visibility = 'visible';
          document.getElementById("addTime").innerHTML = '&nbsp;';
          click1Ready = true;
        } else {
          document.getElementById("addTime").style.backgroundColor = 'green';
          document.getElementById("addTime").style.border = 'none';
          document.getElementById("addTime").style.color = 'white';
          document.getElementById("addTime").disabled = true;
          document.getElementById("addTime").innerHTML = 'Clicked!';
          document.getElementById("addTime").style.visibility = 'visible';
        }
      } else if (info['played'] >= 0.45 && info['played'] <= 0.50) {
      	document.getElementById("ClickYes").style.visibility = 'visible';
        if (click2Clicked == false) {
          document.getElementById("addTime").style.backgroundColor = 'transparent';
          document.getElementById("addTime").style.border = '3px solid red';
          document.getElementById("addTime").disabled = false;
          document.getElementById("addTime").style.visibility = 'visible';
          document.getElementById("addTime").innerHTML = '&nbsp;';
          click2Ready = true;
        } else {
          document.getElementById("addTime").style.backgroundColor = 'green';
          document.getElementById("addTime").style.border = 'none';
          document.getElementById("addTime").style.color = 'white';
          document.getElementById("addTime").disabled = true;
          document.getElementById("addTime").innerHTML = 'Clicked!';
          document.getElementById("addTime").style.visibility = 'visible';
        }
      }
      else if (info['played'] >= 0.70 && info['played'] <= 0.75) {
      	document.getElementById("ClickYes").style.visibility = 'visible';
        if (click3Clicked == false) {
          document.getElementById("addTime").style.backgroundColor = 'transparent';
          document.getElementById("addTime").style.border = '3px solid red';
          document.getElementById("addTime").disabled = false;
          document.getElementById("addTime").style.visibility = 'visible';
          document.getElementById("addTime").innerHTML = '&nbsp;';
          click3Ready = true;
        } else {
          document.getElementById("addTime").style.backgroundColor = 'green';
          document.getElementById("addTime").style.border = 'none';
          document.getElementById("addTime").style.color = 'white';
          document.getElementById("addTime").disabled = true;
          document.getElementById("addTime").innerHTML = 'Clicked!';
          document.getElementById("addTime").style.visibility = 'visible';
        }
      }
      else if (info['played'] >= 0.95 && info['played'] <= 0.99) {
      	document.getElementById("ClickYes").style.visibility = 'visible';
        if (click4Clicked == false) {
          document.getElementById("addTime").style.backgroundColor = 'transparent';
          document.getElementById("addTime").style.border = '3px solid red';
          document.getElementById("addTime").disabled = false;
          document.getElementById("addTime").style.visibility = 'visible';
          document.getElementById("addTime").innerHTML = '&nbsp;';
          click4Ready = true;
        } else {
          document.getElementById("addTime").style.backgroundColor = 'green';
          document.getElementById("addTime").style.border = 'none';
          document.getElementById("addTime").style.color = 'white';
          document.getElementById("addTime").disabled = true;
          document.getElementById("addTime").innerHTML = 'Clicked!';
          document.getElementById("addTime").style.visibility = 'visible';
        }
      }
      else {
      	document.getElementById("ClickYes").style.visibility = 'hidden';
        document.getElementById("addTime").style.backgroundColor = 'transparent';
        document.getElementById("addTime").disabled = true;
        document.getElementById("addTime").innerText = '';
        document.getElementById("addTime").style.border = 'none';
      }
    }
    
  //while (keepGoing) {
    //if (gender == 'unknown') {
      //null
    //} else 
    if (gender == 'Mr.' || gender == '' || gender == null) {
		  console.log('Returning MALE video...');
		  keepGoing = false;
	    return (
	        <div className="row">
	            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
	            <MenuBar />
	            <Header />
			            <div className="row bg-white" style={{ background: '#fff' }}>
			                <div className="col-12">
			                    <div className="row justify-content-center prelative">
			                        <img className="homeImage" src="./assets/img/Facebook-ad-8.png" />
			                    </div>
			                </div>
			            </div>
	                <div className="row bg-white text-center">
	                    <div className="col-12" style={{ background: '#FFFFFF', height: '100%vh' }}>
	                        <div className="row bg-white text-center" style={{ padding: '3em 0' }}>
	                            <div className="col-12">
	                                <div className="row">
	                                    <div className="col-10 offset-1 textTap3">
	                                        <h1><font size="+5"><center><b> COLORBALL VIDEO ADS </b> </center></font></h1>
	                                    </div>
	                                </div>
							                  <div>
							                      <div id="ClickYes" style={{ visibility: 'hidden' }}>
							                          Click the words: "Click for Free Play"
							                      </div>
													          <div id="reactPlayer1">
													             <button id="addTime" onClick={addTime} style={{ visibility: 'hidden' }}></button>
                                       <ReactPlayer
                                             class="video_frame"
                                             width="1950" height="1200"
                                             url="https://vimeo.com/873317969" controls={true} playsinline={true}
                                             onPlay={() => console.log('video is playing')}
                                             onPause={() => console.log('video is paused')}
                                             onProgress={(state) => {
                                                checkState(state);
                                             }}
                                             vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
                                        />
													          </div>
							                  </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <Footer />
	            </div>
	        </div>
	    );
    } else if (gender == 'Ms.') {
      console.log('Returning FEMALE video...');
		  keepGoing = false;
	    return (
	        <div className="row">
	            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
	            <MenuBar />
	            <Header />
			            <div className="row bg-white" style={{ background: '#fff' }}>
			                <div className="col-12">
			                    <div className="row justify-content-center prelative">
			                        <img className="homeImage" src="./assets/img/Facebook-ad-8.png" />
			                    </div>
			                </div>
			            </div>
	                <div className="row bg-white text-center">
	                    <div className="col-12" style={{ background: '#FFFFFF', height: '100%vh' }}>
	                        <div className="row bg-white text-center" style={{ padding: '3em 0' }}>
	                            <div className="col-12">
	                                <div className="row">
	                                    <div className="col-10 offset-1 textTap3">
	                                        <h1><font size="+5"><center><b> COLORBALL VIDEO ADS </b> </center></font></h1>
	                                    </div>
	                                </div>
							                  <div>
							                      <div id="ClickYes" style={{ visibility: 'hidden' }}>
							                          Click for Free Play
							                      </div>
													          <div id="reactPlayer1">
													             <button id="addTime" onClick={addTime} style={{ visibility: 'hidden' }}></button>
                                       <ReactPlayer
                                             class="video_frame"
                                             width="1950" height="1200"
                                             url="https://vimeo.com/871172050" controls={true} playsinline={true}
                                             onPlay={() => console.log('video is playing')}
                                             onPause={() => console.log('video is paused')}
                                             onProgress={(state) => {
                                                checkState(state);
                                             }}
                                             vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
                                        />
													          </div>
							                  </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <Footer />
	            </div>
	        </div>
	    );
    } else {
      console.log('Returning MALE video 2...');
		  keepGoing = false;
	    return (
	        <div className="row">
	            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
	            <MenuBar />
	            <Header />
			            <div className="row bg-white" style={{ background: '#fff' }}>
			                <div className="col-12">
			                    <div className="row justify-content-center prelative">
			                        <img className="homeImage" src="./assets/img/Facebook-ad-8.png" />
			                    </div>
			                </div>
			            </div>
	                <div className="row bg-white text-center">
	                    <div className="col-12" style={{ background: '#FFFFFF', height: '100%vh' }}>
	                        <div className="row bg-white text-center" style={{ padding: '3em 0' }}>
	                            <div className="col-12">
	                                <div className="row">
	                                    <div className="col-10 offset-1 textTap3">
	                                        <h1><font size="+5"><center><b> COLORBALL VIDEO ADS </b> </center></font></h1>
	                                    </div>
	                                </div>
							                  <div>
							                      <div id="ClickYes" style={{ visibility: 'hidden' }}>
							                          Click for Free Play
							                      </div>
													          <div id="reactPlayer1">
													             <button id="addTime" onClick={addTime} style={{ visibility: 'hidden' }}></button>
                                       <ReactPlayer
                                             class="video_frame"
                                             width="1950" height="1200"
                                             url="https://vimeo.com/873317969" controls={true} playsinline={true}
                                             onPlay={() => console.log('video is playing')}
                                             onPause={() => console.log('video is paused')}
                                             onProgress={(state) => {
                                                checkState(state);
                                             }}
                                             vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
                                        />
													          </div>
							                  </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <Footer />
	            </div>
	        </div>
	    );
    }
  //}
    
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

function GalsContent() {
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

    const addTime = () => {
      console.log('Adding free plays!');
      const httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = reportCreditAdd;
      httpRequest.open('POST', 'credit_add');
      httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      httpRequest.send();
    }
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
    const reportCreditAdd2 = () => {
      console.log('Free plays added 2!');
      if (click5Ready) { click5Clicked = true };
      if (click6Ready) { click6Clicked = true };
      if (click7Ready) { click7Clicked = true };
      if (click8Ready) { click8Clicked = true };
      //document.getElementById("addTime2").style.backgroundColor = 'pink';
      document.getElementById("addTime2").disabled = true;
      document.getElementById("addTime2").style.visibility = 'hidden';
    }
    const addTime2 = () => {
      console.log('Adding free plays 2!');
      const httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = reportCreditAdd2;
      httpRequest.open('POST', 'credit_add');
      httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      httpRequest.send();
    }
    const checkState = (info) => {
      console.log(info);
      if (info['played'] >= 0.20 && info['played'] <= 0.25) {
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
      }
      else if (info['played'] >= 0.45 && info['played'] <= 0.50) {
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
        document.getElementById("addTime").style.backgroundColor = 'transparent';
        document.getElementById("addTime").disabled = true;
        document.getElementById("addTime").innerText = '';
        document.getElementById("addTime").style.border = 'none';
      }
    }
    const checkState2 = (info) => {
      console.log(info);
      if (info['played'] >= 0.22 && info['played'] <= 0.27) {
        if (click5Clicked == false) {
          document.getElementById("addTime2").style.backgroundColor = 'transparent';
          document.getElementById("addTime2").style.border = '3px solid blue';
          document.getElementById("addTime2").disabled = false;
          document.getElementById("addTime2").style.visibility = 'visible';
          document.getElementById("addTime2").innerHTML = '&nbsp;';
          click5Ready = true;
        } else {
          document.getElementById("addTime2").style.backgroundColor = 'green';
          document.getElementById("addTime2").style.border = 'none';
          document.getElementById("addTime2").style.color = 'white';
          document.getElementById("addTime2").disabled = true;
          document.getElementById("addTime2").innerHTML = 'Clicked!';
          document.getElementById("addTime2").style.visibility = 'visible';
        }
      }
      else if (info['played'] >= 0.47 && info['played'] <= 0.52) {
        if (click6Clicked == false) {
          document.getElementById("addTime2").style.backgroundColor = 'transparent';
          document.getElementById("addTime2").style.border = '3px solid blue';
          document.getElementById("addTime2").disabled = false;
          document.getElementById("addTime2").style.visibility = 'visible';
          document.getElementById("addTime2").innerHTML = '&nbsp;';
          click6Ready = true;
        } else {
          document.getElementById("addTime2").style.backgroundColor = 'green';
          document.getElementById("addTime2").style.border = 'none';
          document.getElementById("addTime2").style.color = 'white';
          document.getElementById("addTime2").disabled = true;
          document.getElementById("addTime2").innerHTML = 'Clicked!';
          document.getElementById("addTime2").style.visibility = 'visible';
        }
      }
      else if (info['played'] >= 0.72 && info['played'] <= 0.77) {
        if (click7Clicked == false) {
          document.getElementById("addTime2").style.backgroundColor = 'transparent';
          document.getElementById("addTime2").style.border = '3px solid blue';
          document.getElementById("addTime2").disabled = false;
          document.getElementById("addTime2").style.visibility = 'visible';
          document.getElementById("addTime2").innerHTML = '&nbsp;';
          click7Ready = true;
        } else {
          document.getElementById("addTime2").style.backgroundColor = 'green';
          document.getElementById("addTime2").style.border = 'none';
          document.getElementById("addTime2").style.color = 'white';
          document.getElementById("addTime2").disabled = true;
          document.getElementById("addTime2").innerHTML = 'Clicked!';
          document.getElementById("addTime2").style.visibility = 'visible';
        }
      }
      else if (info['played'] >= 0.96 && info['played'] <= 0.99) {
        if (click8Clicked == false) {
          document.getElementById("addTime2").style.backgroundColor = 'transparent';
          document.getElementById("addTime2").style.border = '3px solid blue';
          document.getElementById("addTime2").disabled = false;
          document.getElementById("addTime2").style.visibility = 'visible';
          document.getElementById("addTime2").innerHTML = '&nbsp;';
          click8Ready = true;
        } else {
          document.getElementById("addTime2").style.backgroundColor = 'green';
          document.getElementById("addTime2").style.border = 'none';
          document.getElementById("addTime2").style.color = 'white';
          document.getElementById("addTime2").disabled = true;
          document.getElementById("addTime2").innerHTML = 'Clicked!';
          document.getElementById("addTime2").style.visibility = 'visible';
        }
      } else {
        document.getElementById("addTime2").style.backgroundColor = 'transparent';
        document.getElementById("addTime2").disabled = true;
        document.getElementById("addTime2").innerText = '';
        document.getElementById("addTime2").style.border = 'none';
      }
    }

    return (
      <div>
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
          <div id="reactPlayer2">
             <button id="addTime2" onClick={addTime2}  style={{ visibility: 'hidden' }}></button>
             <ReactPlayer
                   class="video_frame"
                   width="1950" height="1200"
                   url="https://vimeo.com/871172050" controls={true} playsinline={true}
                   onPlay={() => console.log('video is playing')}
                   onPause={() => console.log('video is paused')}
                   onProgress={(state) => {
                      checkState2(state);
                   }}
                   vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
              />
          </div>
      </div>
    );
}

export default GalsContent;
import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ShowAdContent extends Component {
    userInteracted = false;

    markInteraction = () => {
        this.userInteracted = true;
        window.removeEventListener("pointerdown", this.markInteraction);
        window.removeEventListener("keydown", this.markInteraction);
    };

    componentDidMount() {
        window.addEventListener("pointerdown", this.markInteraction);
        window.addEventListener("keydown", this.markInteraction);
    }

    componentWillUnmount() {
        window.removeEventListener("pointerdown", this.markInteraction);
        window.removeEventListener("keydown", this.markInteraction);
    }

    jQuerycode = () => {
      console.log("At top of jQuerycode() in showAdContent");

      //document.cookie = encodeURI("incr=1");

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
      
      let incr = decodeURI(getCookie("incr"));
      console.log(`the cookie 'incr' in showAd is: `, incr);
      
      if (incr == '' || incr == null || typeof incr == "undefined") {
        incr = 0;
      } else {
        incr++;
        if (incr > 5) {
          incr = 0;
        }
      }
      
      document.cookie = encodeURI("incr=" + incr);
      console.log("incr cookie being set to " + incr);
      let muted = false;
      let searchStr = window.location.search;
      let videoDone = false;
      let clickedAlready = false;
      //const tenDigit = searchStr.substring(10, 20);
      var nextSubstituteVideo = incr;
      var replaying = true;  // fake it into playing next video
      console.log("nextSubstituteVideo at top is " + nextSubstituteVideo);
      
      let thisVideo = document.getElementById('FourSnacksVideo2');
      console.log("this.userInteracted is " + this.userInteracted);
      if (!this.userInteracted) {
        thisVideo.muted = true;
      }
      console.log('thisVideo.muted is ' + thisVideo.muted);
      if (replaying) {
         console.log("replaying is true");
         switch(nextSubstituteVideo) {
           case 0:
             thisVideo.src = "./assets/ads/Pepsi steps on Coke.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo++;
             thisVideo.play();
             break;
           case 1:
             thisVideo.src = "./assets/ads/Coors 480.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo++;
             thisVideo.play();
             break;
           case 2:
             thisVideo.src = "./assets/ads/Budweiser.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo++;
             thisVideo.play();
             break;
           case 3:
             thisVideo.src = "./assets/ads/Snickers-White.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo++;
             thisVideo.play();
             break;
           case 4:
             thisVideo.src = "./assets/ads/Hershey 1980 23 sec.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo++;
             thisVideo.play();
             break;
           case 5:
             thisVideo.src = "./assets/ads/Coke.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo = 0;
             thisVideo.play();
             break;
           default:
             thisVideo.src = "./assets/ads/Coke.mp4";
             thisVideo.load();
             videoDone = false;
             nextSubstituteVideo = 0;
             thisVideo.play();
             break;
         }
      } else {
        console.log("replaying is false");
        thisVideo.src = "./assets/ads/Coke.mp4";
      }

      //const faveNums = searchStr.substring(30, ampPos);
      if (searchStr.length > 0) {
        var faveNums = searchStr.substring(10, ampPos);
        var pronoun = searchStr.substring(ampPos+9,ampPos+12);
        //const pronoun = searchStr.substring(ampPos+9);
      } else {
        var faveNums = '';
        var pronoun = '';
        //const pronoun = searchStr.substring(ampPos+9);
      }
      //document.getElementById('anchorStuff').href = "Screen5.html?lastFour=" + lastFour +"&faveNums=" + faveNums + "&pronoun=" +pronoun;
      //document.getElementById('anchorStuff').href = "screen5?lastFour=" + lastFour + "&faveNums=" + faveNums + "&pronoun=" + pronoun;
//      thisVideo.src = "./assets/ads/Coke.mp4";
//      if (startWithSubstituteVideo) {
//        thisVideo.src = "./assets/ads/PEPSI-480.mp4";
//      } else {
//        thisVideo.src = "./assets/ads/Coke.mp4";
//      }
      document.getElementById('forceNextScreen').onclick = function() {
        thisVideo.pause();
        //thisVideo.src = null;
        //document.getElementById('forceNextScreen').href = "screen5?tenDigit=" + tenDigit + "&faveNums=" + faveNums + "&pronoun=" + pronoun;
        //document.getElementById('forceNextScreen').href = "screen5?faveNums=" + faveNums + "&pronoun=" + pronoun;
        window.location.href = "Screen1.html";
      }
      document.getElementById('forceFullScreen').onclick = function() {
        document.getElementById('video_container4').requestFullscreen();
        document.getElementById('FourSnacksVideo2').style.height = '100%';
        document.getElementById('FourSnacksVideo2').style.width = '100%';
      }
//      document.getElementById('anchorStuff').onclick = function() {
//        if (videoDone) {
//          //document.getElementById('anchorStuff').href = "screen5?tenDigit=" + tenDigit + "&faveNums=" + faveNums + "&pronoun=" + pronoun;
//          document.getElementById('anchorStuff').href = "screen5?faveNums=" + faveNums + "&pronoun=" + pronoun;
//        } else {
//          document.getElementById('tapForFreePlay').style.backgroundColor = 'blue';
//          document.getElementById('tapForFreePlay').style.color = 'white';
//          document.getElementById('tapForFreePlay').innerText = "Wait for video to end...";
//          clickedAlready = true;
//        }
//      }
      document.getElementById('FourSnacksVideo2').addEventListener("click", function (event) {
        //document.getElementById('anchorStuff').click();
        event.preventDefault(); // Prevents the default action
      });
      
      thisVideo.onended = function() {
         console.log("At top of onended function");
         window.location.href = "Screen1.html";
      }
      thisVideo.oncanplaythrough = function() {
         thisVideo.play();
      }; 
      //let videoStuff = window.sessionStorage.getItem("videoList");
      //var sessionstorage = require('sessionstorage');
      //let videoStuff = sessionstorage.getItem("videoList");
      //console.log('videoStuff B is ' + videoStuff);
//      var tree = require('directory-tree');
//      var dirInfo = tree(__dirname + './assets/ads/men/', '**/*.mp4');
//      var menVideos = dirInfo.children;
//      var videoStuff = JSON.stringify(menVideos);
//      console.log('videoStuff B is ' + videoStuff);
    }

    componentDidMount() {
      console.log("In showAdContent: Before jQuerycode()");
      this.jQuerycode();
    }
    
    render() {
        console.log("At top of render() in showAdContent...");
        return (
        <div id="screen4Div" className="row bg-white" 
             style={{ padding: '1em 0 0 0' }}>
            <a id="forceNextScreen" href="#"></a>
            <a id="forceFullScreen" href="#">&#9931; Fullscreen</a>
            <div className="col-10 offset-1">
                <div className="row">
                    <div className="font-weight-bolder my-5 standardText2 topOfHome">
                      <div className="topOfHome2 text-center">
                        <div className="centeredStuff">
  						          <div>
                            <div id="video_container4">
                              <a id="anchorStuff" href="#">
                                <div id="tapForFreePlay">
                                  &nbsp;
                                </div>
                              </a>
                              <video id="FourSnacksVideo2" muted autoplay playsinline>
                                  <source id="Screen4Video" type="video/mp4" />
                              </video>
                            </div>
                        </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
       )
    }
}

export default ShowAdContent;
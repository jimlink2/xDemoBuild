import React, { Component } from "react";
import ReactDOM from 'react-dom';

class Screen4Content extends Component {
    jQuerycode = () => {
      console.log("At top of jQuerycode()");
      let videoDone = false;
      let clickedAlready = false;
      
      // -------------------------------
      // READ URL PARAMETERS
      // -------------------------------
      const params = new URLSearchParams(window.location.search);
    
      let incr       = Number(params.get("incr") || 0);
      let lastFour   = params.get("lastFour")   || "";
      let pronoun    = params.get("pronoun")    || "";
      let faveNums   = params.get("faveNums")   || "";
      let phonePlays = Number(params.get("phonePlays") || 0);
      let timestamp  = Number(params.get("timestamp")  || 0);
      let fakeDay    = Number(params.get("fakeDay")    || 0);
      let replaying  = params.get("replaying") === "1";
    
      console.log("Screen4 params:", {
        incr, lastFour, pronoun, faveNums, phonePlays, timestamp, fakeDay, replaying
      });
    
      // -------------------------------
      // INCREMENT INCR (video rotation)
      // -------------------------------
      incr++;
      if (incr > 5) incr = 0;
    
      // -------------------------------
      // TIMING LOGIC (SAFE EVEN IF CLOCK IS WRONG)
      // -------------------------------
      const now = Date.now();
      const elapsed = now - timestamp;
    
      console.log("Elapsed ms since last play:", elapsed);
    
      const SIXTEEN_HOURS = 16 * 60 * 60 * 1000;
    
      const timestampIsValid = timestamp > 0 && !isNaN(timestamp);
      
      // If timestamp is invalid, initialize it but DO NOT reset phonePlays
      if (!timestampIsValid) {
          timestamp = now;
      }
      
      // Only reset if timestamp is valid AND more than 16 hours passed
      if ((timestampIsValid && elapsed > SIXTEEN_HOURS) || fakeDay) {
      
          console.log("Resetting daily counters in Screen4");
      
          phonePlays = 0;
          timestamp = now;
      
          if (fakeDay) {
              console.log("Fake day triggered — returning to Screen3");
              window.location.href = "Screen3.html";
              return;
          }
      }
    
      // -------------------------------
      // CHECK PLAY LIMIT
      // -------------------------------
      if (phonePlays > 5) {
        console.log("Play limit exceeded — redirecting to Screen1");
        window.location.href = "Screen1.html?playsExceeded=1";
        return;
      }
    
      // -------------------------------
      // PREPARE NEXT VIDEO INDEX
      // -------------------------------
      let nextSubstituteVideo = incr;
      console.log("nextSubstituteVideo =", nextSubstituteVideo);
    
      let thisVideo = document.getElementById("FourSnacksVideo2");
      thisVideo.style.pointerEvents = "none";
      
      // -------------------------------
      // FULLSCREEN OVERLAY PLAY BUTTON
      // -------------------------------
      const overlay = document.getElementById("playOverlay");
      
      if (overlay && thisVideo) {
        overlay.onclick = () => {
          // Hide overlay
          overlay.style.display = "none";
      
          // Start playback
          thisVideo.play();
      
          // Request fullscreen inside the same gesture
          const fs =
            thisVideo.requestFullscreen ||
            thisVideo.webkitEnterFullscreen ||
            thisVideo.webkitRequestFullscreen;
      
          if (fs) {
            try {
              fs.call(thisVideo);
            } catch (e) {
              console.log("Fullscreen failed:", e);
            }
          }
        };
      }
      
      // -------------------------------
      // STORE UPDATED STATE FOR SCREEN5
      // -------------------------------
      window.updatedState = {
        incr,
        lastFour,
        pronoun,
        faveNums,
        phonePlays,
        timestamp
      };
    
      console.log("Updated state for next screen:", window.updatedState);

      //if (replaying) {
      //   console.log("replaying is true");
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

        // -------------------------------
        // FORCE NEXT SCREEN BUTTON
        // -------------------------------
        document.getElementById('forceNextScreen').onclick = function () {
          thisVideo.pause();
        
          const s = window.updatedState;
        
          const url =
            `screen5.html?` +
            `faveNums=${encodeURIComponent(s.faveNums)}` +
            `&pronoun=${encodeURIComponent(s.pronoun)}` +
            `&lastFour=${encodeURIComponent(s.lastFour)}` +
            `&incr=${s.incr}` +
            `&phonePlays=${s.phonePlays}` +
            `&timestamp=${s.timestamp}`;
        
          document.getElementById('forceNextScreen').href = url;
        };
        
        
        // -------------------------------
        // FULLSCREEN BUTTON
        // -------------------------------
        document.getElementById('forceFullScreen').onclick = function () {
          document.getElementById('video_container4').requestFullscreen();
          document.getElementById('FourSnacksVideo2').style.height = '100%';
          document.getElementById('FourSnacksVideo2').style.width = '100%';
        };
        
        
        // -------------------------------
        // ANCHOR CLICK (TAP FOR FREE PLAY)
        // -------------------------------
        document.getElementById('anchorStuff').onclick = function () {
          const s = window.updatedState;
        
          if (videoDone) {
        
            const url =
              `screen5.html?` +
              `faveNums=${encodeURIComponent(s.faveNums)}` +
              `&pronoun=${encodeURIComponent(s.pronoun)}` +
              `&lastFour=${encodeURIComponent(s.lastFour)}` +
              `&incr=${s.incr}` +
              `&phonePlays=${s.phonePlays}` +
              `&timestamp=${s.timestamp}`;
        
            document.getElementById('anchorStuff').href = url;
        
          } else {
            document.getElementById('tapForFreePlay').style.backgroundColor = 'blue';
            document.getElementById('tapForFreePlay').style.color = 'white';
            document.getElementById('tapForFreePlay').innerText = "Wait for video to end...";
            clickedAlready = true;
          }
        };
        
        
        // -------------------------------
        // CLICKING THE VIDEO TRIGGERS ANCHOR
        // -------------------------------
//        document.getElementById('FourSnacksVideo2').addEventListener("click", function (event) {
//          document.getElementById('anchorStuff').click();
//          event.preventDefault();
//        });
        
        
        // -------------------------------
        // VIDEO ENDED — PLAY NEXT SUBSTITUTE VIDEO
        // -------------------------------
        thisVideo.onended = function () {
          console.log("At top of onended function");
          videoDone = true;
        
          const s = window.updatedState;
        
          if (clickedAlready) {
            document.getElementById('anchorStuff').click();
            return;
          }
        
          console.log("nextSubstituteVideo in switch is " + nextSubstituteVideo);
        
          switch (nextSubstituteVideo) {
            case 0:
              thisVideo.src = "./assets/ads/Pepsi steps on Coke.mp4";
              break;
            case 1:
              thisVideo.src = "./assets/ads/Coors 480.mp4";
              break;
            case 2:
              thisVideo.src = "./assets/ads/Budweiser.mp4";
              break;
            case 3:
              thisVideo.src = "./assets/ads/Snickers-White.mp4";
              break;
            case 4:
              thisVideo.src = "./assets/ads/Hershey 1980 23 sec.mp4";
              break;
            case 5:
              thisVideo.src = "./assets/ads/Coke.mp4";
              break;
            default:
              thisVideo.src = "./assets/ads/Coke.mp4";
              break;
          }
        
          thisVideo.load();
          videoDone = false;
        
          // Rotate to next video index
          nextSubstituteVideo++;
          if (nextSubstituteVideo > 5) nextSubstituteVideo = 0;
        
          // Update state for next screen
          window.updatedState.incr = nextSubstituteVideo;
        
          thisVideo.play();
        };
}

    componentDidMount() {
      this.jQuerycode();
    }
    
    render() {
        console.log("At top of render()...");
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
                              <video id="FourSnacksVideo2" playsinline  style={{ width: "100%", height: "100%" }}>
                                  <source id="Screen4Video" type="video/mp4" />
                              </video>
                              <div
                                id="playOverlay"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  background: "black",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "48px",
                                  cursor: "pointer",
                                  zIndex: 10
                                }}
                              >
                                ▶ Play
                              </div>
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

export default Screen4Content;
import React, { Component } from "react";
import ReactDOM from 'react-dom';

class Screen4Content extends Component {
    jQuerycode = () => {
      console.log("At top of jQuerycode()");
      const ADS = [
        "./assets/ads/Pepsi Coke boy no text.mp4",
        "./assets/ads/Coors no text.mp4",
        "./assets/ads/Budweiser no text.mp4",
        "./assets/ads/Snickers no text.mp4",
        "./assets/ads/Hershey no text.mp4",
        "./assets/ads/Coke hilltop with no text.mp4"
      ];
      let videoDone = false;
      let clickedAlready = false;
      
      // -------------------------------
      // READ URL PARAMETERS
      // -------------------------------
      const params = new URLSearchParams(window.location.search);
    
      let incr       = Number(params.get("incr") || 0);
      let store      = params.get("store")   || "";
      let lastFour   = params.get("lastFour")   || "";
      let pronoun    = params.get("pronoun")    || "";
      let faveNums   = params.get("faveNums")   || "";
      let phonePlays = Number(params.get("phonePlays") || 0);
      let lastReset  = Number(params.get("lastReset")  || 0);
      let fakeDay    = Number(params.get("fakeDay")    || 0);
      let replaying  = params.get("replaying") === "1";
    
      let playsRaw = params.get("plays") || "";
      let plays = {};
      
      if (playsRaw.length > 0) {
          playsRaw.split(",").forEach(pair => {
              let [id, count] = pair.split(":");
              plays[id] = Number(count);
          });
      }
  
      console.log("Screen4 params:", {
        incr, store, lastFour, lastReset, pronoun, faveNums, phonePlays, playsRaw, lastReset, fakeDay, replaying
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
      const elapsed = now - lastReset;
    
      console.log("Elapsed ms since last play:", elapsed);
    
      const SIXTEEN_HOURS = 16 * 60 * 60 * 1000;
    
      const lastResetIsValid = lastReset > 0 && !isNaN(lastReset);
      
      // If lastReset is invalid, initialize it but DO NOT reset phonePlays
      if (!lastResetIsValid) {
          lastReset = now;
      }
      
      // Only reset if lastReset is valid AND more than 16 hours passed
      if ((lastResetIsValid && elapsed > SIXTEEN_HOURS) || fakeDay) {
      
          console.log("Resetting daily counters in Screen4");
      
          phonePlays = 0;
          lastReset = now;
          plays = {};   // wipe all user counts
          playsRaw = "";

          if (fakeDay) {
              console.log("Fake day triggered; returning to Screen3");
              window.location.href = "Screen3.html?store=" + store + "&lastReset=" + lastReset + "&plays=" + playsRaw;
              return;
          }
      }
      
      phonePlays++;
    
      // -------------------------------
      // CHECK PLAY LIMIT
      // -------------------------------
      if (phonePlays > 3) {
        console.log("Play limit exceeded; redirecting to Screen1");
        window.location.href = "Screen1.html?store=" + store + "&lastReset=" + lastReset + "&plays=" + playsRaw + "&playsExceeded=1";
        return;
      }
    
      // -------------------------------
      // PREPARE NEXT VIDEO INDEX -- RANDOMLY
      // -------------------------------
      let nextSubstituteVideo = Math.floor(Math.random() * 6);
      incr = nextSubstituteVideo;
      console.log("nextSubstituteVideo =", nextSubstituteVideo);
    
      let thisVideo = document.getElementById("FourSnacksVideo2");
      
      thisVideo.addEventListener("loadedmetadata", () => {
          thisVideo.addEventListener("timeupdate", () => {
              const remaining = thisVideo.duration - thisVideo.currentTime;
      
              if (remaining <= 6) {
                  anchor.style.pointerEvents = "auto";   // ENABLE
              } else {
                  anchor.style.pointerEvents = "none";   // DISABLE
              }
          });
      });          
      // -------------------------------
      // FULLSCREEN OVERLAY PLAY BUTTON
      // -------------------------------
      const overlay = document.getElementById("playOverlay");
      
      if (overlay && thisVideo) {
        overlay.onclick = () => {
          console.log("OVERLAY CLICKED");
          overlay.style.display = "none";
          
          thisVideo.src = ADS[nextSubstituteVideo];
          nextSubstituteVideo = (nextSubstituteVideo + 1) % ADS.length;
          window.updatedState.incr = nextSubstituteVideo;
          videoDone = false;
      
          // Safe play with retry
          thisVideo.play().catch(err => {
            console.warn("Play() interrupted, retrying...", err);
            setTimeout(() => {
              thisVideo.play().catch(e => console.error("Retry failed:", e));
            }, 150);
          });
      
          // Ã¢Â­Â Delay CSS fix until AFTER play stabilizes
          setTimeout(() => {
            console.log("Re-applying video CSS after fullscreen");
            thisVideo.style.position = "absolute";
            thisVideo.style.zIndex = "1";
            thisVideo.style.width = "100%";
            thisVideo.style.height = "100%";
          }, 300);  // 250Ã¢â‚¬â€œ300ms is safest on Goodtel WebView
        };
      }      
      
      const anchor = document.getElementById('anchorStuff');
      const freePlay = document.getElementById('tapForFreePlay');
      const waitForVideo = document.getElementById('waitForVideo');
      const tapScreen = document.getElementById('tapScreen');
      anchor.style.pointerEvents = "none";
      freePlay.style.pointerEvents = "none";
      waitForVideo.style.pointerEvents = "none";
      
      thisVideo.addEventListener("loadedmetadata", () => {
        thisVideo.addEventListener("timeupdate", () => {
          const remaining = thisVideo.duration - thisVideo.currentTime;
      
          if (remaining <= 6 && !clickedAlready) {
            anchor.style.pointerEvents = "auto";
            freePlay.style.pointerEvents = "auto";
            waitForVideo.style.pointerEvents = "auto";
            tapScreen.style.display = 'inline-block';
          } else {
            anchor.style.pointerEvents = "none";
            freePlay.style.pointerEvents = "none";
            waitForVideo.style.pointerEvents = "none";
            tapScreen.style.display = 'none';
          }
        });
      });
      
      anchor.onclick = () => {
        console.log("FREE PLAY CLICKED");

        const s = window.updatedState;

        if (videoDone) {
          const url =
            `screen5.html?` +
            `store=${encodeURIComponent(s.store)}` +
            `&faveNums=${encodeURIComponent(s.faveNums)}` +
            `&pronoun=${encodeURIComponent(s.pronoun)}` +
            `&lastFour=${encodeURIComponent(s.lastFour)}` +
            `&incr=${s.incr}` +
            `&phonePlays=${s.phonePlays}` +
            `&lastReset=${s.lastReset}` +
            `&plays=${playsRaw}`;

          anchor.href = url;

        } else {
          waitForVideo.style.display = "inline-block";
          waitForVideo.style.backgroundColor = 'blue';
          waitForVideo.style.color = 'white';
          waitForVideo.innerText = "Wait for video to end...";
          tapScreen.style.display = 'none';
          clickedAlready = true;
        }
      };

      console.log("anchorStuff onclick: ", anchor.onclick);      
      // -------------------------------
      // STORE UPDATED STATE FOR SCREEN5
      // -------------------------------
      window.updatedState = {
        incr,
        store,
        lastFour,
        pronoun,
        faveNums,
        phonePlays,
        lastReset,
        playsRaw
      };
    
      console.log("Updated state for next screen:", window.updatedState);

      thisVideo.onended = function () {
        console.log("At top of onended function");
        videoDone = true;
      
        const s = window.updatedState;
      
        if (clickedAlready) {
          document.getElementById('anchorStuff').click();
          return;
        }
      
        console.log("nextSubstituteVideo in switch is " + nextSubstituteVideo);
      
        thisVideo.src = ADS[nextSubstituteVideo];
      
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
      setTimeout(() => {
        this.jQuerycode();
      }, 0);
    }    
    
    render() {
        console.log("At top of render()...");
        return (
        <div id="screen4Div" className="row bg-white" 
             style={{ padding: '1em 0 0 0' }}>
            <div className="col-10 offset-1">
                <div className="row">
                    <div className="font-weight-bolder my-5 standardText2 topOfHome">
                      <div className="topOfHome2 text-center">
                        <div className="centeredStuff">
  						          <div>
  						              <div id="waitForVideo"></div>
  						              <div id="tapScreen">Tap Screen Now</div>
                            <div id="video_container4">
                              <a id="anchorStuff" href="#">
                                <div id="tapForFreePlay">
                                  &nbsp;
                                </div>
                              </a>
                              <video id="FourSnacksVideo2" playsinline style={{ width: "100%", height: "100%" }}></video>
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
                               &#9654; Continue
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
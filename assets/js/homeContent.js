import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import Player from '@vimeo/player';
import $ from 'jquery';
import ColorBallImg from './colorballImg.js';
import config from './config.js';
import ColorBallTxt from './colorballTxt.js';
import CRATxt from './CRATxt.js';
import CGATxt from './CGATxt.js';
import EDGETxt from './EDGETxt.js';
import AdsTxt from './adsTxt.js';
import MethodTxt from './methodTxt.js';


class HomeContent extends Component {
    jQuerycode = () => {
      let muted = true;
      
      $("#videoLink").click(function() {
        $("#VideoContainer").css('visibility', 'visible')
      });

      $("#unmute").click(function() {
        changeSound(true);
      });

      $("#mute").click(function() {
        changeSound(false);
      });

      $("#unmute").css('display', 'none')
      $("#mute").css('display', 'block')
      
      const videoList = {
          '400': '864066722',
          '401': '864066846',
          '402': '864066901',
          '403': '864066975',
          '404': '864067039',
          '405': '864067093',
          '406': '864067136',
          '407': '864067908',
          '408': '864068003',
          '409': '864090615',
          '410': '864079860',
          '411': '864079893',
          '412': '864079920',
          '413': '864080880',
          '414': '864080950',
          '415': '864081001',
          '416': '864081036',
          '417': '864081063',
          '418': '864081094',
          '419': '864081115',
          '420': '864081146',
          '421': '864096585',
          '422': '864096693',
          '423': '864096778',
          '424': '864096854',
          '425': '864096913',
          '426': '864096973',
          '427': '864097002',
          '428': '864097032',
          '429': '864097059',
          '430': '864097087',
          '431': '864097112',
          '432': '864097134',
          '433': '864097174',
          '434': '864097195',
          '435': '864097227',
          '436': '864097256',
          '437': '864097285',
          '438': '864097311',
          '439': '864097343',
          '440': '864097378',
          '441': '864099097',
          '442': '864099199',
          '443': '864099224',
          '444': '864099272',
          '445': '864099296',
          '446': '864099315',
          '447': '864099336',
          '448': '864099355',
          '449': '864099366',
          '450': '864099383',
          '451': '864099399',
          '452': '864099418',
          '453': '864099440',
          '454': '864099458',
          '455': '864099473',
          '456': '864099489',
          '457': '864099510',
          '458': '864099534',
          '459': '864099624',
          '460': '864099730',
          '461': '864104586',
          '462': '864104750',
          '463': '864104895',
          '464': '864104984',
          '465': '864105087',
          '466': '864105157',
          '467': '864105332',
          '468': '864105370',
          '469': '864105402',
          '470': '864105446',
          '471': '864105482',
          '472': '864105517',
          '473': '864105557',
          '474': '864105600',
          '475': '864105636',
          '476': '864105670',
          '477': '864105707',
          '478': '864105741',
          '479': '864105779',
          '480': '864105822',
          '481': '864105856',
          '482': '864105896',
          '483': '864105934',
          '484': '864105968',
          '485': '864106014',
          '486': '864106257',
          '487': '864106387',
          '488': '864106511',
          '489': '864107013',
          '490': '864107113',
          '491': '864107166',
          '492': '864107201',
          '493': '864107246',
          '494': '864107282',
          '495': '864107319',
          '496': '864107355',
          '497': '864107393',
          '498': '864107433',
          '499': '864107468'
      };
      
      const videos = [
        document.getElementById("HomeAd1"),
        document.getElementById("HomeAd2"),
        document.getElementById("HomeAd3"),
        document.getElementById("HomeAd4")
      ];
      
      let index = 0;
      let htmlAdsArePlaying = false;
      
      function playNextHtmlAd() {
        console.log("htmlAds index is " + index);
        if (index >= videos.length) {
          //htmlAdsArePlaying = false;
          //return;
          index = 0;
        }
      
        htmlAdsArePlaying = true;
      
        const vid = videos[index];
        vid.muted = true;
      
        vid.onended = () => {
          index++;
          vid.style.display = "none";
          playNextHtmlAd();
        };
      
        console.log("Playing " + vid.id);
        vid.style.display = "inline-block";
        vid.play();
      }
      
      //htmlAdsArePlaying = true;
      //playNextHtmlAd();
      
      var movieIndexList = [];
      for (let i = 0; i < 100; i++) {
        movieIndexList.push(400 + i);
      }
      
      let movie1 = document.getElementById("vid1");
      let movie2 = document.getElementById("vid2");
      let movie3 = document.getElementById("vid3");
      let movie4 = document.getElementById("vid4");
          
      function myRand(arr, m) {
      	let returnArr = [];

      	while (returnArr.length < m) {
      		let randNum = Math.floor(Math.random() * arr.length);
      		if (returnArr.indexOf(arr[randNum]) > -1) {
      			continue;
      		}
      		returnArr.push(arr[randNum]);
      	}
      	return returnArr;
      }

      let tempMovie4;
      let tempMovie3;
      let tempMovie2;
      let tempMovie1;
      let timeOutId1;
      let timeOutId2;
      let timeOutId3;
      let timeOutId4;
      let timeOutId5;
      let standardDelay = 5000; //was 4500

      var video1handled = false;
      var video2handled = false;
      var video3handled = false;
      var video4handled = false;
      
      var player1, player2, player3, player4;
      var player1Playing = false;
      var player2Playing = false;
      var player3Playing = false;
      var player4Playing = false;
      
function getUrlFromId(id) {
  console.log("id in getUrlFromId is " + id);
//  for (var key in videoList) {
//    console.log("key is " + key + " and value is " + videoList[key]);
//  }
  //return parseInt(videoList[`${id}`], 10);
  console.log("videoList[`${id}`] is " + videoList[`${id}`]);
  return parseInt(videoList[`${id}`], 10);
}
let players = [];
let videoHandled = [false, false, false, false];
let tempInitialRandomNums = [];
let tempInitialRandomVidIds = [];
let skipFirstTimeUpdate = [false, false, false, false];
let mixingLevel = 1;

function initAllPlayers() {
  const movieElements = [movie1, movie2, movie3, movie4];

  for (let i = 0; i < 4; i++) {
    // Construct player without id
    console.log('assigning playerOptions.id at line 283...');
    playerOptions.id = tempInitialRandomVidIds[0];
    console.log('playerOptions.id is ' + playerOptions.id);
    playerOptions.muted = muted;
    players[i] = new Player(movieElements[i], playerOptions);

    players[i].on('play', () => console.log(`player${i+1} is playing...`));
    players[i].on('pause', () => console.log(`player${i+1} is paused...`));

    players[i].on('timeupdate', (filmtime) => {
      // Skip the first stale event after loadVideo
      if (skipFirstTimeUpdate[i]) {
        skipFirstTimeUpdate[i] = false;
        return;
      }
      if (filmtime.seconds >= 4.6) {
        players[i].pause();
        document.getElementById(`vid${i+1}_num_b`).innerHTML =
          `${getNumberFromId(tempInitialRandomNums[i])}`;
        document.getElementById(`vid${i+1}_num_b`).style.opacity = 1;
        console.log("timeupdate → nextMovie " + (i+2));
        nextMovie(i+2);
      }
    });
  }
}

function doNextMovieLoop() {
  // reset UI
  [movie1, movie2, movie3, movie4].forEach(m => m.style.opacity = 0);
  ["vid1_num_b","vid2_num_b","vid3_num_b","vid4_num_b"].forEach(id => {
    document.getElementById(id).style.opacity = 0;
  });

  // reset flags and randomize
  videoHandled = [false, false, false, false];
  tempInitialRandomNums = myRand(movieIndexList, 4);
  console.log('tempInitialRandomNums is ' + tempInitialRandomNums);
  tempInitialRandomVidIds = tempInitialRandomNums.map(num => parseInt(videoList[num], 10));
  console.log('tempInitialRandomVidIds is ' + tempInitialRandomVidIds);

  // start with movie1
  nextMovie(1);
}

function safeLoadVideo(player, videoId, index, movieElements, attempt = 1) {
  const MAX_RETRIES = 2; // how many times to retry before fallback
  const FALLBACK_VIDEO_ID = 864097032; // replace with a known public video ID

  player.loadVideo(videoId).then(() => {
    console.log(`video${index+1} id is ${videoId}`);
    if (!muted) player.setVolume(1);
    movieElements[index].style.opacity = 1;

    // mark to skip first stale timeupdate
    skipFirstTimeUpdate[index] = true;

    player.play().catch(err => {
      console.error(`Play blocked on player${index+1}:`, err);
    });
  }).catch(err => {
    console.error(`Error loading video${index+1} (id ${videoId}):`, err);

    // Detect 401 Unauthorized
    if (err.message?.includes('Unauthorized') || err.code === 401) {
      if (attempt <= MAX_RETRIES) {
        console.log(`Retrying video${index+1} (attempt ${attempt+1})...`);
        setTimeout(() => safeLoadVideo(player, videoId, index, movieElements, attempt+1), 1500);
      } else {
        console.warn(`Falling back to safe video for player${index+1}`);
        safeLoadVideo(player, FALLBACK_VIDEO_ID, index, movieElements, attempt+1);
      }
    }
  });
}

function nextMovie(movieNumber) {
  if (!window.runScript) return;

  if (movieNumber === 5) {
    console.log("Ready to call doNextMovieLoop() in 3 seconds...");
    setTimeout(doNextMovieLoop, 3000);
    return;
  }

  const index = movieNumber - 1;
  const movieElements = [movie1, movie2, movie3, movie4];

  if (!videoHandled[index]) {
    videoHandled[index] = true;

    // Use safeLoadVideo instead of direct loadVideo
    safeLoadVideo(players[index], tempInitialRandomVidIds[index], index, movieElements);
  }
}

function changeSound(soundOn) {
  if (soundOn) {
    $("#unmute").hide();
    $("#mute").show();
    mixingLevel = 1;
    console.log("Chambers are AUDIBLE");
  } else {
    $("#unmute").show();
    $("#mute").hide();
    mixingLevel = 0;
    console.log("Chambers are MUTED");
  }
}

function getNumberFromId(givenId) {
    let id = givenId;
    console.log("givenId in getNumberFromId() is " + givenId);
//        for (let x in videoList) {
//          if (videoList[x] == givenId) {
//            console.log("x is " + x + " in getNumberFromId()");
//            id = x;
//            break;
//          }
//        }
    let returnNum = 33;
    if (id < 410) returnNum = 0;
    else if (id < 420) returnNum = 1;
    else if (id < 430) returnNum = 2;
    else if (id < 440) returnNum = 3;
    else if (id < 450) returnNum = 4;
    else if (id < 460) returnNum = 5;
    else if (id < 470) returnNum = 6;
    else if (id < 480) returnNum = 7;
    else if (id < 490) returnNum = 8;
    else if (id < 500) returnNum = 9;

    return returnNum;
}
      
      window.runScript = true;
      tempInitialRandomNums = myRand(movieIndexList, 4);
      tempInitialRandomVidIds = tempInitialRandomNums.map(num => parseInt(videoList[num], 10));
      
      // now safe to use tempInitialRandomVidIds[0]
      const playerOptions = {
          controls: false,
          playsinline: true,
          autoplay: false,
          muted: muted,
          id: tempInitialRandomVidIds[0],
          width: '100%',
          height: '400'
      };
          
      initAllPlayers();
      htmlAdsArePlaying = true;
      playNextHtmlAd();   // Now start HTML ads
      doNextMovieLoop();    
    }

    componentDidMount() {
      this.jQuerycode();
    }
    
    render() {
        return (
        <div className="row bg-white" 
             style={{ padding: '1em 0 0 0' }}>
            <div className="col-10 offset-1">
                <div className="row">
                    <div className="font-weight-bolder my-5 standardText2 topOfHome">
                      <div className="topOfHome2 text-center">
                        <div className="centeredStuff">
                          <a href="/play" class="standardText"><img src={config.baseURL + "./assets/img/new_logo.png"} class="homeImage" /></a>
                          <img src={config.baseURL + "./assets/img/Screen3_keypad.jpg"} class="Screen3Keypad" />
                          <img src={config.baseURL + "./assets/img/Facebook-ad-8.png"} class="homeImage" />
                        </div>
                        <div className="centeredStuff homeVideosMainDiv">
  						          <div id="reactPlayer1" class="homeImagesDiv3">
  						            <p class="homeHeadings"><b><font size="+2"><center>
                            <br/>
                            <ColorBallTxt /> WINNING NUMBERS
                          </center></font></b></p>
                          <div id="video_container">
                            <div className="row justify-content-center">
                                <div className="btn btn-primary" id="unmute">Unmute</div>
                                <div className="btn btn-primary" id="mute">Mute</div>
                            </div>

                            <div className='row'>
                                <div className='col-3 text-center h1 resultDigit' id='vid1_num_b'  style={{opacity: 0}}>&nbsp;</div>
                                <div className='col-3 text-center h1 resultDigit' id='vid2_num_b'  style={{opacity: 0}}>&nbsp;</div>
                                <div className='col-3 text-center h1 resultDigit' id='vid3_num_b'  style={{opacity: 0}}>&nbsp;</div>
                                <div className='col-3 text-center h1 resultDigit' id='vid4_num_b'  style={{opacity: 0}}>&nbsp;</div>
                            </div>
                            <div className='row' id='vids0'>
                                <div className='col-3'>
                                    <div id='vid1' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid2' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid3' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                                <div className='col-3'>
                                    <div id='vid4' className="d-flex justify-content-center"  style={{opacity: 0}}></div>
                                </div>
                            </div>
                           </div>
  						          </div>
  						          <div id="reactPlayer2">
                            <span class="homeHeadings"><b><font size="+2"><center>
                              <br/>
                              &nbsp; <ColorBallTxt /> VIDEO-ADS
                            </center></font></b></span>
                            <div id="video_container2">
                              <video id="HomeAd1" class="homeImagesDiv4" controls>
                                  <source type="video/mp4" src="./assets/ads/Budweiser-trimmed.mp4" />
                              </video>
                              <video id="HomeAd2" class="homeImagesDiv4" controls>
                                  <source type="video/mp4" src="./assets/ads/Snickers-White-trimmed.mp4" />
                              </video>
                              <br />
                              <video id="HomeAd3" class="homeImagesDiv4" controls>
                                  <source type="video/mp4" src="./assets/ads/PEPSI-480-trimmed.mp4" />
                              </video>
                              <video id="HomeAd4" class="homeImagesDiv4" controls>
                                  <source type="video/mp4" src="./assets/ads/Coke-trimmed.mp4" />
                              </video>
                            </div>
                        </div>
                        </div>
                      </div>
                        <p class="aBitBolder"><b><font size="+2"><center>
                        <br/>
                        ATTENTION: RETAIL & CONVENIENCE STORES
                        <br/>
                        <br/>
                        <ColorBallTxt /> GAMES & ADS' (<CGATxt />) GROUNDBREAKING NEW "<MethodTxt />" OF ADVERTISING IN STORES AND MARKETING
                        <br/>
                        FOR STORES WILL MOTIVATE PEOPLE TO LEAVE THEIR HOMES AND VISIT STORES WHERE THEY CAN <a href="https://colorballnumbers.com/screens">PLAY</a>  
                        <br/>
                        FIVE <ColorBallTxt /> PICK-3 OR PICK-4 SKILL GAMES FOR FREE EVERY DAY ON KIOSK E-TABLETS  
                        <br/>
                        OR ON FUEL PUMP SCREENS AND WIN PRIZES OF $100.00 OR $1,000.00.
                        </center></font></b></p>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1">
                        </div> 
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText textTap3">
                        <div id="myDiv" class="indented"> <font size="+2">What must store-visitors do before <a href="https://colorballnumbers.com/screens">playing</a> the <ColorBallTxt /> Pick-3 or Pick-4 skill games FOR FREE?</font> </div> 
                        </div> 
                        <br/>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1"> 
                        TO GET A <u>FREE</u> CHANCE TO <a href="https://colorballnumbers.com/screens">PLAY</a> A <ColorBallTxt /> SKILL GAME AND WIN $100.00 OR $1,000.00, A VISITOR MUST TAP THE SCREEN OF AN E-TABLET DURING THE FINAL SIX SECONDS OF A 30-SECOND <ColorBallTxt /> VIDEO-AD, LIKE THE ADS SHOWN ABOVE.
                        </div> 

                        
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1"> 
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText textTap3">
                        <div id="myDiv" class="indented"><font size="+2"> What&apos;s in it for storekeepers? </font></div>
                        </div>
                        <div id="myDiv" class="indented"> 1..THE <ColorBallTxt />  "<MethodTxt />" WILL ENABLE STOREKEEPERS TO DERIVE SUBSTANTIAL NEW REVENUE BY DISPLAYING TV-GRADE VIDEO-ADS FOR IN-STORE PRODUCTS AND CHARGING ADVERTISERS A REASONABLE FEE FOR EACH TIMELY TAP OF AN E-TABLET SCREEN BY EACH VIEWER.</div>  
                        <div id="myDiv" class="indented"> 2..THE CUSTOMER RETENTION (CRV) VALUE OF EACH STORE WILL SOAR BY ENABLING VISITORS TO <a href="https://colorballnumbers.com/screens">PLAY </a> FIVE <ColorBallTxt /> SKILL GAMES FOR FREE EVERY DAY.</div> 
                        <div id="myDiv" class="indented"> 3..STOREKEEPERS WILL ENJOY A DISTINCT COMPETITIVE ADVANTAGE, OWING TO THE THE PATENT AND COPYRIGHTS OF THE <ColorBallTxt /> "<MethodTxt />" </div>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1">
                        </div>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText textTap3">
                        <div id="myDiv" class="indented"><font size="+2"> What is considered a reasonable FPT and why? </font></div>
                        </div>
                        <br/>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1">
                        CHARGING ADVERTISERS BETWEEN $0.20 and $0.40 FOR EACH VERIFIED COMPLETE VIEW OF A TV GRADE, 30-SECOND VIDEO-AD FOR A NEARBY-SHELVED PRODUCT BY EACH VIEWER IS REASONABLE FOR SEVERAL REASONS: 
                        <div id="myDiv" class="indented"> 1..THE <ColorBallTxt /> METHOD IS UNIQUE.  NO STORE IN THE ENTIRE WORLD HAS EVER CHARGED ANY ADVERTISER A FEE FOR A VERIFIED COMPLETE VIEW OF THE ADVERTISER'S 30-SECOND TV-GRADE VIDEO AD THAT PROMOTES AN IN-STORE PRODUCT; </div>
                        <div id="myDiv" class="indented"> 2..THE <ColorBallTxt /> VIDEO-ADS DISPLAYED ON KIOSKS IN THE STORES ARE GENDER-SPECIFIC;</div>
                        <div id="myDiv" class="indented"> 3..ADVERTISERS WILL NOT BE CHARGED ANYTHING FOR THOUSANDS OF <ColorBallTxt /> VIDEO-ADS THAT ARE VIEWED COMPLETELY AND NOT FOLLOWED BY ANY SCREEN TAPS.</div>
                        </div>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText textTap3">
                        <div id="myDiv" class="indented"><font size="+2"> How will Video-Ad viewers know when to tap the screens ? </font></div>
                        </div>
                        <br/>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1">
                        AS SHOWN IN THE <ColorBallTxt /> VIDEO-ADS AT THE TOP OF THIS PAGE, THE FOLLOWING NOTIFICATION APPEARS ON-SCREEN DURING THE FINAL SIX SECONDS OF EACH VIDEO-AD.
                        </div>
                        <div className="text-center font-weight-bolder my-5 standardText" id="freePlay">
                        <font size="+3">  "Tap Screen for <a href="https://colorballnumbers.com/screens">FREE PLAY</a>" </font>
                        </div>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText textTap3">
                        <div id="myDiv" class="indented"><font size="+2"> What&apos;s in it for advertisers? </font></div>
                        </div>
                        <div id="myDiv" class="indented"> 1..ADVERTISERS CAN SAY GOODBYE TO THE PATHETIC, CURRENT, 32% "VIEW-THROUGH" RATES OF THEIR VIDEO-ADS.  NOW, WITH VIDEO-ADS FOR PRODUCTS IN THE STORES BEING DISPLAYED ON KIOSKS IN THE STORES VIA THE <ColorBallTxt /> "<MethodTxt />", ADVERTISERS CAN CELEBRATE 100% "VIEW-THROUGH" RATES.</div> 
                        <div id="myDiv" class="indented"> 2..THE ADS' EFFECTIVENESS WILL SKYROCKET. </div>
                        <div id="myDiv" class="indented"> 3..PARTICIPATING ADVERTISERS WILL BE PRAISED FOR USHERING IN THE DAWN OF A NEW ERA OF IN-STORE ADVERTISING.</div>
                        </div>

                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1">                                    
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText textTap3">
                        <div id="myDiv" class="indented"><font size="+2"> Did <CGATxt /> conceive and develop and create the amazing <ColorBallTxt />  "<MethodTxt />" all by itself? Or did <CGATxt /> have some help? </font></div>
                        </div>
                        </div>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1">
                                    ONGOING DEVELOPMENT OF THE INNOVATIVE, UNIQUE <ColorBallTxt /> "<MethodTxt />" IS BEING SPONSORED BY THE CARNEGIE MELLON UNIVERSITY IN PITTSBURGH, PENNSYLVANIA, WHERE THE SWARTZ CENTER FOR ENTREPRENEURSHIP PROVIDES ITS COMPLETE COLLABORATION, FACILITIES AND FULL SUPPORT.
                                    <br/>
                                    <br/>
                                    <div className="text-center font-weight-bolder my-5 standardText">
                                        <a href="https://www.cmu.edu/swartz-center-for-entrepreneurship/education-and-resources/swartz-center-startup-teams/index.html" target="_blank">CMU-UNLIMITED</a>
                                    </div>
                        </div>
                        <div className="text-center font-weight-bolder my-5 standardText" id="text1">
                        <img src={config.baseURL + "./assets/img/Alan_ID_card.jpg"} id="ID_Card" />
                        <br/>
                        <font size="+3">  
                        <br/>  
                        HOW TO WIN </font> 
                        </div>
                        <div className="text-left font-weight-bolder my-5 standardText poundSignText" id="text1"> <br/>
                        EVERY 60 SECONDS EVERY DAY, A NEW WINNING NUMBER IS CREATED BY THE DIGITS APPEARING ON THE BOTTOM BALLS IN EACH OF THE TRANSPARENT MIXING CHAMBERS. IF A PLAYER'S SUBMITTED NUMBER BECOMES EXACTLY MATCHED BY ALL THE DIGITS OF THE WINNING NUMBER IN THE NEXT GAME, THE PLAYER WILL WIN A CASH PRIZE. FOR 3-DIGIT NUMBERS, THE PRIZE IS $100.00. FOR 4-DIGIT NUMBERS, THE PRIZE IS $1,000.00.                       </div>
                        <div>
                        <div className="col-12 text-left font-weight-bolder my-5 standardText2 poundSignText" id="text2">
                        FOR MORE INFORMATION OR SUPPORT, TEXT: support@colorballnumbers.com.
                         <br/>   
                         <br/>   
                        </div>
                        <br />
                          <h2><font size="+3"><b><center>Please visit our <a href="https://www.linkedin.com/company/colorball-ads/about/?viewAsMember=true" target="_blank">LinkedIn pages</a></center></b></font></h2>
                      </div>
                    </div>
                </div>
            </div>  
        </div>

       )
    }
}



export default HomeContent;
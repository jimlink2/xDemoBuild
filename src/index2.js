import Player from '@vimeo/player';
import Queue from './queue.js';
// import * as ex from '../re.js';
//const Vimeo = require('@vimeo/player');

//let demotype = document.getElementById("demoscript").getAttribute("demotype");
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

let faveNums = "";
let pronoun = "";
let lastFour = "";
let store = "";
let phonePlays = 0;
let lastReset = 0;
let plays = {};
let playsRaw = "";
let incr = 0;
let fakeDay = 0;
let replaying = false;

//const socket = new WebSocket('wss://colorball-ads.com/:443');
//const socket = new WebSocket('wss://colorballnumbers.com/:443');

var credit_amount = 0;
let demotype = 'color';
let betsOpen = true;  // was false. Trying now to enable keys initially
let activeSubmit = true;
let reduceCount = false;
let use3digitsThisTime = false;
var remainingGames = 0;
let lastWinningNumber;
let currentGameNumber = '';
let currentWinningNumber = '';
// let lastGameNumber;
let showedSkippedNumber = false;
let playerGameSubmission = '';
var gameNumber = 0;
var displayGameNumber;
var currSelectedNumbers = [];

let movieIndexList = [];
for (let i = 0; i < 100; i++) {
    if (demotype === "white") {
        movieIndexList.push(300 + i);
    } else {
        movieIndexList.push(400 + i);
    }
}

const num_prev_scores = 12;

let tempList = [-1, -1, -1, -1];
let numpadSelectedArr = [];
let selectedQueue = new Queue(10);
let historyQueue = new Queue(num_prev_scores);

window.colorBallFirstVidSet = true;
window.colorBallTotalTime = 30;
window.colorBallDelay = 0;
window.colorBallElement = 0;
window.colorBallStartTime = Math.floor(Date.now()) / 1000;
window.colorBallHistory = [];
window.runScript = false;


// document.addEventListener('touchstart', function (e) {
//     if (e.target && e.target.classList.contains('numpad')) {
//         let val = e.target.getAttribute('numval');
//         console.log('numpad ' + val + ' was clicked');
//         numpadSelect(val);
//     }
// });

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('numpad')) {
        let val = e.target.getAttribute('numval');
        console.log('numpad ' + val + ' was clicked');
        numpadSelect(val);
    }
    if (e.target && e.target.classList.contains('emailAddress')) {
        activateEmailAddress();
    }
});

function numpadSelect(val) {
    if (val == null) return;  // could happen if numpad-selection is clicked
    if (betsOpen === false) {
      return;
    }
    if (numpadSelectedArr.length >= 4) return;
    numpadSelectedArr.push(val);
    let numText = numpadSelectedArr.reduce((acc, curr) => {
        return acc + '' + curr;
    }, '');
    document.getElementById('numpad-selection').innerHTML = numText;
    return;
}

function activateEmailAddress() {
  var link = "mailto:colorball923@gmail.com"
         + "?subject=" + encodeURIComponent("My Screenshot");
  window.location.href = link;
}

function cancelReplay() {
  let playsEncoded = Object.entries(plays)
  .map(([id, count]) => `${id}:${count}`)
  .join(",");
  window.location.href = "Screen1.html?store=" + store + "&lastReset=" + lastReset + "&plays=" + playsEncoded;
}

let muted = 1;

//document.getElementById('numpad-delete').addEventListener('click', numpadDelete, false);
//document.getElementById('numpad-submit').addEventListener('click', numpadSubmit, false);
const unmuteBtn = document.getElementById('unmute');
if (unmuteBtn) unmuteBtn.addEventListener('click', toggleMute, false);

const replayBtn = document.getElementById("ReplayButton");
if (replayBtn) replayBtn.addEventListener('click', replayGame, false);

const tooManyBtn = document.getElementById("TooManyReplays");
if (tooManyBtn) tooManyBtn.addEventListener('click', backToStart, false);

//document.getElementById('numpad_mask').style.zIndex = 255;
let runStreamService = true;

// function stopAll() {
//     runStreamService = !runStreamService;
//     if (!runStreamService) {
//         player1.pause();
//         player2.pause();
//         player3.pause();
//         player4.pause();
//         player5.pause();
//         player6.pause();
//         player7.pause();
//         player8.pause();
//         clearInterval(countdownInterval);
//         document.getElementById('stopall').innerHTML = "Go";
//     } else {
//         initiateClock();
//         document.getElementById('stopall').innerHTML = "Stop";
//     }
// }

let reduction = 2;
var readyToBet = false;
console.log('readyToBet was just initialized to false.');
let tempMovie1, tempMovie2, tempMovie3, tempMovie4;


function padWithZeros(n) {
    let returnStr = '0000' + n;
	return returnStr.slice(-4);
}

function toggleMute() {
    //muted = !muted;
    muted = +!muted;  // keeps the numeric (0 or 1) values
    console.log('Toggled the MUTE button');
    //console.log('muted is now ' + muted.toString());
    console.log('muted is now ' + muted);
    if (muted) {
        document.getElementById('unmute').innerHTML = "Unmute";
        if (player1Playing) {
          player1.setVolume(1);
        }
        if (player2Playing) {
          player2.setVolume(1);
        }
        if (player3Playing) {
          player3.setVolume(1);
        }
        if (player4Playing) {
          player4.setVolume(1);
        }
    } else {
        document.getElementById('unmute').innerHTML = "Mute";
        if (player1Playing) {
          player1.setVolume(0);
        }
        if (player2Playing) {
          player2.setVolume(0);
        }
        if (player3Playing) {
          player3.setVolume(0);
        }
        if (player4Playing) {
          player4.setVolume(0);
        }
//        player5.setVolume(0);
//        player6.setVolume(0);
//        player7.setVolume(0);
//        player8.setVolume(0);
//        player5.setVolume(1);
//        player6.setVolume(1);
//        player7.setVolume(1);
//        player8.setVolume(1);
    }
}

function replayGame() {
  //window.location.href = "screen4?faveNums=" + faveNums + "&pronoun=" + pronoun + "&replaying=1";
  let playsEncoded = Object.entries(plays)
  .map(([id, count]) => `${id}:${count}`)
  .join(",");
  
  window.location.href = 
      "Screen3.html?store=" + store +
          '&lastReset=' + lastReset +
          "&faveNums=" + faveNums + 
          "&pronoun=" + pronoun + 
          '&lastFour=' + lastFour +
          '&phonePlays=' + phonePlays +
          '&incr=' + incr +
          '&fakeDay=' + fakeDay +
          '&replaying=' + replaying +
          '&plays=' + playsEncoded;
}

function backToStart() {
  let playsEncoded = Object.entries(plays)
  .map(([id, count]) => `${id}:${count}`)
  .join(",");
  window.location.href = "Screen1.html?store=" + store + "&lastReset=" + lastReset + "&plays=" + playsEncoded;
}

function numpadSubmit(theEvent) {
    // if (!(currSelectedNumbers.length < 10)) return;
    if (!betsOpen) {
      //document.getElementById('numpad-submit').removeEventListener('click', numpadSubmit, false);
      //console.log('The event is cancelable? ' + theEvent.cancelable);
      theEvent.preventDefault();
      theEvent.stopPropagation();
      return false;
    }
    console.log('credit_amount in numpadSubmit() is ' + credit_amount);
    console.log('betsOpen: ' + betsOpen + '; activeSubmit: ' + activeSubmit + '; reduceCount: ' + reduceCount);
    if (!activeSubmit) return;
    if (selectedQueue.length() >= 10) return;
    //if (credit_amount <= 0) return;
    if (numpadSelectedArr.length < 3) return;  // ALLOW 3 DIGITS!!

    let numText = numpadSelectedArr.reduce((acc, curr) => {
        return acc + '' + curr;
    }, '');

    console.log('numText in numpadSubmit() is ' + numText);
    activeSubmit = false;
    document.getElementById('numpad_mask').style.zIndex = 255;
    if (readyToBet) {
      reduceCount = false;  //We might not want to reduce the credits in this Submit handler  2024-01-23  JBL
    } else {
      reduceCount = false;
    }

    console.log('readyToBet: ' + readyToBet + ' betsOpen: ' + betsOpen + '; activeSubmit: ' + activeSubmit + '; reduceCount: ' + reduceCount);
    update_player_and_game(reduceCount);
    //document.getElementById('submittedNum').innerHTML = 'Submitted #: ' + numText;

//    const httpRequest = new XMLHttpRequest();
//    httpRequest.onreadystatechange = receiveCredit2;
//    httpRequest.open('POST', 'credit_use');
//    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//    httpRequest.send(JSON.stringify({ amount: 1, numText: numText, gameNumber: displayGameNumber }));
//     selectedQueue.enqueue(numText);
//     let tempLen = selectedQueue.length();
//                         for(let i = 1; i <= tempLen; i++) {
//                             document.getElementById('selection_row_text_'+i).innerHTML = selectedQueue.elements[tempLen - (i-1) - 1];
//                             document.getElementById('selection_row_text_'+i).style.opacity = 1;
//                         }

}

function numpadDelete() {
    if (!betsOpen) return;
    activeSubmit = true;
    reduceCount = false; // 2023-10-11
    console.log('in numpadDelete(): betsOpen: ' + betsOpen + '; activeSubmit: ' + activeSubmit + '; reduceCount: ' + reduceCount);
    if (numpadSelectedArr.length <= 0) return;
    numpadSelectedArr.pop();
    let numText = numpadSelectedArr.reduce((acc, curr) => {
        return acc + '' + curr;
    }, '');
    document.getElementById('numpad-selection').innerHTML = numText;
    //document.getElementById('submittedNum').innerHTML = 'Submitted #: ' + numText;
    update_player_and_game(reduceCount);
}

// function enterRoom() {
//     let tempTime = new Date(Date.now());
//     tempTime.setMilliseconds(0);
//     tempTime.setSeconds(tempTime.getSeconds() + 1);
//     let tempNow = new Date(Date.now());
//     let delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds();
//     setTimeout(initiateClock(), delay);
// }

// enterRoom();

const wait = function (ms) {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
};

const clock = document.getElementById("countdown_clock");
const clock_info = document.getElementById("clock_text2");
const player_info = document.getElementById("player_text2");
//const marquee_info = document.getElementById("marquee_info");
const top_div = document.getElementById("top_div2");

function updateClock() {
    player_info.style.visibility = 'hidden';
    top_div.style.display = 'block';
    top_div.style.height = '1.4em';
    clock_info.style.visibility = 'visible';
    clock_info.style.display = 'block';
    let interval = Math.floor(window.colorBallTotalTime);
    let newNow = new Date(Date.now());
    let text = interval - (newNow.getSeconds() % 30) - 1;
    console.log('text in updateClock: ' + text);
    if (text == 0) {
      clearInterval(countdownInterval);
      clock_info.innerHTML = 'Initializing...';
      readyToBet = true;
    } else {
      readyToBet = false;
      clock_info.innerHTML = `${text}`;
    }
    console.log('readyToBet: ' + readyToBet);
}

function update_player_and_game(activeReduction) {
    const params = new URLSearchParams(window.location.search);
    let user_name = params.get("user") || "";
    let uvi       = params.get("uvi")  || "";

    displayGameNumber = padWithZeros(parseInt(gameNumber) + 1);
    console.log('displayGameNumber is ' + displayGameNumber);
//    playerGameSubmission = document.getElementById('numpad-selection').innerHTML;
//    if (playerGameSubmission.toString().length < 3) {  // ALLOW 3 DIGITS!!
//      playerGameSubmission = '----';
//    } else {

      if (currentGameNumber != '' && currentWinningNumber != '') {
        if (use3digitsThisTime == false) {  // Use 3 digits on NEXT call to credit_use
          use3digitsThisTime = true;
          return;
        }
        if (playerGameSubmission == currentWinningNumber) {
          //document.getElementById('WinnerAnnouncement').style.display = 'inline-block';
        }
      }
    if (user_name == 'demo') {
      user_name = 'Demo';
    }
    if (credit_amount == 1) {
      var playZ = 'play';
    } else {
      var playZ = 'plays';
    }
    if (credit_amount < 0) {
      remainingGames = 0;
    } else {
      remainingGames = credit_amount;
    }
    player_info.style.visibility = 'visible';
    clock_info.style.visibility = 'hidden';
    clock_info.style.display = 'none';
}

const movie1 = document.getElementById("vid1");
const movie2 = document.getElementById("vid2");
const movie3 = document.getElementById("vid3");
const movie4 = document.getElementById("vid4");
//const movie5 = document.getElementById("vid5");
//const movie6 = document.getElementById("vid6");
//const movie7 = document.getElementById("vid7");
//const movie8 = document.getElementById("vid8");

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

//let player1, player2, player3, player4, player5, player6, player7, player8;
let player1, player2, player3, player4;
let player1Playing = false;
let player2Playing = false;
let player3Playing = false;
let player4Playing = false;

let tempInitialRandomNums = myRand(movieIndexList, 4);
console.log('tempInitialRandomNums is ' +  tempInitialRandomNums);
//let tempInitialRandomVidIds = tempInitialRandomNums.map( num => parseInt(videoList[num], 10));
let tempInitialRandomVidIds = tempInitialRandomNums.map( num => num );
console.log('tempInitialRandomVidIds is ' + tempInitialRandomVidIds);
const playerOptions = {
    controls: 0,
    playsinline: 1,
    autoplay: 1,
    muted: 1,
    loop: 1,
    id: tempInitialRandomVidIds[0],
    width: '100%',
    height: '400'
};

let tempTime = new Date(Date.now());
tempTime.setMilliseconds(0);
tempTime.setSeconds(tempTime.getSeconds() + 1);
let tempNow = new Date(Date.now());
let delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds();
//setTimeout(initiateClock(), delay);
let drawingNumber = padWithZeros(getDrawingNumberFromTime(0)+1);
//alert('in index2 A at selections-drawingnumber...');
document.getElementById('selections-drawingnumber').innerHTML = `Game #: ${drawingNumber}`;

let totalTime = 0;
let waitTime = window.colorBallDelay;
let game_number = 0;

function getDrawingNumber() {
    let now = new Date(Date.now());
    let hour = now.getHours() * 60;
    let mins = now.getMinutes();
    let retValue = hour + mins;
    console.log('in getDrawingNumber(): retValue is ' + retValue);
    return retValue;
}

function isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();
}

function getDrawingNumberFromTime(t) {
    //console.log('t is ' + t);
    let now = new Date();
    if (isDST(now)) {
      //console.log('DT');
      var EasternOffset = -4;  // ET UTC offset during Daylight Time
    } else {
      //console.log('ST');
      var EasternOffset = -5;  // ET UTC offset during Standard Time
    }
    //let now = new Date(t);
    //console.log(`time: ${now}`);
    //console.log(t);
    //console.log(typeof (t));
    let offsetRaw = -now.getTimezoneOffset();
    console.log('offsetRaw: ' + offsetRaw);
    let offset = offsetRaw / 60;
    console.log('offset: ' + offset);
    let offsetAdjustment = EasternOffset - offset;
    console.log('offsetAdjustment: ' + offsetAdjustment);
    let hourRaw = now.getHours() + offsetAdjustment;
    if (hourRaw >= 24) {
      hourRaw = 0;
    }
    console.log('hourRaw: ' + hourRaw);
    let hourPortion = hourRaw * 120;
    let mins = now.getMinutes();
    console.log('hourPortion: ' + hourPortion + ' mins: ' + mins);
    let oldGameNumber = hourPortion + mins + 1;
    console.log('in getDrawingNumberFromTime(): oldGameNumber is ' + oldGameNumber);
    let num_prev_adjustment = num_prev_scores - 1;
    console.log('num_prev_scores: ' + num_prev_scores);
    console.log('num_prev_adjustment: ' + num_prev_adjustment);
    // Alan wants 1440 games per day.  Let's adjust it...
//    let newGameNumber = ((hourRaw * 120) + (mins * 2) + 1) - num_prev_adjustment;
//    if (newGameNumber < 0) {
//      newGameNumber += 2880;
//    }
//    if (newGameNumber > 2880) { // Adjust the Game # so games after midnight are not too large...
//      newGameNumber -= 2880;
//    }
    let newGameNumber = ((hourRaw * 60) + (mins) + 1) - num_prev_adjustment;
    if (newGameNumber < 0) {
      newGameNumber += 1440;
    }
    if (newGameNumber > 1440) { // Adjust the Game # so games after midnight are not too large...
      newGameNumber -= 1440;
    }
    console.log('newGameNumber: ' + newGameNumber);
    // Put the game number into the text box...
    //alert('in getDrawingNumberFromTime() at gameNo...');
    let gameNoDiv = document.getElementById('gameNo');
    gameNoDiv.style.visibility = 'visible';
    gameNoDiv.innerHTML = 'Initializing...';
    return newGameNumber;
}

function getDrawingNumberFromId(ord_id) {
    let ord_target = ord_id;
    let prev_val = document.getElementById('history_drawing_' + ord_target).innerHTML;
    let prev_number = prev_val.substr(6, 4);
    let ret_stuff = parseInt(prev_number);
    if (!isNaN(ret_stuff)) {
      return ret_stuff + 1;
    } else {
      return null;
    }
}

function updateHistory(element) {
    // document.getElementById('history_drawing_' + i).innerHTML = element;
    // document.getElementById('history_drawing_' + i).style.opacity = 1;
    let combinedNums = `${getNumberFromId(element.num1)}${getNumberFromId(element.num2)}${getNumberFromId(element.num3)}${getNumberFromId(element.num4)}`;
    console.log('combinedNums: ' + combinedNums);
    if (game_number == 0) {
        game_number = getDrawingNumberFromTime(element.time);
    } else {
        game_number++;
    }
    if (game_number > 2880) { // Adjust the Game # so games after midnight are not too large...
      game_number -= 2880;
    }

    gameNumber = padWithZeros(game_number);
    alert('in updateHistory() at selections-drawingnumber...');
    document.getElementById('selections-drawingnumber').innerHTML = 'Game #: '+gameNumber;
}

function finishRound(i, t, element) {
    //code
}

function stopMovies() {
  let playsEncoded = Object.entries(plays)
  .map(([id, count]) => `${id}:${count}`)
  .join(",");
  window.location.href = "Screen1.html?store=" + store + "&lastReset=" + lastReset + "&faveNums=" + faveNums + "&pronoun=" + pronoun + '&lastFour=' + lastFour + "&plays=" + playsEncoded;
}


var video1handled = false;
var video2handled = false;
var video3handled = false;
var video4handled = false;
var currWinDigits;

// Central retry manager
class VideoRetryManager {
  constructor(getFallbackId) {
    this.getFallbackId = getFallbackId; // function to supply a new ID
  }

  async safeLoad(player, videoId, label) {
    try {
      const id = await player.loadVideo(videoId);
      console.log(`${label}: video ${id} loaded successfully`);
      return id; // <-- return the resolved ID
    } catch (err) {
      console.error(`${label}: load failed`, err);
      if (err && err.name === 'UnauthorizedError') {
        const newId = await this.getFallbackId(label, videoId);
        if (newId) {
          const id = await player.loadVideo(newId);
          console.log(`${label}: recovered with fallback video ${id}`);
          return id; // <-- return the fallback ID too
        }
      }
    }
  }
}

// Example fallback provider: rotate through a list of IDs
//const fallbackIds = {
//  player2: [111111111, 222222222],
//  player3: [333333333, 444444444]
//};

async function getFallbackId(label, currentId) {
  //const list = fallbackIds[label] || [];
  //return list.shift() || currentId; // fallback to same ID if none left
  return currentId;
}

// Create manager
const retryManager = new VideoRetryManager(getFallbackId);

function nextMovie(movieNumber) {
    let tempMovie;
    let tempPlayer;
    //let tempDoc;
    var currWin;
    var winningNumStr;
    var lastDigit;
    let tempDoc2;
    
    console.log('nextMovie with movieNumber ' + movieNumber.toString());
    //console.log('muted is ' + muted.toString());
    console.log('muted is ' + muted);
    //console.log('keepGoing is ' + keepGoing.toString());

    console.log('window.runScript is ' + window.runScript);
    if (!window.runScript) return;
    if (movieNumber === false) {
      tempDoc2 = document.getElementById("vid4_num_b");
      tempDoc2.style.opacity = 1;
      lastDigit = getNumberFromId(tempList[3]);
      console.log('lastDigit at FALSE: ' + lastDigit);
      //currWin = document.getElementById('winning_number').innerHTML;
      //document.getElementById('winning_number').innerHTML = currWin + lastDigit;
      let combinedNums = `${getNumberFromId(tempList[0])}${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
      //let combinedNums = `${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
      var circleStr = buildDisplayDigits(''+combinedNums);
      document.getElementById('winning_number').innerHTML = `Hit No. ${circleStr}`;
      
      // --------------------------------------
      // URL-BASED STATE (no cookies anymore)
      // --------------------------------------
      const params = new URLSearchParams(window.location.search);
      
      lastReset    = Number(params.get("lastReset")  || 0);
      incr         = Number(params.get("incr") || 0);
      store        = params.get("store")   || "";
      lastFour     = params.get("lastFour")   || "";
      pronoun      = params.get("pronoun")    || "";
      phonePlays   = Number(params.get("phonePlays") || 0);
      faveNums     = params.get("faveNums")   || "";
      playsRaw     = params.get("plays")   || "";
      plays = {};
      
      if (playsRaw.length > 0) {
          playsRaw.split(",").forEach(pair => {
              let [id, count] = pair.split(":");
              plays[id] = Number(count);
          });
      }

      console.log("phonePlays in index2:", phonePlays);
      console.log("lastReset 723 in index2:", lastReset);
      
      // Compute elapsed time safely
      const now = Date.now();
      const playInterval = now - lastReset;
      
      console.log("playInterval is", playInterval);
      
      if (faveNums.length == 4 && faveNums == combinedNums) {
      //if (combinedNums == combinedNums) {
        console.log('WINNER!');
        document.getElementById("WinnerButton").style.visibility = 'visible';
        document.getElementById("ReplayButton").style.visibility = 'hidden';
        if (replayTimeout != null && typeof replayTimeout != "undefined") {
          clearTimeout(replayTimeout);
        }
      } else if (faveNums.length == 3 &&  faveNums == combinedNums.substring(1)) {
        //Allowing a win on the last 3 digits of the winning number
        console.log('WINNER!');
        document.getElementById("WinnerButton").style.visibility = 'visible';
        document.getElementById("ReplayButton").style.visibility = 'hidden';
        if (replayTimeout != null && typeof replayTimeout != "undefined") {
          clearTimeout(replayTimeout);
        }
      } else if (phonePlays < 3) {  // was 5, changed to 3 per Alan
        document.getElementById("WinnerButton").style.visibility = 'hidden';
        document.getElementById("ReplayButton").style.visibility = 'visible';
        var replayTimeout = setTimeout(cancelReplay, 10000);
        //var needToStop = setTimeout(stopMovies, 5000);
      } else {
        console.log('### Too many plays for ' + lastFour);
        document.getElementById('TooManyReplays').style.visibility = 'visible';
        var replayTimeout = setTimeout(cancelReplay, 10000);
      }
      return;
    }
    
    //console.log('colorBallElement is ' + window.colorBallElement);
    switch (movieNumber) {
          case 1:
            console.log('tempInitialRandomVidIds[0] is ' + tempInitialRandomVidIds[0]);
            if (!video1handled) {
              video1handled = true;
                        
              movie1.style.opacity = 1;
              
              // Destroy old player
              movie1.innerHTML = "";
              
              console.log('muted is ' + muted);
              // Build local video element
              movie1.innerHTML = `
                <video 
                  id="player1" 
                  class="localVideo"
                  playsinline
                  ${muted ? "muted" : ""}
                >
                  <source src="./videos/${tempInitialRandomVidIds[0]}.mp4" type="video/mp4">
                </video>
              `;
              
              const player1 = document.getElementById("player1");
              
              console.log(player1.querySelector("source").src);
              // Autoplay when ready
              player1.onloadeddata = () => {
                if (!muted) player1.volume = 1;
                player1.play();
              };
              
              // Events
              player1.onplay = () => console.log("player1 is playing...");
              player1.onpause = () => console.log("player1 is paused...");
              player1.oncanplay = () => {
                player1.muted = false;   // unmute AFTER canplay
                player1.volume = 1;
                player1.play();
              };
              player1.ontimeupdate = () => {
                if (player1.currentTime >= 4.6) {
                  player1.pause();
                  nextMovie(2);
                }
              };
            }
            break;
          case 2:
            console.log('tempInitialRandomVidIds[1] is ' + tempInitialRandomVidIds[0]);
            if (!video2handled) {
              video2handled = true;
                        
              //movie2.style.opacity = 1;
          
              // Update UI for winning number
              tempDoc2 = document.getElementById("vid1_num_b");
              tempDoc2.style.opacity = 1;
              
              lastDigit = getNumberFromId(tempList[0]);
              console.log('lastDigit: ' + lastDigit);
          
              currWinDigits = lastDigit;
              console.log("CASE 2: currWinDigits is " + currWinDigits);
          
              winningNumStr = buildDisplayDigits('' + currWinDigits);
              console.log("CASE 2: winningNumStr is " + winningNumStr);
          
              document.getElementById('winning_number').innerHTML =
                `Hit No. ${winningNumStr}`;
                
              // Destroy old player
              movie2.innerHTML = "";
              
              console.log('muted is ' + muted);
              // Build local video element
              movie2.innerHTML = `
                <video 
                  id="player2" 
                  class="localVideo"
                  playsinline
                  ${muted ? "muted" : ""}
                >
                  <source src="./videos/${tempInitialRandomVidIds[1]}.mp4" type="video/mp4">
                </video>
              `;
              
              const player2 = document.getElementById("player2");
              
              console.log(player2.querySelector("source").src);
              // Autoplay when ready
              player2.onloadeddata = () => {
                if (!muted) player2.volume = 1;
                player2.play();
              };
              
              // Events
              player2.onplay = () => console.log("player2 is playing...");
              player2.onpause = () => console.log("player2 is paused...");
              player2.oncanplay = () => {
                player2.muted = false;   // unmute AFTER canplay
                player2.volume = 1;
                movie2.style.opacity = 1;
                player2.play();
              };
              player2.ontimeupdate = () => {
                if (player2.currentTime >= 4.6) {
                  player2.pause();
                  nextMovie(3);
                }
              };
            }
            break;
          case 3:
            console.log('tempInitialRandomVidIds[2] is ' + tempInitialRandomVidIds[0]);
            if (!video3handled) {
              video3handled = true;
                        
              //movie3.style.opacity = 1;
              // Update UI for winning number
              tempDoc2 = document.getElementById("vid2_num_b");
              tempDoc2.style.opacity = 1;
              
              lastDigit = getNumberFromId(tempList[1]);
              console.log('lastDigit: ' + lastDigit);
          
              currWinDigits = currWinDigits + '' + lastDigit;
              console.log("CASE 3: currWinDigits is " + currWinDigits);
          
              winningNumStr = buildDisplayDigits('' + currWinDigits);
              console.log("CASE 3: winningNumStr is " + winningNumStr);
          
              document.getElementById('winning_number').innerHTML =
                `Hit No. ${winningNumStr}`;
                
              // Destroy old player
              movie3.innerHTML = "";
              
              console.log('muted is ' + muted);
              // Build local video element
              movie3.innerHTML = `
                <video 
                  id="player3" 
                  class="localVideo"
                  playsinline
                  ${muted ? "muted" : ""}
                >
                  <source src="./videos/${tempInitialRandomVidIds[2]}.mp4" type="video/mp4">
                </video>
              `;
              
              const player3 = document.getElementById("player3");
              
              console.log(player3.querySelector("source").src);
              // Autoplay when ready
              player3.onloadeddata = () => {
                if (!muted) player3.volume = 1;
                player3.play();
              };
              
              // Events
              player3.onplay = () => console.log("player3 is playing...");
              player3.onpause = () => console.log("player3 is paused...");
              player3.oncanplay = () => {
                player3.muted = false;   // unmute AFTER canplay
                player3.volume = 1;
                movie3.style.opacity = 1;
                player3.play();
              };
              player3.ontimeupdate = () => {
                if (player3.currentTime >= 4.6) {
                  player3.pause();
                  nextMovie(4);
                }
              };
            }
            break;
          case 4:
            if (!video4handled) {
              video4handled = true;
                        
              //movie4.style.opacity = 1;
              
              // Update UI for winning number
              tempDoc2 = document.getElementById("vid3_num_b");
              tempDoc2.style.opacity = 1;
              lastDigit = getNumberFromId(tempList[2]);
              console.log('lastDigit: ' + lastDigit);
          
              currWinDigits = currWinDigits + '' + lastDigit;
              console.log("CASE 4: currWinDigits is " + currWinDigits);
          
              winningNumStr = buildDisplayDigits('' + currWinDigits);
              console.log("CASE 4: winningNumStr is " + winningNumStr);
          
              document.getElementById('winning_number').innerHTML =
                `Hit No. ${winningNumStr}`;
                
              // Destroy old player
              movie4.innerHTML = "";
              
              console.log('muted is ' + muted);
              // Build local video element
              movie4.innerHTML = `
                <video 
                  id="player4" 
                  class="localVideo"
                  playsinline
                  ${muted ? "muted" : ""}
                >
                  <source src="./videos/${tempInitialRandomVidIds[3]}.mp4" type="video/mp4">
                </video>
              `;
              
              const player4 = document.getElementById("player4");
              
              console.log(player4.querySelector("source").src);
              // Autoplay when ready
              player4.onloadeddata = () => {
                if (!muted) player4.volume = 1;
                player4.play();
              };
              player4.oncanplay = () => {
                player4.muted = false;   // unmute AFTER canplay
                player4.volume = 1;
                movie4.style.opacity = 1;
                player4.play();
              };
              // Events
              player4.onplay = () => console.log("player3 is playing...");
              player4.onpause = () => console.log("player3 is paused...");
              
              player4.ontimeupdate = () => {
                if (player4.currentTime >= 4.6) {
                  player4.pause();
                  nextMovie(false);
                }
              };
          
              // Build combined winning number
              let combinedNums =
                `${getNumberFromId(tempList[0])}` +
                `${getNumberFromId(tempList[1])}` +
                `${getNumberFromId(tempList[2])}` +
                `${getNumberFromId(tempList[3])}`;
          
              let rawGameNumber =
                document.getElementById('selections-drawingnumber').innerHTML;
          
              gameNumber = padWithZeros(parseInt(rawGameNumber.substr(8, 4)));
          
              currentWinningNumber = '';
              for (let key in combinedNums) {
                currentWinningNumber += '' + combinedNums[key];
              }
          
              currentGameNumber = gameNumber;
          
              console.log(
                'A currentGameNumber: ' +
                currentGameNumber +
                ' currentWinningNumber: ' +
                currentWinningNumber
              );
            }
            break;
          default:
            console.log('Reached default of switch');
            break;
    }
}  // END OF FUNCTION NEXTMOVIE()

function getNumberFromId(id) {
    let returnNum;
    if (demotype === "white") {
        if (id < 310) returnNum = 0;
        else if (id < 320) returnNum = 1;
        else if (id < 330) returnNum = 2;
        else if (id < 340) returnNum = 3;
        else if (id < 350) returnNum = 4;
        else if (id < 360) returnNum = 5;
        else if (id < 370) returnNum = 6;
        else if (id < 380) returnNum = 7;
        else if (id < 390) returnNum = 8;
        else if (id < 400) returnNum = 9;
    } else {
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
    }

    return returnNum;
}

function getMiddleNumber(num) {
    return Math.floor(num / 10) % 10;
}

function initiateClock() {
    console.log('initiateClock');
    //clearInterval(countdownInterval);
    //countdownInterval = setInterval(updateClock, 1000);
    updateClock();
}

function buildCircles(faveNumStr) {
  if (typeof faveNumStr == "undefined" || faveNumStr == '' || faveNumStr == null) {
    return false;
  }
  console.log("###faveNumStr is " + faveNumStr);
  var circle1 = faveNumStr.substring(0,1);
  var circle2 = faveNumStr.substring(1,2);
  var circle3 = faveNumStr.substring(2,3);
  var circle4 = faveNumStr.substring(3);
  console.log("###1: " + circle1 + " 2: " + circle2 + " 3: " + circle3 + " 4: " + circle4);
  //document.getElementById('faveNums').innerText = "###Player's No. " + circle1 + circle2 + circle3;
  var circle1Img = './assets/img/Ball' + circle1 + '.png';
  var circle2Img = './assets/img/Ball' + circle2 + '.png';
  var circle3Img = './assets/img/Ball' + circle3 + '.png';
  var circle4Img = './assets/img/Ball' + circle4 + '.png';
  if (faveNumStr.length == 4) {
    var returnStr = "<img class='smallCircle' src='" + circle1Img + "'><img class='smallCircle' src='" + circle2Img + "'><img class='smallCircle' src='" + circle3Img + "'><img class='smallCircle' src='" + circle4Img + "'>";
  } else {
    var returnStr = "<img class='smallCircle' src='" + circle1Img + "'><img class='smallCircle' src='" + circle2Img + "'><img class='smallCircle' src='" + circle3Img + "'>";
  }
  return returnStr;
}

function buildDisplayDigits(displayDigits) {
  console.log("displayDigits is " + displayDigits);
  var circle1 = '';
  var circle2 = '';
  var circle3 = '';
  var circle4 = '';
  var circle1Img = '';
  var circle2Img = '';
  var circle3Img = '';
  var circle4Img = '';
  var returnDigits;
  var numDigits = displayDigits.length;
  if (numDigits == 1) {
    circle1 = displayDigits[0];
    circle1Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle1 + ".png'>";
    returnDigits = circle1Img;
  } else if (numDigits == 2) {
    circle1 = displayDigits[0];
    circle2 = displayDigits[1];
    circle1Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle1 + ".png'>";
    circle2Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle2 + ".png'>";
    returnDigits = circle1Img + circle2Img;
  } else if (numDigits == 3) {
    circle1 = displayDigits[0];
    circle2 = displayDigits[1];
    circle3 = displayDigits[2];
    circle1Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle1 + ".png'>";
    circle2Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle2 + ".png'>";
    circle3Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle3 + ".png'>";
    returnDigits = circle1Img + circle2Img + circle3Img;
  } else if (numDigits == 4) {
    circle1 = displayDigits[0];
    circle2 = displayDigits[1];
    circle3 = displayDigits[2];
    circle4 = displayDigits[3];
    circle1Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle1 + ".png'>";
    circle2Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle2 + ".png'>";
    circle3Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle3 + ".png'>";
    circle4Img = "<img class='smallCircle' src='" + './assets/img/Ball' + circle4 + ".png'>";
    returnDigits = circle1Img + circle2Img + circle3Img + circle4Img;
  } else {
    returnDigits = "What?";
  }
  console.log('In buildDisplayDigits: numDigits is ' + numDigits);
  console.log('In buildDisplayDigits: returnDigits is ' + returnDigits);
  return returnDigits;
}

function getGMTWithColons() {
  const now = new Date();
  const hours   = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function startScript(faveNums, pronoun) {
      console.log('in startScript()... faveNums is ' + faveNums);
      window.runScript = true;
      
      // Always read from URL if faveNums wasn't passed directly
      if (!faveNums) {
          console.log("@@@ Extracting values from URL...");
          const params = new URLSearchParams(window.location.search);
      
          faveNums   = params.get("faveNums")   || "";
          pronoun    = params.get("pronoun")    || "";
          lastFour   = params.get("lastFour")   || "";
          playsRaw   = params.get("plays")   || "";
      
          // NEW PARAMETERS
          phonePlays = Number(params.get("phonePlays"));
          lastReset  = Number(params.get("lastReset"));
          incr       = Number(params.get("incr"));
          fakeDay    = Number(params.get("fakeDay"));
          replaying  = params.get("replaying") === "1";
      
          console.log("@@@ Extracted:", {
              faveNums,
              pronoun,
              lastFour,
              phonePlays,
              lastReset,
              incr,
              fakeDay,
              replaying,
              playsRaw
          });
      }
      
      console.log('lastReset 1185 in index2 is ' + lastReset);
      
      // Build the circles
      const faveNumStr = buildCircles(faveNums);
      
      // Update UI
      let faveNumsDiv = document.getElementById('faveNums');
      faveNumsDiv.style.visibility = 'visible';
      faveNumsDiv.innerHTML =
          "Submitted No. " + faveNumStr;

    //document.getElementById('winning_number').innerHTML = 'Winning #:';

    //let drawingNumber = padWithZeros(getDrawingNumber() + 1);
    let rawGameNumber = document.getElementById('selections-drawingnumber').innerHTML;
    //NOTE:  The above element has style visibility:hidden;
    console.log('rawGameNumber: ' + rawGameNumber);
    gameNumber = parseInt(rawGameNumber.substr(8, 4)) + 1;
    if (gameNumber > 2880) { // Adjust the Game # so games after midnight are not too large...
      gameNumber -= 2880;
    }
    gameNumber = padWithZeros(gameNumber);
    console.log('in startScript()... gameNumber is ' + gameNumber);
    //currentGameNumber = gameNumber;
    //currentGameNumber = '';
    //currentWinningNumber = '';
    //console.log('C currentGameNumber: ' + currentGameNumber + ' currentWinningNumber: ' + currentWinningNumber);
    //alert('in startScript() at selections-drawingnumber...');
    document.getElementById('selections-drawingnumber').innerHTML = `Game #: ${gameNumber}`;

    // Put the game number etc. into the top boxes...
    //var lastFour = tenDigit.substring(6,10);
    //document.getElementById('tenDigit').innerText = "Player I.D. " + lastFour;
    //document.getElementById('faveNums').innerText = "Submitted No. " + faveNums;
    //document.getElementById('faveNums').innerText = "Player's No. " + faveNums;
    document.getElementById('winning_number').innerHTML = "Hit No. <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span>";
    //document.getElementById('winning_number').innerHTML = "Winning No. <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span>";
    //alert('in startScript() at gameNo...');
    let gameNoDiv = document.getElementById('gameNo');
    gameNoDiv.style.visibility = 'visible';
    
    /* USE GMT instead of gamenumber: */
    let GMT = getGMTWithColons();
    gameNoDiv.innerHTML = 'GMT: ' + GMT;
    //gameNoDiv.innerHTML = 'Game No. ' + gameNumber;
    
    if (muted) {
        document.getElementById('unmute').innerHTML = "Unmute";
//        player1.setVolume(0);
//        player2.setVolume(0);
//        player3.setVolume(0);
//        player4.setVolume(0);
//        player5.setVolume(0);
//        player6.setVolume(0);
//        player7.setVolume(0);
//        player8.setVolume(0);
    } else {
        document.getElementById('unmute').innerHTML = "Mute";
//        player1.setVolume(1);
//        player2.setVolume(1);
//        player3.setVolume(1);
//        player4.setVolume(1);
//        player5.setVolume(1);
//        player6.setVolume(1);
//        player7.setVolume(1);
//        player8.setVolume(1);
    }
    
    console.log('calling nextMovie(1) in startScript()...');
    nextMovie(1);
}

function tallyZero4() {
  if (httpRequest4.readyState === XMLHttpRequest.DONE) {
      console.log('httpRequest4.status in tallyZero4: ', httpRequest4.status);
      // console.info(httpRequest);
      if (httpRequest4.status === 200) {
          console.log('received response in tallyZero4');
      } else {
          console.log('There was a problem with the request for tallyZero4.');
      }
  }
}

function tallyZero3() {
  if (httpRequest4.readyState === XMLHttpRequest.DONE) {
      console.log('httpRequest4.status in tallyZero3: ', httpRequest4.status);
      // console.info(httpRequest);
      if (httpRequest4.status === 200) {
          console.log('received response in tallyZero3');
      } else {
          console.log('There was a problem with the request for tallyZero3.');
      }
  }
}

function displayTally() {
  if (httpRequest2.readyState === XMLHttpRequest.DONE) {
    console.log('httpRequest2.status in displayTally: ', httpRequest2.status);
    if (httpRequest2.status === 200) {
      let data = JSON.parse(httpRequest2.responseText);
      console.log('data in displayTally:');
      for (let key in data) {
        console.log('key: ' + key + ' ' + data[key]);
      }
      var tallyCount4 = data['tallyCount4'];
      var tallyCount3 = data['tallyCount3'];
      document.getElementById('zeroTally4').innerHTML = tallyCount4;
      document.getElementById('zeroTally3').innerHTML = tallyCount3;
    }
  }
}

function receiveCredit() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log('httpRequest.status in receiveCredit: ', httpRequest.status);
        // console.info(httpRequest);
        if (httpRequest.status === 200) {
            console.log('received response in receiveCredit');
            let data = JSON.parse(httpRequest.responseText);
            console.log('data in receiveCredit: ' + data);
            document.getElementById('credit').innerHTML = `${data.credit}`;
            credit_amount = parseInt(data.credit, 10); // Commented 11-08-2023
            console.log('credit_amount: ' + credit_amount + ' in receiveCredit()'); // Commented 11-08-2023
        } else {
            console.log('There was a problem with the request.');
        }
    }
}

function receiveCredit2() {
        if (httpRequest3.readyState === XMLHttpRequest.DONE) {
            if (httpRequest3.status === 200) {
                console.log('received response in receiveCredit2');
                let data = JSON.parse(httpRequest3.responseText);
                console.log('data in receiveCredit2:');
                for (let key in data) {
                  console.log('key : ' + key + ' ' + data[key]);
                }

                let numText = numpadSelectedArr.reduce((acc, curr) => {
                    return acc + '' + curr;
                }, '');

                console.log('numText in receiveCredit2() is ' + numText);
                if (data.msg === 'too many bets') {
                    //TODO: print proper message
                    document.getElementById('TooManyBets').style.display = 'inline-block';   // Disabled 10-31-2023
                    document.getElementById('TooManyBets2').style.display = 'inline-block';   // Disabled 10-31-2023
                    document.getElementById('numpad_mask').style.zIndex = 255;
                    return;
                } else {
                    //document.getElementById('credit').innerHTML = `$${data.credit}`;
                    credit_amount = parseInt(data.credit, 10);
                    console.log('credit_amount in receiveCredit2() is ' + credit_amount);
                     //TODO: check to make sure a duplicate is not being entered - give feedback to user if true
                     currSelectedNumbers.push(numText);
                     let selNums = currSelectedNumbers.reduce((acc, cur) => {
                         return `${acc}<div class="col-5">${cur}</div>`;
                     }, '');
//                     document.getElementById('selected-number').innerHTML = `<div class="row">${selNums}</div>`;
//                    if (selectedQueue.length() < 10) {
//                        selectedQueue.enqueue(numText);
//                        let queueLen = selectedQueue.length();
//                        for(let i = 1; i <= queueLen; i++) {
//                            document.getElementById('selection_row_text_'+i).innerHTML = selectedQueue.elements[queueLen - (i-1) - 1];
//                            document.getElementById('selection_row_text_'+i).style.opacity = 1;
//                        }
//                    }
//                    document.getElementById('numpad-selection').innerHTML = '';
//                    numpadSelectedArr = [];
                }
            } else {
                console.log('There was a problem with the request.');
            }
        }
}

function catchError(e) {
    console.log('Error ' + e + ' at receiveCredit code...');
}

//console.log('Before general receiveCredit code...');

//const httpRequest = new XMLHttpRequest();
//const httpRequest2 = new XMLHttpRequest();
//const httpRequest3 = new XMLHttpRequest();
//const httpRequest4 = new XMLHttpRequest();

//httpRequest.onreadystatechange = receiveCredit;
//httpRequest.addEventListener('error', catchError);
//httpRequest.open('GET', 'credit');
//httpRequest.send();
//console.log('After general receiveCredit code...');
//
//httpRequest2.onreadystatechange = displayTally;
//httpRequest2.open('GET', 'get_tally');
//httpRequest2.send();

function moveBufferedVideoToEnd(data, eventType, moviePlayer) {
    console.log('BUFFERED COMPLETE: ', eventType);
    console.log(data);
    console.log('moviePlayer: ', moviePlayer);
    moviePlayer.getDuration().then((duration) => {
        console.log(`BUFFERED:: duration: ${duration}`)
        moviePlayer.setCurrentTime((duration - 0.05)).then(() => {
            // moviePlayer.play().then(() => {
            moviePlayer.pause();
            document.getElementById("vid1_num_b").style.opacity = 1;
            document.getElementById("vid2_num_b").style.opacity = 1;
            document.getElementById("vid3_num_b").style.opacity = 1;
            document.getElementById("vid4_num_b").style.opacity = 1;
            // });
        });
    });
    moviePlayer.off(eventType);
}

let currVideoList;

new Promise(function(resolve, reject) {
  setTimeout(() => resolve(), 200); // (*)
}).then(function() { // (**)
  doCloseBets();
  return;
}).then(function() { // (***)
  //doVideos(nextVideos);
  //doVideos([404, 434, 427, 484]);
  currVideoList = tempInitialRandomNums;
  doVideos(currVideoList);
  return;
}).then(function() {
  doOpenBets();
  return;
}).then(function() {
  setTimeout(doStartVids, 1000);
  return;
});

function doInitStuff(data) {
  //console.log('data in doInitStuff:');
  let returnStuff = [];
  for (let key in data) {
    //console.log('key: ' + key + ' ' + data[key]);
    for (let key2 in data[key]) {
      //console.log('key2: ' + key2 + ' ' + data[key][key2]);
      if (key2 == 'num1' || key2 == 'num2' || key2 == 'num3' || key2 == 'num4') {
        returnStuff.push(data[key][key2]);
      }
    }
    //console.log('in doInitStuff()... returnStuff:');
    //for (var i = 0; i < returnStuff.length; i++) {
    //  console.log(returnStuff[i]);
    //}
    break;
	}
	return returnStuff;
}

function doCloseBets() {
    console.log('closeBets');
    betsOpen = false;
    activeSubmit = false;
    reduceCount = false;
    console.log('betsOpen: ' + betsOpen + '; activeSubmit: ' + activeSubmit + '; reduceCount: ' + reduceCount);
    // if (!showedSkippedNumber) {
    //     showedSkippedNumber = true;
    //     updateHistory(lastWinningNumber);
    // }
    //document.getElementById('interim_image').style.visibility = 'visible';
    document.getElementById('vids0').style.display = 'none';
    document.getElementById('vids1').style.display = 'none';
    document.getElementById("vid1_num_b").style.opacity = 0;
    document.getElementById("vid2_num_b").style.opacity = 0;
    document.getElementById("vid3_num_b").style.opacity = 0;
    document.getElementById("vid4_num_b").style.opacity = 0;
//    document.querySelectorAll('.numpad').forEach(element => {
//        element.classList.add('dithered');
//    });
    window.colorBallElement = 0;
    if (window.colorBallFirstVidSet) {
        document.getElementById('vids0').style.display = 'flex';
        document.getElementById('vids1').style.display = 'none';
    } else {
        document.getElementById('vids0').style.display = 'none';
        document.getElementById('vids1').style.display = 'flex';
    }
    totalTime = window.colorBallTotalTime;
    waitTime = window.colorBallDelay;
    movie1.style.opacity = 0;
    movie2.style.opacity = 0;
    movie3.style.opacity = 0;
    movie4.style.opacity = 0;
//    movie5.style.opacity = 0;
//    movie6.style.opacity = 0;
//    movie7.style.opacity = 0;
//    movie8.style.opacity = 0;
//    document.getElementById("vid1_num").style.opacity = 0;
//    document.getElementById("vid2_num").style.opacity = 0;
//    document.getElementById("vid3_num").style.opacity = 0;
//    document.getElementById("vid4_num").style.opacity = 0;
    document.getElementById("vid1_num_b").style.opacity = 0;
    document.getElementById("vid2_num_b").style.opacity = 0;
    document.getElementById("vid3_num_b").style.opacity = 0;
    document.getElementById("vid4_num_b").style.opacity = 0;
    //updateClock();
}

function getUrlFromId(id) {
    return parseInt(videoList[`${id}`], 10);
}

function doVideos(data) {
    console.log('in doVideos()...');
    console.log(data);
//    tempList[0] = data.arr[0];
//    tempList[1] = data.arr[1];
//    tempList[2] = data.arr[2];
//    tempList[3] = data.arr[3];
    tempList[0] = data[0];
    tempList[1] = data[1];
    tempList[2] = data[2];
    tempList[3] = data[3];

    if (window.colorBallFirstVidSet) {
        tempMovie1 = player1;
//        tempMovie2 = player2;
//        tempMovie3 = player3;
//        tempMovie4 = player4;
    } else {
//        tempMovie1 = player5;
//        tempMovie2 = player6;
//        tempMovie3 = player7;
//        tempMovie4 = player8;
    }

    // const rootDir = 'https://player.vimeo.com/video';

//    tempMovie1.loadVideo(getUrlFromId(tempList[0])).then((id) => {
//        //tempMovie1.pause();
//    });

//    tempMovie2.loadVideo(getUrlFromId(tempList[1])).then((id) => {
//        //tempMovie2.pause();
//    });

//    tempMovie3.loadVideo(getUrlFromId(tempList[2])).then((id) => {
//        //tempMovie3.pause();
//    });

//    tempMovie4.loadVideo(getUrlFromId(tempList[3])).then((id) => {
//        //tempMovie4.pause();
//    });

//    document.getElementById("vid1_num").style.opacity = 0;
//    document.getElementById("vid2_num").style.opacity = 0;
//    document.getElementById("vid3_num").style.opacity = 0;
//    document.getElementById("vid4_num").style.opacity = 0;
    document.getElementById("vid1_num_b").style.opacity = 0;
    document.getElementById("vid2_num_b").style.opacity = 0;
    document.getElementById("vid3_num_b").style.opacity = 0;
    document.getElementById("vid4_num_b").style.opacity = 0;
    // console.log(`data.arr: [${data.arr[0]}, ${data.arr[1]}, ${data.arr[2]}, ${data.arr[3]}]`);
//    document.getElementById("vid1_num").innerHTML = `${getNumberFromId(data.arr[0])}`;
//    document.getElementById("vid2_num").innerHTML = `${getNumberFromId(data.arr[1])}`;
//    document.getElementById("vid3_num").innerHTML = `${getNumberFromId(data.arr[2])}`;
//    document.getElementById("vid4_num").innerHTML = `${getNumberFromId(data.arr[3])}`;
//    document.getElementById("vid1_num_b").innerHTML = `${getNumberFromId(data.arr[0])}`;
//    document.getElementById("vid2_num_b").innerHTML = `${getNumberFromId(data.arr[1])}`;
//    document.getElementById("vid3_num_b").innerHTML = `${getNumberFromId(data.arr[2])}`;
//    document.getElementById("vid4_num_b").innerHTML = `${getNumberFromId(data.arr[3])}`;
    document.getElementById("vid1_num_b").innerHTML = `${getNumberFromId(data[0])}`;
    document.getElementById("vid2_num_b").innerHTML = `${getNumberFromId(data[1])}`;
    document.getElementById("vid3_num_b").innerHTML = `${getNumberFromId(data[2])}`;
    document.getElementById("vid4_num_b").innerHTML = `${getNumberFromId(data[3])}`;
}

function doOpenBets() {
    console.log('openBets');
    //document.getElementById('numpad_mask').style.zIndex = 0;
    betsOpen = true;
    activeSubmit = true;
    reduceCount = true;  // 2023-10-11
    console.log('betsOpen: ' + betsOpen + '; activeSubmit: ' + activeSubmit + '; reduceCount: ' + reduceCount);
    //document.getElementById('numpad-submit').addEventListener('click', numpadSubmit, false);
    // console.log('betsOpen: ', betsOpen);
//    document.querySelectorAll('.numpad').forEach(element => {
//        element.classList.remove('dithered');
//    });
}

function doStartVids() {
    console.info('startVids');
//    player1.on('play', () => { console.log('player1 is playing...'); });
//    player1.on('pause', () => { console.log('player1 is paused...'); });
//    player1.on('ended', () => { console.log('player1 calling nextMovie()...'); nextMovie(); });
//    player2.on('play', () => { console.log('player2 is playing...'); });
//    player2.on('ended', () => { nextMovie(); });
//    player2.on('pause', () => { console.log('player2 is paused...'); });
//    player3.on('play', () => { console.log('player3 is playing...'); });
//    player3.on('ended', () => { nextMovie(); });
//    player3.on('pause', () => { console.log('player3 is paused...'); });
//    player4.on('play', () => { console.log('player4 is playing...'); });
//    player4.on('ended', () => { nextMovie(false); });
//    player4.on('pause', () => { console.log('player4 is paused...'); });
//    player5.on('ended', () => { nextMovie(); });
//    player6.on('ended', () => { nextMovie(); });
//    player7.on('ended', () => { nextMovie(); });
//    player8.on('ended', () => { nextMovie(false); });
    // console.log('startVids: \n' + new Date(Date.now()));
    if (!showedSkippedNumber) {
        //console.info(`showSkippedNumber: ${showedSkippedNumber}`);
        showedSkippedNumber = true;
        //updateHistory(lastWinningNumber);
        // return;
    }
//    document.querySelectorAll('.numpad').forEach(element => {
//        element.classList.remove('dithered');
//    });
    document.getElementById('interim_image').style.visibility = 'hidden';
    //document.getElementById('numpad-selection').innerText = '';
    //numpadSelectedArr = [];
    update_player_and_game(reduceCount);
    // faveNums and pronoun come into this script
    // from screen5.html...
    startScript(faveNums, pronoun);
}

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

//const socket = new WebSocket('wss://colorball-ads.com/:443');
//const socket = new WebSocket('wss://colorballnumbers.com/:443');

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
var gameNumber;
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

let muted = false;

//document.getElementById('numpad-delete').addEventListener('click', numpadDelete, false);
//document.getElementById('numpad-submit').addEventListener('click', numpadSubmit, false);
document.getElementById('unmute').addEventListener('click', toggleMute, false);
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
    muted = !muted;
    console.log('Toggled the MUTE button');
    console.log('muted is now ' + muted.toString());
    if (muted) {
        document.getElementById('unmute').innerHTML = "Unmute";
    } else {
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
        document.getElementById('unmute').innerHTML = "Mute";
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
//        player5.setVolume(1);
//        player6.setVolume(1);
//        player7.setVolume(1);
//        player8.setVolume(1);
    }
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
    let user_name = decodeURI(getCookie("user"));
    let uvi = decodeURI(getCookie("uvi"));
    console.log('uvi from cookie in update_player_and_game() is ' + uvi);

    /* Let's store the uvi in local storage: */
    if (uvi != 0 && uvi != null && uvi != '') {
      console.log('Setting localStorage uvi to ' + uvi + ' in update_player_and_game()...');
      window.localStorage.setItem('uvi', JSON.stringify(uvi));
    }

//    httpRequest2.onreadystatechange = displayTally;
//    httpRequest2.open('GET', 'get_tally');
//    httpRequest2.send();

    //console.log('uvi in cookie is ' + uvi);
    //clearInterval(countdownInterval);
    displayGameNumber = padWithZeros(parseInt(gameNumber) + 1);
//    playerGameSubmission = document.getElementById('numpad-selection').innerHTML;
//    if (playerGameSubmission.toString().length < 3) {  // ALLOW 3 DIGITS!!
//      playerGameSubmission = '----';
//    } else {

      if (currentGameNumber != '' && currentWinningNumber != '') {
        if (use3digitsThisTime == false) {  // Use 3 digits on NEXT call to credit_use
          use3digitsThisTime = true;
          return;
        }
        //console.log('B currentGameNumber: ' + currentGameNumber + ' currentWinningNumber: ' + currentWinningNumber);
//        httpRequest3.onreadystatechange = receiveCredit2;
//        httpRequest3.open('POST', 'credit_use');
//        httpRequest3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//        httpRequest3.send(JSON.stringify({ amount: 1, numText: playerGameSubmission, winningNumber: currentWinningNumber, gameNumber: currentGameNumber, activeReduction: activeReduction }));

        // Tally ALL submissions  // 2023-11-17
//        if (playerGameSubmission.toString().length == 4) {
//          httpRequest4.onreadystatechange = tallyZero4;
//          httpRequest4.open('POST', 'tallyZero4');
//          httpRequest4.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//          httpRequest4.send(JSON.stringify({ player_id: uvi, player_name: user_name }));
//        }
//        if (playerGameSubmission.toString().length == 3) {
//          httpRequest4.onreadystatechange = tallyZero3;
//          httpRequest4.open('POST', 'tallyZero3');
//          httpRequest4.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//          httpRequest4.send(JSON.stringify({ player_id: uvi, player_name: user_name }));
//        }

        if (playerGameSubmission == currentWinningNumber) {
          //document.getElementById('WinnerAnnouncement').style.display = 'inline-block';
        }
      //}

//      if (activeReduction == true) {   // Use false && to prevent reduction in credits  10-31-2023
//        credit_amount--;
//        if (credit_amount < 0) {
//          credit_amount = 0;
//          playerGameSubmission = '----';
//          document.getElementById('FreePlaysDiv').style.display = 'inline-block';   // Disabled 10-31-2023
//          document.getElementById('FreePlaysDiv2').style.display = 'inline-block';   // Disabled 10-31-2023
//          document.getElementById('numpad_mask').style.zIndex = 255;
//        }
//      }
//      console.log('credit_amount in update_player_and_game() is ' + credit_amount);
    }
    if (user_name == 'demo') {
      user_name = 'Demo';
    }
    // Until we can get the user's phone number:  Put in underscores...
    //user_name = "__________";
    //player_info.innerHTML = `Submitted No. ${playerGameSubmission}&nbsp;&nbsp;&nbsp;Game No.  ${displayGameNumber}`;
    //player_info.innerHTML = `${user_name}&apos;s No. 
    player_info.innerHTML = `Selected No.:  ${playerGameSubmission}&nbsp;&nbsp;&nbsp;Game No. ${displayGameNumber}`;
    //marquee_info.innerHTML = `WELCOME, ${user_name} of postal code 23456, AZ. You have ______ more free plays today. Good Luck!`;
    //top_div.style.height = 0;
    //top_div.style.display = 'none';
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
    //marquee_info.innerHTML = `WELCOME, ${user_name}. You have ${remainingGames} more free ${playZ} today.`;
    //if (user_name == 'Demo' || remainingGames == 0) {
      // don't report the games remaining
    //} else {
    //  marquee_info.innerHTML = `${user_name} has ${remainingGames} more ${playZ} today.`;   // Disabled 10-31-2023
    //}
    //player_info.style.display = 'none';
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
let player1Playing;
let player2Playing;
let player3Playing;
let player4Playing;
let tempInitialRandomNums;
let tempInitialRandomVidIds;

doInitStuff();

const playerOptions = {
    controls: false,
    playsinline: true,
    autoplay: true,
    muted: muted,
    id: tempInitialRandomVidIds[0],
    width: '100%',
    height: '400'
};

//player1 = new Player(movie1, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[1];
//player2 = new Player(movie2, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[2];
//player3 = new Player(movie3, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[3];
//player4 = new Player(movie4, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[4];
//player5 = new Player(movie5, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[5];
//player6 = new Player(movie6, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[6];
//player7 = new Player(movie7, playerOptions);
//playerOptions.id = tempInitialRandomVidIds[7];
//player8 = new Player(movie8, playerOptions);

//let countdownInterval = setInterval(updateClock, 1000);
// const history = document.getElementById("history");
//clearInterval(countdownInterval);
//updateClock();

//player1.on('ended', () => { nextMovie(); });
//player2.on('ended', () => { nextMovie(); });
//player3.on('ended', () => { nextMovie(); });
//player4.on('ended', () => { nextMovie(false); });
//player5.on('ended', () => { nextMovie(); });
//player6.on('ended', () => { nextMovie(); });
//player7.on('ended', () => { nextMovie(); });
//player8.on('ended', () => { nextMovie(false); });

// let totalTimeField = document.getElementById("totalSeconds");
// let delayTimeField = document.getElementById("betweenVids");

let tempTime = new Date(Date.now());
tempTime.setMilliseconds(0);
tempTime.setSeconds(tempTime.getSeconds() + 1);
let tempNow = new Date(Date.now());
let delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds();
//setTimeout(initiateClock(), delay);
let drawingNumber = padWithZeros(getDrawingNumberFromTime(0)+1);
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
      //alert('DT');
      var EasternOffset = -4;  // ET UTC offset during Daylight Time
    } else {
      //alert('ST');
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
    let newGameNumber = ((hourRaw * 120) + (mins * 2) + 1) - num_prev_adjustment;
    if (newGameNumber < 0) {
      newGameNumber += 2880;
    }
    if (newGameNumber > 2880) { // Adjust the Game # so games after midnight are not too large...
      newGameNumber -= 2880;
    }
    console.log('newGameNumber: ' + newGameNumber);
    // Put the game number into the text box...
    //document.getElementById('gameNo').innerHTML = 'Game No. ' + newGameNumber;
    document.getElementById('gameNo').innerHTML = 'Initializing...';
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

//    historyQueue.enqueue('Game #'+padWithZeros(game_number)+': '+combinedNums);
    gameNumber = padWithZeros(game_number);
    document.getElementById('selections-drawingnumber').innerHTML = 'Game #: '+gameNumber;

//    let historyLen = historyQueue.length();
//    for (let i = 1; i <= historyLen; i++) {
//        // updateHistory(i, historyQueue.elements[historyLen - (i - 1) - 1]);
//        document.getElementById('history_drawing_'+i).innerHTML = historyQueue.elements[historyLen - (i-1) - 1];
//        document.getElementById('history_drawing_'+i).style.opacity = 1;
//    }
}

function finishRound(i, t, element) {
    //code
}

function stopMovies() {
    window.location.href = "Screen1.html?lastFour=" + lastFour + "&faveNums=" + faveNums + "&pronoun=" + pronoun;
}

//function nextMovie(keepGoing = true) {
//    let tempMovie;
//    let tempPlayer;
//    //let tempDoc;
//    let currWin;
//    let lastDigit;
//    let tempDoc2;
//    
//    console.log('nextMovie');
//    console.log('muted is ' + muted.toString());
//    console.log('keepGoing is ' + keepGoing.toString());
//
//    if (!window.runScript) return;
//    if (keepGoing == false) {
//      tempDoc2 = document.getElementById("vid4_num_b");
//      tempDoc2.style.opacity = 1;
//      lastDigit = getNumberFromId(tempList[3]);
//      console.log('lastDigit: ' + lastDigit);
//      //currWin = document.getElementById('winning_number').innerHTML;
//      //document.getElementById('winning_number').innerHTML = currWin + lastDigit;
//      let combinedNums = `${getNumberFromId(tempList[0])}${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
//      document.getElementById('winning_number').innerHTML = `Winning No. ${combinedNums}`;
//      var needToStop = setTimeout(stopMovies, 5000);
//      return;
//    }
//    
//    console.log('colorBallElement is ' + window.colorBallElement);
//    switch (window.colorBallElement) {
//        case 0:
//            player1 = new Player(movie1, playerOptions);
//            player1.on('play', () => { console.log('player1 is playing...'); });
//            player1.on('pause', () => { console.log('player1 is paused...'); });
//            player1.on('timeupdate', (filmtime) => { 
//              for (let x in filmtime) {
//                if (x == 'seconds' && filmtime[x] >= 4.6) {
//                  player1.pause();
//                  //setTimeout(nextMovie, 1000);
//                  if (window.colorBallElement == 0) {
//                    console.log('in player1 timeupdate calling nextMovie() with case ' + window.colorBallElement);
//                    nextMovie();
//                  }
//                  break;
//                }
//              }
//            });
//            player1.loadVideo(getUrlFromId(tempList[0])).then((id) => {
//                console.log('video1 id is ' + id);
//            });
//            player1.setVolume(1);
//            movie1.style.opacity = 1;
//            console.log('calling player1.play() with case ' + window.colorBallElement);
//            player1.play();
//            break;
//        case 1:
//            tempDoc2 = document.getElementById("vid1_num_b");
//            tempDoc2.style.opacity = 1;
//            lastDigit = getNumberFromId(tempList[0]);
//            console.log('lastDigit: ' + lastDigit);
//            currWin = document.getElementById('winning_number').innerHTML;
//            if (currWin.substring(0,20) == 'Winning No. <span cl') {
//              document.getElementById('winning_number').innerHTML = `Winning No. ${lastDigit}`;
//            }
//            //tempDoc = document.getElementById("vid2_num");
//            //tempDoc2 = document.getElementById("vid2_num_b");
//            playerOptions.id = tempInitialRandomVidIds[1];
//            player2 = new Player(movie2, playerOptions);
//            player2.on('play', () => { console.log('player2 is playing...'); });
//            player2.on('pause', () => { console.log('player2 is paused...'); });
//            player2.on('timeupdate', (filmtime) => { 
//              for (let y in filmtime) {
//                if (y == 'seconds' && filmtime[y] >= 4.6) {
//                  player2.pause();
//                  //setTimeout(nextMovie, 1000);
//                  if (window.colorBallElement == 1) {
//                    console.log('in player2 timeupdate calling nextMovie() with case ' + window.colorBallElement);
//                    nextMovie();
//                  }
//                  break;
//                }
//              }
//            });
//            player2.loadVideo(getUrlFromId(tempList[1])).then((id) => {
//                console.log('video2 id is ' + id);
//            });
//            player2.setVolume(1);
//            movie2.style.opacity = 1;
//            //tempPlayer.setCurrentTime(0);
//            console.log('calling player2.play() with case ' + window.colorBallElement);
//            player2.play();
//            //tempDoc.style.opacity = 1;
//            break;
//        case 2:
//            tempDoc2 = document.getElementById("vid2_num_b");
//            tempDoc2.style.opacity = 1;
//            lastDigit = getNumberFromId(tempList[1]);
//            console.log('lastDigit: ' + lastDigit);
//            currWin = document.getElementById('winning_number').innerHTML;
//            document.getElementById('winning_number').innerHTML = currWin + lastDigit;
//            //tempDoc = document.getElementById("vid3_num");
//            playerOptions.id = tempInitialRandomVidIds[2];
//            player3 = new Player(movie3, playerOptions);
//            player3.on('play', () => { console.log('player3 is playing...'); });
//            player3.on('pause', () => { console.log('player3 is paused...'); });
//            player3.on('timeupdate', (filmtime) => { 
//              for (let z in filmtime) {
//                if (z == 'seconds' && filmtime[z] >= 4.6) {
//                  player3.pause();
//                  //setTimeout(nextMovie, 1000);
//                  if (window.colorBallElement == 2) {
//                    console.log('in player3 timeupdate calling nextMovie() with case ' + window.colorBallElement);
//                    nextMovie();
//                  }
//                  break;
//                }
//              }
//            });
//            player3.loadVideo(getUrlFromId(tempList[2])).then((id) => {
//                console.log('video3 id is ' + id);
//            });
//            player3.setVolume(1);
//            movie3.style.opacity = 1;
//            //tempPlayer.setCurrentTime(0);
//            console.log('calling player3.play() with case ' + window.colorBallElement);
//            player3.play();
//            //tempDoc.style.opacity = 1;
//            break;
//        case 3:
//        //default:
//            //tempDoc = document.getElementById("vid4_num");
//            tempDoc2 = document.getElementById("vid3_num_b");
//            tempDoc2.style.opacity = 1;
//            lastDigit = getNumberFromId(tempList[2]);
//            console.log('lastDigit: ' + lastDigit);
//            currWin = document.getElementById('winning_number').innerHTML;
//            document.getElementById('winning_number').innerHTML = currWin + lastDigit;
//            playerOptions.id = tempInitialRandomVidIds[3];
//            player4 = new Player(movie4, playerOptions);
//            player4.on('play', () => { console.log('player4 is playing...'); });
//            player4.on('pause', () => { console.log('player4 is paused...'); });
//            player4.on('timeupdate', (filmtime) => { 
//              for (let k in filmtime) {
//                if (k == 'seconds' && filmtime[k] >= 4.6) {
//                  player4.pause();
//                  if (window.colorBallElement == 3) {
//                    console.log('in player4 timeupdate calling nextMovie() with case ' + window.colorBallElement);
//                    nextMovie();
//                  }
//                  break;
//                }
//              }
//            });
//            player4.loadVideo(getUrlFromId(tempList[3])).then((id) => {
//                console.log('video4 id is ' + id);
//            });
//            player4.setVolume(1);
//             //   tempPlayer = player5;
//             //   tempMovie = movie5;
//            movie4.style.opacity = 1;
//            //tempPlayer.setCurrentTime(0);
//            console.log('calling player4.play() with case ' + window.colorBallElement);
//            player4.play();
//            let combinedNums = `${getNumberFromId(tempList[0])}${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
//            //historyQueue.enqueue('Game #'+padWithZeros(getDrawingNumber())+': '+combinedNums);
//            //let gameNumber = padWithZeros(getDrawingNumber()+1);
//            let rawGameNumber = document.getElementById('selections-drawingnumber').innerHTML;
//            //NOTE:  The above element has style visibility:hidden;
//            gameNumber = padWithZeros(parseInt(rawGameNumber.substr(8, 4)));
//            //historyQueue.enqueue('Game #'+gameNumber+': '+combinedNums);
//            //document.getElementById('selections-drawingnumber').innerHTML = 'Game #: '+(gameNumber);
//            currentWinningNumber = '';
//            for (let key in combinedNums) {
//              currentWinningNumber += '' + combinedNums[key];
//            }
//            currentGameNumber = gameNumber;
//            console.log('A currentGameNumber: ' + currentGameNumber + ' currentWinningNumber: ' + currentWinningNumber);
////            let historyLen = historyQueue.length();
////            for (let i = 1; i <= historyLen; i++) {
////                // updateHistory(i, historyQueue.elements[historyLen - (i - 1) - 1]);
////                document.getElementById('history_drawing_'+i).innerHTML = historyQueue.elements[historyLen - (i-1) - 1];
////                document.getElementById('history_drawing_'+i).style.opacity = 1;
////            }
//            //document.getElementById('winning_number').innerHTML = `Winning No. ${combinedNums}`;
//            break;
//        default:
//            console.log('Reached default of switch');
//            break;
//    }
//    window.colorBallElement += 1;
//
////    waitTime = 0;
////    if (window.colorBallElement === 3) {
////        window.colorBallFirstVidSet = !window.colorBallFirstVidSet;
////    }
//
////    await wait(waitTime).then(() => {
////      window.colorBallElement += 1;
////        if (window.colorBallElement === 4) {
////            window.colorBallElement = 0;
////        }
////        if (window.colorBallElement > 0) {
////            tempMovie.style.opacity = 1;
////            tempPlayer.setCurrentTime(0);
////            tempPlayer.play();
////        }
////    });
//}  // END OF FUNCTION NEXTMOVIE()

let video1handled = false;
let video2handled = false;
let video3handled = false;
let video4handled = false;

function nextMovie(movieNumber) {
    let tempMovie;
    let tempPlayer;
    //let tempDoc;
    let currWin;
    let lastDigit;
    let tempDoc2;
    
    console.log('nextMovie with movieNumber ' + movieNumber.toString());
    console.log('muted is ' + muted.toString());
    //console.log('keepGoing is ' + keepGoing.toString());

    if (!window.runScript) return;
    if (movieNumber === false) {
      tempDoc2 = document.getElementById("vid4_num_b");
      tempDoc2.style.opacity = 1;
      lastDigit = getNumberFromId(tempList[3]);
      console.log('lastDigit: ' + lastDigit);
      //currWin = document.getElementById('winning_number').innerHTML;
      //document.getElementById('winning_number').innerHTML = currWin + lastDigit;
      let combinedNums = `${getNumberFromId(tempList[0])}${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
      document.getElementById('winning_number').innerHTML = `Winning No. ${combinedNums}`;
      var needToStop = setTimeout(stopMovies, 5000);
      return;
    }
    
    console.log('colorBallElement is ' + window.colorBallElement);
    switch (movieNumber) {
        case 1:
          if (video1handled == false) {
            video1handled = true;
            playerOptions.muted = muted;
            player1 = new Player(movie1, playerOptions);
            player1.on('play', () => { 
              player1Playing = true;
              console.log('player1 is playing...'); 
            });
            player1.on('pause', () => { 
              player1Playing = false;
              console.log('player1 is paused...'); 
            });
            player1.on('timeupdate', (filmtime) => { 
              for (let x in filmtime) {
                if (x == 'seconds') {
                  console.log(filmtime[x]);
                  if (filmtime[x] >= 4.6) {
                    player1.pause();
                    //setTimeout(nextMovie, 1000);
                    console.log('in player1 timeupdate calling nextMovie() with case ' + window.colorBallElement);
                    nextMovie(2);
                    break;
                  }
                }
              }
            });
            player1.loadVideo(getUrlFromId(tempList[0])).then((id) => {
                console.log('video1 id is ' + id);
                if (!muted) player1.setVolume(1);
                movie1.style.opacity = 1;
                console.log('calling player1.play() with case ' + window.colorBallElement);
                player1.play();
            });
          }
            break;
        case 2:
          if (video2handled == false) {
            video2handled = true;
            tempDoc2 = document.getElementById("vid1_num_b");
            tempDoc2.style.opacity = 1;
            lastDigit = getNumberFromId(tempList[0]);
            console.log('lastDigit: ' + lastDigit);
            currWin = document.getElementById('winning_number').innerHTML;
            if (currWin.substring(0,20) == 'Winning No. <span cl') {
              document.getElementById('winning_number').innerHTML = `Winning No. ${lastDigit}`;
            }
            //tempDoc = document.getElementById("vid2_num");
            //tempDoc2 = document.getElementById("vid2_num_b");
            playerOptions.id = tempInitialRandomVidIds[1];
            playerOptions.muted = muted;
            player2 = new Player(movie2, playerOptions);
            player2.on('play', () => { 
              player2Playing = true;
              console.log('player2 is playing...'); 
            });
            player2.on('pause', () => { 
              player2Playing = false;
              console.log('player2 is paused...'); 
            });
            player2.on('timeupdate', (filmtime) => { 
              for (let y in filmtime) {
                if (y == 'seconds' && filmtime[y] >= 4.6) {
                  player2.pause();
                  //setTimeout(nextMovie, 1000);
                  console.log('in player2 timeupdate calling nextMovie() with case ' + window.colorBallElement);
                  nextMovie(3);
                  break;
                }
              }
            });
            player2.loadVideo(getUrlFromId(tempList[1])).then((id) => {
                console.log('video2 id is ' + id);
            });
            if (!muted) player2.setVolume(1);
            movie2.style.opacity = 1;
            //tempPlayer.setCurrentTime(0);
            console.log('calling player2.play() with case ' + window.colorBallElement);
            player2.play();
          }
            //tempDoc.style.opacity = 1;
            break;
        case 3:
          if (video3handled == false) {
            video3handled = true;
            tempDoc2 = document.getElementById("vid2_num_b");
            tempDoc2.style.opacity = 1;
            lastDigit = getNumberFromId(tempList[1]);
            console.log('lastDigit: ' + lastDigit);
            currWin = document.getElementById('winning_number').innerHTML;
            document.getElementById('winning_number').innerHTML = currWin + lastDigit;
            //tempDoc = document.getElementById("vid3_num");
            playerOptions.id = tempInitialRandomVidIds[2];
            playerOptions.muted = muted;
            player3 = new Player(movie3, playerOptions);
            player3.on('play', () => { 
              player3Playing = true;
              console.log('player3 is playing...'); 
            });
            player3.on('pause', () => { 
              player3Playing = false;
              console.log('player3 is paused...'); 
            });
            player3.on('timeupdate', (filmtime) => { 
              for (let z in filmtime) {
                if (z == 'seconds' && filmtime[z] >= 4.6) {
                  player3.pause();
                  //setTimeout(nextMovie, 1000);
                  console.log('in player3 timeupdate calling nextMovie() with case ' + window.colorBallElement);
                  nextMovie(4);
                  break;
                }
              }
            });
            player3.loadVideo(getUrlFromId(tempList[2])).then((id) => {
                console.log('video3 id is ' + id);
            });
            if (!muted) player3.setVolume(1);
            movie3.style.opacity = 1;
            //tempPlayer.setCurrentTime(0);
            console.log('calling player3.play() with case ' + window.colorBallElement);
            player3.play();
          }
            break;
        case 4:
          if (video4handled == false) {
            video4handled = true;
            tempDoc2 = document.getElementById("vid3_num_b");
            tempDoc2.style.opacity = 1;
            lastDigit = getNumberFromId(tempList[2]);
            console.log('lastDigit: ' + lastDigit);
            currWin = document.getElementById('winning_number').innerHTML;
            document.getElementById('winning_number').innerHTML = currWin + lastDigit;
            playerOptions.id = tempInitialRandomVidIds[3];
            playerOptions.muted = muted;
            player4 = new Player(movie4, playerOptions);
            player4.on('play', () => { 
              player4Playing = true;
              console.log('player4 is playing...'); 
            });
            player4.on('pause', () => { 
              player4Playing = false;
              console.log('player4 is paused...'); 
            });
            player4.on('timeupdate', (filmtime) => { 
              for (let k in filmtime) {
                if (k == 'seconds' && filmtime[k] >= 4.6) {
                  player4.pause();
                  console.log('in player4 timeupdate calling nextMovie() with case ' + window.colorBallElement);
                  nextMovie(false);
                  break;
                }
              }
            });
            player4.loadVideo(getUrlFromId(tempList[3])).then((id) => {
                console.log('video4 id is ' + id);
            });
            if (!muted) player4.setVolume(1);
             //   tempPlayer = player5;
             //   tempMovie = movie5;
            movie4.style.opacity = 1;
            //tempPlayer.setCurrentTime(0);
            console.log('calling player4.play() with case ' + window.colorBallElement);
            player4.play();
            let combinedNums = `${getNumberFromId(tempList[0])}${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
            //historyQueue.enqueue('Game #'+padWithZeros(getDrawingNumber())+': '+combinedNums);
            //let gameNumber = padWithZeros(getDrawingNumber()+1);
            let rawGameNumber = document.getElementById('selections-drawingnumber').innerHTML;
            //NOTE:  The above element has style visibility:hidden;
            gameNumber = padWithZeros(parseInt(rawGameNumber.substr(8, 4)));
            //historyQueue.enqueue('Game #'+gameNumber+': '+combinedNums);
            //document.getElementById('selections-drawingnumber').innerHTML = 'Game #: '+(gameNumber);
            currentWinningNumber = '';
            for (let key in combinedNums) {
              currentWinningNumber += '' + combinedNums[key];
            }
            currentGameNumber = gameNumber;
            console.log('A currentGameNumber: ' + currentGameNumber + ' currentWinningNumber: ' + currentWinningNumber);
          }
            break;
        default:
            console.log('Reached default of switch');
            break;
    }
    window.colorBallElement += 1;

//    waitTime = 0;
//    if (window.colorBallElement === 3) {
//        window.colorBallFirstVidSet = !window.colorBallFirstVidSet;
//    }

//    await wait(waitTime).then(() => {
//      window.colorBallElement += 1;
//        if (window.colorBallElement === 4) {
//            window.colorBallElement = 0;
//        }
//        if (window.colorBallElement > 0) {
//            tempMovie.style.opacity = 1;
//            tempPlayer.setCurrentTime(0);
//            tempPlayer.play();
//        }
//    });
}  // END OF FUNCTION NEXTMOVIE()

// function stopScript() {
//     window.runScript = false;
//     window.colorBallElement = 0;
//     // movie1.pause();
//     // movie2.pause();
//     // movie3.pause();
//     // movie4.pause();
//     // movie5.pause();
//     // movie6.pause();
//     // movie7.pause();
//     // movie8.pause();
//     movie1.style.opacity = 0;
//     movie2.style.opacity = 0;
//     movie3.style.opacity = 0;
//     movie4.style.opacity = 0;
//     movie5.style.opacity = 0;
//     movie6.style.opacity = 0;
//     movie7.style.opacity = 0;
//     movie8.style.opacity = 0;
//     document.getElementById("vid1_num").style.opacity = 0;
//     document.getElementById("vid2_num").style.opacity = 0;
//     document.getElementById("vid3_num").style.opacity = 0;
//     document.getElementById("vid4_num").style.opacity = 0;
//     // movie1.innerHTML = "";
//     // movie2.innerHTML = "";
//     // movie3.innerHTML = "";
//     // movie4.innerHTML = "";
//     // movie5.innerHTML = "";
//     // movie6.innerHTML = "";
//     // movie7.innerHTML = "";
//     // movie8.innerHTML = "";
//     clearInterval(countdownInterval);
// }

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

// function getNextMinute() {
//     console.log('getNextMinute');
//     const now = new Date(Date.now());
//     now.setMinutes(now.getMinutes() + 1);
//     now.setSeconds(0);
//     now.setMilliseconds(0);
//     return now;
// }

function startScript() {
    console.log('in startScript()... betsOpen is ' + betsOpen);
    window.runScript = true;

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
    //currentGameNumber = gameNumber;
    //currentGameNumber = '';
    //currentWinningNumber = '';
    //console.log('C currentGameNumber: ' + currentGameNumber + ' currentWinningNumber: ' + currentWinningNumber);

    document.getElementById('selections-drawingnumber').innerHTML = `Game #: ${gameNumber}`;

    // Put the game number etc. into the top boxes...
    document.getElementById('lastFour').innerText = "Player I.D. " + lastFour;
    document.getElementById('faveNums').innerText = "Submitted No. " + faveNums;
    document.getElementById('winning_number').innerHTML = "Winning No. <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span> <span class='lowerunder'>&nbsp;</span><span class='lowerunder'>&nbsp;</span>";
    document.getElementById('gameNo').innerHTML = 'Game No. ' + gameNumber;
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
    
    //let tempMovie1;
    //if (window.colorBallFirstVidSet) {
    //    tempMovie1 = player1;
    //    movie1.style.opacity = 1;
        //console.log('movie 1 opaque');
    //} else {
    //    tempMovie1 = player5;
    //    movie5.style.opacity = 1;
    //    //console.log('movie 5 opaque');
    //}
    //clearInterval(countdownInterval);
    //console.log('Playing player1 in startScript()...');
    //player1.pause();
    //player1.play();
    console.log('calling nextMovie() in startScript()...');
    nextMovie(1);
    //tempMovie1.play();
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
//            document.getElementById("vid1_num").style.opacity = 1;
//            document.getElementById("vid2_num").style.opacity = 1;
//            document.getElementById("vid3_num").style.opacity = 1;
//            document.getElementById("vid4_num").style.opacity = 1;
            document.getElementById("vid1_num_b").style.opacity = 1;
            document.getElementById("vid2_num_b").style.opacity = 1;
            document.getElementById("vid3_num_b").style.opacity = 1;
            document.getElementById("vid4_num_b").style.opacity = 1;
            // });
        });
    });
    moviePlayer.off(eventType);
}

//socket.addEventListener('message', event => {
//    let data = JSON.parse(event.data);
//    console.log ('data in socket.addEventListener: ' + data);
//    if (!runStreamService) return;
//    // console.log(`Message from server: ${JSON.parse(event.data)}`);
//    // for (const [key, value] of Object.entries(data)) {
//    //     console.log(`${key}: ${value}`);
//    // }
//    if (data.title === 'credit') {
//       //console.log(`received credit: ${data.credit}`)
//        console.log("### data.title is 'credit'");
//    } else if (data.title === 'videos') {
//        const functionDelay = 4000;
//        setTimeout(doVideos, functionDelay, data.data);
//        //doVideos(data.data);
//    } else if (data.title === 'startVids') {
//        const functionDelay1 = 4000;  // was 3000.  We need more time between end of one game and start of the next.
//        setTimeout(doStartVids, functionDelay1);
//        //doStartVids();
//    } else if (data.title === 'closeBets') {
//        betsOpen = false;  // prevent number submissions during this pause
//        console.log('betsOpen: ', betsOpen);
//        const functionDelay2 = 7000;
//        setTimeout(doCloseBets, functionDelay2);
//        //doCloseBets();
//    } else if (data.title === 'openBets') {
//        const functionDelay3 = 5000;
//        setTimeout(doOpenBets, functionDelay3);
//        //doOpenBets();
//    } else if (data.title === 'init') {
//        console.info('***** init *****');
//        // console.info(data.data);
//        // console.info(typeof (data.data.time));
//        let hd_start = num_prev_scores;  // This is the number of history entries to show
//        console.info(`data:`);
//        console.info(data.data);
//        Object.entries(data.data).forEach(([key, val]) => {
//            // console.info(`data: ${key}`);
//            // console.info(val);
//            //let calculatedDrawingNum = getDrawingNumberFromTime(val.time);
////             console.log(`time: ${val.time}, calculatedDrawingNum: ${calculatedDrawingNum}`);
////             console.warn('??? drawing num ???');
////             console.warn(calculatedDrawingNum);
////            if(hd_start > 0) {
////                updateHistory(val);
////            } else {
////                lastWinningNumber = val;
//            //     updateHistory(val);
//            //     document.getElementById('winning_number').innerHTML = `Winning #: ${val.winningNumber}`;
//            //     document.getElementById('selections-drawingnumber').innerHTML = `${calculatedDrawingNum}`;
//            //     let num1 = val.num1, num2 = val.num2, num3 = val.num3, num4 = val.num4;
//            //     let tempMovie1, tempMovie2, tempMovie3, tempMovie4;
//            //     console.log(`first video set ? : ${window.colorBallFirstVidSet}`);
//            //     if (window.colorBallFirstVidSet) {
//            //         tempMovie1 = player1;
//            //         tempMovie2 = player2;
//            //         tempMovie3 = player3;
//            //         tempMovie4 = player4;
//            //     } else {
//            //         tempMovie1 = player5;
//            //         tempMovie2 = player6;
//            //         tempMovie3 = player7;
//            //         tempMovie4 = player8;
//            //     }
//
//            //     doVideos({ arr: [num1, num2, num3, num4] });
//            //     tempMovie1.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie1); });
//            //     tempMovie2.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie2); });
//            //     tempMovie3.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie3); });
//            //     tempMovie4.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie4); });
//            //     document.getElementById("vid1_num").style.opacity = 1;
//            //     document.getElementById("vid2_num").style.opacity = 1;
//            //     document.getElementById("vid3_num").style.opacity = 1;
//            //     document.getElementById("vid4_num").style.opacity = 1;
//            //     tempList[0] = num1;
//            //     tempList[1] = num2;
//            //     tempList[2] = num3;
//            //     tempList[3] = num4;
//            //}
//            hd_start -= 1;
//        });
//    }
//});

//socket.addEventListener('message', event => {
//    let data = JSON.parse(event.data);
    //console.log ('data in socket.addEventListener: ' + data);
    //console.log('data.title in event listener: ' + data.title);
//    if (!runStreamService) return;
    // console.log(`Message from server: ${JSON.parse(event.data)}`);
    // for (const [key, value] of Object.entries(data)) {
    //     console.log(`${key}: ${value}`);
    // }
//    if (data.title === 'videos') {
//        const functionDelay = 4000;
//        setTimeout(doVideos, functionDelay, data.data);
//        //doVideos(data.data);
//    } else if (data.title === 'startVids') {
//        const functionDelay1 = 4000;  // was 3000.  We need more time between end of one game and start of the next.
//        setTimeout(doStartVids, functionDelay1);
//        //doStartVids();
//    } else if (data.title === 'closeBets') {
//        betsOpen = false;  // prevent number submissions during this pause
//        console.log('betsOpen: ', betsOpen);
//        const functionDelay2 = 7000;
//        setTimeout(doCloseBets, functionDelay2);
//        //doCloseBets();
//    } else if (data.title === 'openBets') {
//        const functionDelay3 = 5000;
//        setTimeout(doOpenBets, functionDelay3);
//        //doOpenBets();
//    } else if (data.title === 'init') {
//        console.info('***** init *****');
//        // console.info(data.data);
//        // console.info(typeof (data.data.time));
//        let hd_start = num_prev_scores;  // This is the number of history entries to show
//        //console.info(`data:`);
//        //console.info(data.data);
//        Object.entries(data.data).forEach(([key, val]) => {
//            hd_start -= 1;
//        });
//    }
//    if (data.title === 'init') {
//        console.info('***** init *****');
//        // console.info(data.data);
//        // console.info(typeof (data.data.time));
//        let hd_start = num_prev_scores;  // This is the number of history entries to show
//        //console.info(`data:`);
//        //console.info(data.data);
//        //console.log('in index2: ');
//        Object.entries(data.data).forEach(([key, val]) => {
//          //console.log('key: ' + key + ' val: ' + val);
//          hd_start -= 1;
//        });
//        //console.log('hd_start: ' + hd_start);
//        let nextVideos;
//        nextVideos = doInitStuff(data.data);
//        console.log(nextVideos);
//        doCloseBets();
//        doVideos(nextVideos);
//        doOpenBets();
//        doStartVids();
//        const functionDelay = 500;
//        const functionDelay2 = 1500;
//        const functionDelay3 = 2000;
//        const functionDelay4 = 3000;
//        setTimeout(doCloseBets, functionDelay);
//        setTimeout(doVideos, functionDelay2, nextVideos);
//        setTimeout(doOpenBets, functionDelay3);
//        setTimeout(doStartVids, functionDelay4);
//let nextVideos;
//nextVideos = doInitStuff({3000022 : [404, 434, 427, 484]});
//console.log(nextVideos);

function doInitStuff(data = null) {
//  //console.log('data in doInitStuff:');
//  let returnStuff = [];
//  for (let key in data) {
//    //console.log('key: ' + key + ' ' + data[key]);
//    for (let key2 in data[key]) {
//      //console.log('key2: ' + key2 + ' ' + data[key][key2]);
//      if (key2 == 'num1' || key2 == 'num2' || key2 == 'num3' || key2 == 'num4') {
//        returnStuff.push(data[key][key2]);
//      }
//    }
//    //console.log('in doInitStuff()... returnStuff:');
//    //for (var i = 0; i < returnStuff.length; i++) {
//    //  console.log(returnStuff[i]);
//    //}
//    break;
//	}
//	return returnStuff;
  player1Playing = false;
  player2Playing = false;
  player3Playing = false;
  player4Playing = false;

  tempInitialRandomNums = myRand(movieIndexList, 4);
  tempInitialRandomVidIds = tempInitialRandomNums.map( num => parseInt(videoList[num], 10));
  //console.log('tempInitialRandomNums was set in index2...');
}

function doPromises() {
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), 200); // (*)
  }).then(function() { // (**)
    doCloseBets();
    return;
  }).then(function() { // (***)
    //doVideos(nextVideos);
    //doVideos([404, 434, 427, 484]);
    //doInitStuff();
    doVideos(tempInitialRandomNums);
    return;
  }).then(function() {
    doOpenBets();
    return;
  }).then(function() {
    setTimeout(doStartVids, 1000);
    return;
  });
}

doPromises();

//        var getThingsGoing = function (data) {
//          return new Promise(function (resolve, reject) {
//
//            nextVideos = doInitStuff(data);
//
//            if (true) {
//              resolve(nextVideos);
//            } else {
//              reject(Error("It broke"));
//            }
//          });
//        };
//        
//        getThingsGoing(data).then(function (nextVideos) {
//          doCloseBets().then.doVideos(nextVideos);
//        });
//    }
//});

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
    startScript();
}

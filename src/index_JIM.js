import Player from '@vimeo/player'
import Queue from './queue.js';
// import * as ex from '../re.js';


//const Vimeo = require('@vimeo/player');

//let demotype = document.getElementById("demoscript").getAttribute("demotype");
const videoList = {
    '400': '770984808',
    '401': '770984819',
    '402': '770984829',
    '403': '770984796',
    '404': '770984778',
    '405': '770984763',
    '406': '770984749',
    '407': '770984734',
    '408': '770984711',
    '409': '770984701',
    '410': '770984690',
    '411': '770984644',
    '412': '770984576',
    '413': '770984552',
    '414': '770984539',
    '415': '770984671',
    '416': '770984529',
    '417': '770984514',
    '418': '770984503',
    '419': '770984489',
    '420': '770984467',
    '421': '770984438',
    '422': '770984413',
    '423': '770984384',
    '424': '770984365',
    '425': '770984348',
    '426': '770984325',
    '427': '770984305',
    '428': '770984402',
    '429': '770984295',
    '430': '770984281',
    '431': '770984243',
    '432': '770984219',
    '433': '770984181',
    '434': '770984166',
    '435': '770984149',
    '436': '770984125',
    '437': '770984111',
    '438': '770984101',
    '439': '770984075',
    '440': '770984037',
    '441': '770984021',
    '442': '770983990',
    '443': '770984056',
    '444': '770983976',
    '445': '770983933',
    '446': '770983914',
    '447': '770983886',
    '448': '770983875',
    '449': '770983848',
    '450': '770983835',
    '451': '770983822',
    '452': '770983803',
    '453': '770983782',
    '454': '770983763',
    '455': '770983723',
    '456': '770983693',
    '457': '770983680',
    '458': '770983650',
    '459': '770983629',
    '460': '770983607',
    '461': '770983596',
    '462': '770983577',
    '463': '770983562',
    '464': '770983531',
    '465': '770983520',
    '466': '770983501',
    '467': '770983483',
    '468': '770983453',
    '469': '770983434',
    '470': '770983409',
    '471': '770983371',
    '472': '770983360',
    '473': '770983347',
    '474': '770983329',
    '475': '770983318',
    '476': '770983276',
    '477': '770983246',
    '478': '770983236',
    '479': '770983211',
    '480': '770983197',
    '481': '770983184',
    '482': '770983165',
    '483': '770983149',
    '484': '770983133',
    '485': '770983123',
    '486': '770983117',
    '487': '770983105',
    '488': '770983094',
    '489': '770983084',
    '490': '770983069',
    '491': '770983061',
    '492': '770983044',
    '493': '770983033',
    '494': '770983023',
    '495': '770983012',
    '496': '770983001',
    '497': '770982983',
    '498': '770982617',
    '499': '770982877'
};

let credit_amount = 0;
let demotype = 'color';
let betsOpen = true;
let selectedNumber = false;
let lastWinningNumber;
// let lastGameNumber;
let showedSkippedNumber = false;

let movieIndexList = [];
for (let i = 0; i < 100; i++) {
    if (demotype === "white") {
        movieIndexList.push(300 + i);
    } else {
        movieIndexList.push(400 + i);
    }
}

let tempList = [-1, -1, -1, -1];
let numpadSelectedArr = [];
let selectedQueue = new Queue(10);
let historyQueue = new Queue(32);

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
});

function numpadSelect(val) {
    if (betsOpen === false) return;
    if (selectedNumber) return;
    if (numpadSelectedArr.length >= 4) return;
    numpadSelectedArr.push(val);
    let numText = numpadSelectedArr.reduce((acc, curr) => {
        return acc + '' + curr;
    }, '');
    document.getElementById('numpad-selection').innerHTML = numText;
    return;
}

let muted = true;


document.getElementById('numpad-delete').addEventListener('click', numpadDelete, false);
document.getElementById('numpad-submit').addEventListener('click', numpadSubmit, false);
document.getElementById('unmute').addEventListener('click', toggleMute, false);

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

function padWithZeros(n) {
    let returnStr = '0000' + n;
	return returnStr.slice(-4);
}

function testInitVideosToLastFrame() {
    let tempMovie1, tempMovie2, tempMovie3, tempMovie4;
    console.log(`TOGGLE first video set ? : ${window.colorBallFirstVidSet}`);
    if (window.colorBallFirstVidSet) {
        tempMovie1 = player1;
        tempMovie2 = player2;
        tempMovie3 = player3;
        tempMovie4 = player4;
    } else {
        tempMovie1 = player5;
        tempMovie2 = player6;
        tempMovie3 = player7;
        tempMovie4 = player8;
    }
    let multiplier = 1;
    reduction -= 0.2;
    if (reduction <= 0) {
        reduction = 2;
    }
    // if (muted) {
    //     multiplier = 0;
    // }
    if (window.colorBallFirstVidSet) {
        movie1.style.opacity = 1;
        movie2.style.opacity = 1;
        movie3.style.opacity = 1;
        movie4.style.opacity = 1;
    } else {
        movie5.style.opacity = 1;
        movie6.style.opacity = 1;
        movie7.style.opacity = 1;
        movie8.style.opacity = 1;
    }
    // tempMovie1.loadVideo(getUrlFromId(num1)).then((id) => {
        tempMovie1.getDuration().then((duration) => {
            console.log(`duration: ${duration}`)
            tempMovie1.setCurrentTime((duration - reduction) * multiplier).then(() => {
                tempMovie1.play().then(() => {
                    tempMovie1.pause();
                });
            });
        });
    // });

    // tempMovie2.loadVideo(getUrlFromId(num2)).then((id) => {
        tempMovie2.getDuration().then((duration) => {
            console.log(`duration: ${duration}`)
            tempMovie2.setCurrentTime((duration - reduction) * multiplier).then(() => {
                tempMovie2.play().then(() => {
                    tempMovie2.pause();
                });
            });
        });
    // });

    // tempMovie3.loadVideo(getUrlFromId(num3)).then((id) => {
        tempMovie3.getDuration().then((duration) => {
            console.log(`duration: ${duration}`)
            tempMovie3.setCurrentTime((duration - reduction) * multiplier).then(() => {
                tempMovie3.play().then(() => {
                    tempMovie3.pause();
                });
            });
        });
    // });

    // tempMovie4.loadVideo(getUrlFromId(num4)).then((id) => {
        tempMovie4.getDuration().then((duration) => {
            console.log(`duration: ${duration}`)
            tempMovie4.setCurrentTime((duration - reduction) * multiplier).then(() => {
                tempMovie4.play().then(() => {
                    tempMovie4.pause();
                });
            });
        });
    // });
    document.getElementById("vid1_num").style.opacity = 1;
    document.getElementById("vid2_num").style.opacity = 1;
    document.getElementById("vid3_num").style.opacity = 1;
    document.getElementById("vid4_num").style.opacity = 1;
}

function toggleMute() {
    if (muted) {
        document.getElementById('unmute').innerHTML = "Mute";
        player1.setVolume(1);
        player2.setVolume(1);
        player3.setVolume(1);
        player4.setVolume(1);
        player5.setVolume(1);
        player6.setVolume(1);
        player7.setVolume(1);
        player8.setVolume(1);
    } else {
        document.getElementById('unmute').innerHTML = "Unmute";
        player1.setVolume(0);
        player2.setVolume(0);
        player3.setVolume(0);
        player4.setVolume(0);
        player5.setVolume(0);
        player6.setVolume(0);
        player7.setVolume(0);
        player8.setVolume(0);
    }

    muted = !muted;
}

function numpadSubmit() {
    // if (!(currSelectedNumbers.length < 10)) return;
    if (selectedQueue.length() >= 10) return;
    if (credit_amount <= 0) return;
    if (!betsOpen) return;
    if (selectedNumber) return;
    if (numpadSelectedArr.length !== 4) return;

    let numText = numpadSelectedArr.reduce((acc, curr) => {
        return acc + '' + curr;
    }, '');

    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = receiveCredit;
    httpRequest.open('POST', 'credit_use');
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify({ amount: 1, number_selection: numText }));
    // selectedQueue.enqueue(numText);
    // let tempLen = selectedQueue.length();
    //                     for(let i = 1; i <= tempLen; i++) {
    //                         document.getElementById('selection_row_text_'+i).innerHTML = selectedQueue.elements[tempLen - (i-1) - 1];
    //                         document.getElementById('selection_row_text_'+i).style.opacity = 1;
    //                     }

    function receiveCredit() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log('received response');
                let data = JSON.parse(httpRequest.responseText);
                if (data.msg === 'too many bets') {
                    //TODO: print proper message
                    alert("You can sign in only once every 24 hours.\nPlease try again tomorrow.");
                    // return;
                } else {
                    document.getElementById('credit').innerHTML = `$${data.credit}`;
                    credit_amount = parseInt(data.credit, 10);
                    // TODO: check to make sure a duplicate is not being entered - give feedback to user if true
                    // currSelectedNumbers.push(numText);
                    // let selNums = currSelectedNumbers.reduce((acc, cur) => {
                    //     return `${acc}<div class="col-5">${cur}</div>`;
                    // }, '');
                    // document.getElementById('selected-number').innerHTML = `<div class="row">${selNums}</div>`;
                    if (selectedQueue.length() < 10) {
                        selectedQueue.enqueue(numText);
                        let queueLen = selectedQueue.length();
                        for(let i = 1; i <= queueLen; i++) {
                            document.getElementById('selection_row_text_'+i).innerHTML = selectedQueue.elements[queueLen - (i-1) - 1];
                            document.getElementById('selection_row_text_'+i).style.opacity = 1;
                        }
                    }
                    document.getElementById('numpad-selection').innerHTML = '';
                    numpadSelectedArr = [];
                }
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
}

function numpadDelete() {
    if (!betsOpen) return;
    if (numpadSelectedArr.length <= 0) return;
    numpadSelectedArr.pop();
    let numText = numpadSelectedArr.reduce((acc, curr) => {
        return acc + '' + curr;
    }, '');
    document.getElementById('numpad-selection').innerHTML = numText;
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

function updateClock() {
    // console.log('updateClock');
    let text = Math.floor(window.colorBallTotalTime);
    let newNow = new Date(Date.now());
    text = text - (newNow.getSeconds() % 30) - 1;
    if (text < 0) text = 0;
    clock.innerHTML = `${text} (seconds)`;
}

const movie1 = document.getElementById("vid1");
const movie2 = document.getElementById("vid2");
const movie3 = document.getElementById("vid3");
const movie4 = document.getElementById("vid4");
const movie5 = document.getElementById("vid5");
const movie6 = document.getElementById("vid6");
const movie7 = document.getElementById("vid7");
const movie8 = document.getElementById("vid8");

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

let player1, player2, player3, player4, player5, player6, player7, player8;
let tempInitialRandomNums = myRand(movieIndexList, 8);
let tempInitialRandomVidIds = tempInitialRandomNums.map( num => parseInt(videoList[num], 10));
const playerOptions = {
    controls: false,
    playsinline: true,
    muted: true,
    id: tempInitialRandomVidIds[0],
    width: '100%',
    height: '400'
};

player1 = new Player(movie1, playerOptions);
playerOptions.id = tempInitialRandomVidIds[1];
player2 = new Player(movie2, playerOptions);
playerOptions.id = tempInitialRandomVidIds[2];
player3 = new Player(movie3, playerOptions);
playerOptions.id = tempInitialRandomVidIds[3];
player4 = new Player(movie4, playerOptions);
playerOptions.id = tempInitialRandomVidIds[4];
player5 = new Player(movie5, playerOptions);
playerOptions.id = tempInitialRandomVidIds[5];
player6 = new Player(movie6, playerOptions);
playerOptions.id = tempInitialRandomVidIds[6];
player7 = new Player(movie7, playerOptions);
playerOptions.id = tempInitialRandomVidIds[7];
player8 = new Player(movie8, playerOptions);

let countdownInterval = setInterval(updateClock, 1000);
// const history = document.getElementById("history");
clearInterval(countdownInterval);

player1.on('ended', () => { nextMovie(); });
player2.on('ended', () => { nextMovie(); });
player3.on('ended', () => { nextMovie(); });
player4.on('ended', () => { nextMovie(); });
player5.on('ended', () => { nextMovie(); });
player6.on('ended', () => { nextMovie(); });
player7.on('ended', () => { nextMovie(); });
player8.on('ended', () => { nextMovie(); });

// let totalTimeField = document.getElementById("totalSeconds");
// let delayTimeField = document.getElementById("betweenVids");

let tempTime = new Date(Date.now());
tempTime.setMilliseconds(0);
tempTime.setSeconds(tempTime.getSeconds() + 1);
let tempNow = new Date(Date.now());
let delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds();
setTimeout(initiateClock(), delay);
let drawingNumber = getDrawingNumber();
document.getElementById('selections-drawingnumber').innerHTML = `Game #: ${drawingNumber}`;

let totalTime = 0;
let waitTime = window.colorBallDelay;

function getDrawingNumber() {
    let now = new Date(Date.now());
    let hour = now.getHours() * 60;
    let mins = now.getMinutes();
    return hour + mins;
}

function getDrawingNumberFromTime(t) {
    let now = new Date(t);
    // console.log(`time: ${now}`);
    // console.log(t);
    // console.log(typeof (t));
    // let offset = -now.getTimezoneOffset() / 60;
    let hour = now.getHours() * 60;
    let mins = now.getMinutes();
    return hour + mins + 1;
}

function updateHistory(element) {
    // document.getElementById('history_drawing_' + i).innerHTML = element;
    // document.getElementById('history_drawing_' + i).style.opacity = 1;
    let combinedNums = `${getNumberFromId(element.num1)}${getNumberFromId(element.num2)}${getNumberFromId(element.num3)}${getNumberFromId(element.num4)}`;
    historyQueue.enqueue('Game #'+padWithZeros(getDrawingNumberFromTime(element.time))+': '+combinedNums);
    let historyLen = historyQueue.length();
    for (let i = 1; i <= historyLen; i++) {
        // updateHistory(i, historyQueue.elements[historyLen - (i - 1) - 1]);
        document.getElementById('history_drawing_'+i).innerHTML = historyQueue.elements[historyLen - (i-1) - 1];
        document.getElementById('history_drawing_'+i).style.opacity = 1;
    }
}

function finishRound(i, t, element) {
    //code
}

//async function nextMovie(e) {
function nextMovie(e) {
    console.log('nextMovie');
    if (!window.runScript) return;
    let tempMovie;
    let tempPlayer;
    let tempDoc;
    switch (window.colorBallElement) {
        case 0:
            tempDoc = document.getElementById("vid1_num");
            if (window.colorBallFirstVidSet) {
                player1.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player1.setCurrentTime(duration - 0.2).then((seconds) => {
                        player1.pause();
                        console.log(`**** seconds: `, seconds);
                    });
                  });
                tempPlayer = player2;
                tempMovie = movie2;
            } else {
                player5.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player5.setCurrentTime(duration-0.2).then((seconds) => player5.pause());
                  });
                tempPlayer = player6;
                tempMovie = movie6;
            }
            tempDoc.style.opacity = 1;
            break;
        case 1:
            tempDoc = document.getElementById("vid2_num");
            if (window.colorBallFirstVidSet) {
                player2.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player2.setCurrentTime(duration - 0.2).then((seconds) => {
                        // player1.pause();
                        // console.log(`**** seconds: `, seconds);
                    });
                  });
                tempPlayer = player3;
                tempMovie = movie3;
            } else {
                player6.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player6.setCurrentTime(duration - 0.2);
                  });
                tempPlayer = player7;
                tempMovie = movie7;
            }
            tempDoc.style.opacity = 1;
            break;
        case 2:
            tempDoc = document.getElementById("vid3_num");
            if (window.colorBallFirstVidSet) {
                player3.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player3.setCurrentTime(duration - 0.2);
                  });
                tempPlayer = player4;
                tempMovie = movie4;
            } else {
                player7.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player7.setCurrentTime(duration - 0.2);
                  });
                tempPlayer = player8;
                tempMovie = movie8;
            }
            tempDoc.style.opacity = 1;
            break;
        case 3:
        default:
            tempDoc = document.getElementById("vid4_num");
            if (window.colorBallFirstVidSet) {
                player4.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player4.setCurrentTime(duration - 0.2);
                  });
                tempPlayer = player5;
                tempMovie = movie5;
            } else {
                player8.getDuration().then(function(duration) {
                    // `duration` indicates the duration of the video in seconds
                    player8.setCurrentTime(duration - 0.2);
                  });
                tempPlayer = player1;
                tempMovie = movie1;
            }
            let combinedNums = `${getNumberFromId(tempList[0])}${getNumberFromId(tempList[1])}${getNumberFromId(tempList[2])}${getNumberFromId(tempList[3])}`;
            tempDoc.style.opacity = 1;
            historyQueue.enqueue('Game #'+padWithZeros(getDrawingNumber())+': '+combinedNums);
            let historyLen = historyQueue.length();
            for (let i = 1; i <= historyLen; i++) {
                // updateHistory(i, historyQueue.elements[historyLen - (i - 1) - 1]);
                document.getElementById('history_drawing_'+i).innerHTML = historyQueue.elements[historyLen - (i-1) - 1];
                document.getElementById('history_drawing_'+i).style.opacity = 1;
            }
            document.getElementById('winning_number').innerHTML = `Winning #: ${combinedNums}`;
            break;
    }
    waitTime = 0;
    if (window.colorBallElement === 3) {
        window.colorBallFirstVidSet = !window.colorBallFirstVidSet;
    }

//    await wait(waitTime).then(() => {
    wait(waitTime).then(() => {
        window.colorBallElement += 1;
        if (window.colorBallElement === 4) {
            window.colorBallElement = 0;
        }
        if (window.colorBallElement > 0) {
            tempMovie.style.opacity = 1;
            tempPlayer.setCurrentTime(0);
            tempPlayer.play();
        }
    });
}

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
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateClock, 1000);
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
    // console.log('startScript');
    window.runScript = true;

    document.getElementById('winning_number').innerHTML = 'Winning #:';

    let drawingNumber = getDrawingNumber() + 1;
    document.getElementById('selections-drawingnumber').innerHTML = `Game #: ${padWithZeros(drawingNumber)}`;

    let tempMovie1;
    if (window.colorBallFirstVidSet) {
        tempMovie1 = player1;
        movie1.style.opacity = 1;
        // console.log('movie 1 opaque');
    } else {
        tempMovie1 = player5;
        movie5.style.opacity = 1;
        // console.log('movie 5 opaque');
    }
    tempMovie1.play();
}


const socket = new WebSocket('wss://colorball-ads.com/:443');

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = receiveCredit;
httpRequest.addEventListener('error', catchError);
httpRequest.open('GET', 'credit');
httpRequest.send();

function catchError(e) {
    console.error(e);
}

function receiveCredit() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // console.log('httpRequest.status: ', httpRequest.status);
        // console.info(httpRequest);
        if (httpRequest.status === 200) {
            // console.log('received response');
            let data = JSON.parse(httpRequest.responseText);
            // console.log(data.credit);
            document.getElementById('credit').innerHTML = `$${data.credit}`;
            credit_amount = parseInt(data.credit, 10);
        } else {
            console.log('There was a problem with the request.');
        }
    }
}

function moveBufferedVideoToEnd(data, eventType, moviePlayer) {
    console.log('BUFFERED COMPLETE: ', eventType);
    console.log(data);
    console.log('moviePlayer: ', moviePlayer);
    moviePlayer.getDuration().then((duration) => {
        console.log(`BUFFERED:: duration: ${duration}`)
        moviePlayer.setCurrentTime((duration - 0.05)).then(() => {
            // moviePlayer.play().then(() => {
            moviePlayer.pause();
            document.getElementById("vid1_num").style.opacity = 1;
            document.getElementById("vid2_num").style.opacity = 1;
            document.getElementById("vid3_num").style.opacity = 1;
            document.getElementById("vid4_num").style.opacity = 1;
            // });
        });
    });
    moviePlayer.off(eventType);
}

socket.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    // if (data.title === 'credit') {
        // console.log(`received credit: ${data.credit}`)
    // }
    if (!runStreamService) return;
    // console.log(`Message from server: ${JSON.parse(event.data)}`);
    // for (const [key, value] of Object.entries(data)) {
    //     console.log(`${key}: ${value}`);
    // }
    if (data.title === 'videos') {
        console.log('videos');
        doVideos(data.data);
    } else if (data.title === 'closeBets') {
        console.info('closeBets');
        //doCloseBets();
        const functionDelay = 3000;
        setTimeout(doCloseBets, functionDelay);
    } else if (data.title === 'openBets') {
        console.info('openBets');
        doOpenBets();
    } else if (data.title === 'startVids') {
        console.info('startVids');
        doStartVids();
    } else if (data.title === 'init') {
        console.info('***** init *****');
        // console.info(data.data);
        // console.info(typeof (data.data.time));
        let hd_start = 32;
        // console.info(`data:`);
        // console.info(data.data);
        Object.entries(data.data).forEach(([key, val]) => {
            // console.info(`data: ${key}`);
            // console.info(val);
            let calculatedDrawingNum = getDrawingNumberFromTime(val.time);
            // console.log(`time: ${val.time}, calculatedDrawingNum: ${calculatedDrawingNum}`);
            // console.warn('??? drawing num ???');
            // console.warn(calculatedDrawingNum);
            if(hd_start > 0) {
                updateHistory(val);
            } else {
                lastWinningNumber = val;
            //     updateHistory(val);
            //     document.getElementById('winning_number').innerHTML = `Winning #: ${val.winningNumber}`;
            //     document.getElementById('selections-drawingnumber').innerHTML = `${calculatedDrawingNum}`;
            //     let num1 = val.num1, num2 = val.num2, num3 = val.num3, num4 = val.num4;
            //     let tempMovie1, tempMovie2, tempMovie3, tempMovie4;
            //     console.log(`first video set ? : ${window.colorBallFirstVidSet}`);
            //     if (window.colorBallFirstVidSet) {
            //         tempMovie1 = player1;
            //         tempMovie2 = player2;
            //         tempMovie3 = player3;
            //         tempMovie4 = player4;
            //     } else {
            //         tempMovie1 = player5;
            //         tempMovie2 = player6;
            //         tempMovie3 = player7;
            //         tempMovie4 = player8;
            //     }

            //     doVideos({ arr: [num1, num2, num3, num4] });
            //     tempMovie1.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie1); });
            //     tempMovie2.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie2); });
            //     tempMovie3.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie3); });
            //     tempMovie4.on('loaded', (data) => { moveBufferedVideoToEnd(data, 'loaded', tempMovie4); });
            //     document.getElementById("vid1_num").style.opacity = 1;
            //     document.getElementById("vid2_num").style.opacity = 1;
            //     document.getElementById("vid3_num").style.opacity = 1;
            //     document.getElementById("vid4_num").style.opacity = 1;
            //     tempList[0] = num1;
            //     tempList[1] = num2;
            //     tempList[2] = num3;
            //     tempList[3] = num4;
            }
            hd_start -= 1;
        });
    }
});

function doCloseBets() {
    betsOpen = false;
    // if (!showedSkippedNumber) {
    //     showedSkippedNumber = true;
    //     updateHistory(lastWinningNumber);
    // }
    document.querySelectorAll('.numpad').forEach(element => {
        element.classList.add('dithered');
    });
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
    movie5.style.opacity = 0;
    movie6.style.opacity = 0;
    movie7.style.opacity = 0;
    movie8.style.opacity = 0;
    document.getElementById("vid1_num").style.opacity = 0;
    document.getElementById("vid2_num").style.opacity = 0;
    document.getElementById("vid3_num").style.opacity = 0;
    document.getElementById("vid4_num").style.opacity = 0;
}

function getUrlFromId(id) {
    return parseInt(videoList[`${id}`], 10);
}

function doVideos(data) {;
    tempList[0] = data.arr[0];
    tempList[1] = data.arr[1];
    tempList[2] = data.arr[2];
    tempList[3] = data.arr[3];

    let tempMovie1, tempMovie2, tempMovie3, tempMovie4;
    if (window.colorBallFirstVidSet) {
        tempMovie1 = player1;
        tempMovie2 = player2;
        tempMovie3 = player3;
        tempMovie4 = player4;
    } else {
        tempMovie1 = player5;
        tempMovie2 = player6;
        tempMovie3 = player7;
        tempMovie4 = player8;
    }

    // const rootDir = 'https://player.vimeo.com/video';

    tempMovie1.loadVideo(getUrlFromId(tempList[0])).then((id) => {
        tempMovie1.pause();
    });

    tempMovie2.loadVideo(getUrlFromId(tempList[1])).then((id) => {
        tempMovie2.pause();
    });

    tempMovie3.loadVideo(getUrlFromId(tempList[2])).then((id) => {
        tempMovie3.pause();
    });

    tempMovie4.loadVideo(getUrlFromId(tempList[3])).then((id) => {
        tempMovie4.pause();
    });

    document.getElementById("vid1_num").style.opacity = 0;
    document.getElementById("vid2_num").style.opacity = 0;
    document.getElementById("vid3_num").style.opacity = 0;
    document.getElementById("vid4_num").style.opacity = 0;
    // console.log(`data.arr: [${data.arr[0]}, ${data.arr[1]}, ${data.arr[2]}, ${data.arr[3]}]`);
    document.getElementById("vid1_num").innerHTML = `${getNumberFromId(data.arr[0])}`;
    document.getElementById("vid2_num").innerHTML = `${getNumberFromId(data.arr[1])}`;
    document.getElementById("vid3_num").innerHTML = `${getNumberFromId(data.arr[2])}`;
    document.getElementById("vid4_num").innerHTML = `${getNumberFromId(data.arr[3])}`;
}

function doOpenBets() {
    // console.log('openBets');
    // console.log('betsOpen: ', betsOpen);
    betsOpen = true;
    // console.log('betsOpen: ', betsOpen);
    document.querySelectorAll('.numpad').forEach(element => {
        element.classList.remove('dithered');
    });
}

function doStartVids() {
    // console.log('startVids: \n' + new Date(Date.now()));
    if (!showedSkippedNumber) {
        console.info(`showSkippedNumber: ${showedSkippedNumber}`);
        showedSkippedNumber = true;
        updateHistory(lastWinningNumber);
        // return;
    }
    startScript();
}

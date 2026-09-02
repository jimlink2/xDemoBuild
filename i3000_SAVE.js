const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const express = require('express');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const nodemailer = require("nodemailer");
const session = require('express-session');
const validator = require("email-validator");
const { uuid } = require('uuidv4');

const app = express();
//const http = require('https').createServer({
// key: fs.readFileSync('/etc/letsencrypt/live/colorball-ads.com/privkey.pem'),
// cert: fs.readFileSync('/etc/letsencrypt/live/colorball-ads.com/cert.pem'),
// ca: fs.readFileSync('/etc/letsencrypt/live/colorball-ads.com/chain.pem')
//}, app);
const http = require('http').createServer(app);
const ws = require('ws');
const ex = require('./re.js');

dotenv.config();

app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false
}));

const yearZero = 2020;
const playInterval = 30;
const standardCredit = 4;  // 1 for testing; 4 for live runs
var credit_result = 0;

const hashedPwd = 'iUe7wSa)^bZ^isArE9iPs';
const mysqlConn = mysql.createConnection({
  host: 'localhost',
  user: 'colorer',
  password: hashedPwd,
  database: 'charity_ball'
});


mysqlConn.connect();


// let videos = [];
let started = false;
let loop;
// let start;
let now;


function padWithZeros(n) {
  let returnStr = '0000' + n;
  return returnStr.slice(-4);
}

function getDrawingNumber(gameTime) {
  console.log('gameTime is ' + gameTime);
  if (typeof gameTime == "undefined") {
    var thisTime = new Date();
  } else {
    var thisTime = new Date(gameTime);
  }
  let start = new Date(thisTime.getFullYear(), 0, 0);
  console.log('^^^ start: ' + start);
  let diff = (thisTime - start) + ((start.getTimezoneOffset() - thisTime.getTimezoneOffset()) * 60 * 1000);
  console.log('^^^ diff: ' + diff);
  let oneDay = 1000 * 60 * 60 * 24;
  let offset = -thisTime.getTimezoneOffset() / 60;
  console.log('^^^ offset: ' + offset);
  //offset = 0;
  let day = Math.floor(diff / oneDay);
  let hour = thisTime.getHours();
  let mins = thisTime.getMinutes();
  // let drawingNum = padWithZeros(((hour + offset - 1) * 60) + mins);
  let plusOne = thisTime.getSeconds() >= 30 ? 2 : 1;
  let drawingNum = padWithZeros((((hour * 60) + mins) * 2) + plusOne);
  let returnInt = parseInt((day + ((thisTime.getFullYear() - yearZero) * 365)) + '' + drawingNum, 10);
  console.log(`drawing num for day A: ${day} - ${hour}::${mins} = ${returnInt}`);
  return returnInt;
}

function getDrawingNumberFromTime(t) {
  // let now = new Date();
  let now = new Date(t);
  let offset = -now.getTimezoneOffset() / 60;
  // console.warn(`offset: ${offset}, hours: ${now.getHours()}, now: ${now}`);
  // console.info(`now: `, now);
  // let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  // let oneDay = 1000 * 60 * 60 * 24;
  // let day = Math.floor(diff / oneDay);
  let hour = now.getHours();
  let mins = now.getMinutes();
  let drawingNum = (Math.abs(hour + offset) * 60) + mins;
  // console.log(`drawingNum: ${ drawingNum }`);
  // console.error(`hour: ${hour}, min: ${mins}`);
  return drawingNum;
}

function getBallFromNum(num) {
  return parseInt(num.toString().charAt(1));
}

async function sendCustomEmail({ to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "support@colorball-ads.com",
      pass: `${process.env.EMAIL_PASS}`
    }
  });
  let info = await transporter.sendMail({
    from: '"Colorball Numbers" <support@colorball-ads.com>', // sender address
    to,
    // bcc: 'support@colorball-ads.com',
    subject,
    text,
    html
  });
  console.info(info);
}

// function getVids() {
//   videos = ex.myRand(ex.maviesList, 4);
// }

app.use(express.static(__dirname + '/', {
  maxage: 30000,
  // setHeaders: function (res, path, stat) {
  //   res.set('x-custom-keithy', 'the weithy');
  // }
}));


app.use(express.static(__dirname + './assets/videos/', {
  maxage: 172800000,
  // setHeaders: function (res, path, stat) {
  //   res.set('x-video-header', 'tada!! 443');
  // }
}));

app.use(ex.checkSession);


app.get('/signup', (req, res) => {
  if (req.body.dupperr) {
    res.set('dupperr', req.body.dupperr);
  }
  return res.sendFile(__dirname + '/signup.html');
});

function promiseQuery() { }

app.post('/validate', (req, response) => {
  let myResults = 'temp';
  mysqlConn.query(`select p.*, coalesce(c.credit, 0) as credit from players as p left join player_credit as c on p.id = c.player_id where email = '${req.body.user}' and password = '${req.body.pass}'`, async (err, results, fields) => {
    console.log('err is ' + err);
    if (err) {
      return response.send(new Error(err));
    }
    myResults = results;
    if (results.length > 0) {
      if (results[0]['password'] === req.body.pass) {
        req.session.user = results[0]['name'];
        req.session.uvi = results[0]['id'];
        req.session.access = results[0]['access'];
        req.session.credit = results[0]['credit'];

        console.log('In app.post(\'validate\')');
        console.log('user: ' + results[0]['name']);
        console.log('uvi: ' + results[0]['id']);
        console.log('access: ' + results[0]['access']);
        console.log('credit: ' + results[0]['credit']);
        const username = results[0]['name'];
        const user = { name: username, time: Date.now().toString() };
        const token = ex.createAccessToken(user);
        response.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
        response.cookie('user', `${results[0]['name']}`);
        response.cookie('uvi', `${results[0]['id']}`);

        var selected_id = '';

        //
        // Log out the current user so they can continue to play...
        //
        //mysqlConn.query(`update player_logins set logged_out = 1 where player_id = ${req.session.uvi}`, (err, res) => {
        //  console.log('err: ' + err);
        //});

        let tempID = await new Promise((resolve, reject) => {
          mysqlConn.query(`select * from player_logins where player_id = ${req.session.uvi} and logged_out = 0 order by date_time desc`, (err, res) => {
            if (res != null && res != '' & typeof res != "undefined") {
              selected_id = res[0]['player_id'];
              console.log('selected id is ' + selected_id);
              console.log('resolving res[0][\'player_id\'] which is ' + res[0]['player_id']);
              resolve(res[0]['player_id']);
              console.log('Forcing user to demo mode');
              req.session.uvi = 0;
              response.redirect('/demoplay');
            } else {
              //let nowDate = new Date().toJSON();
              let nowDate = new Date();
              mysqlConn.query(`insert into player_logins (player_id, logged_out, date_time, daily_plays) values (${req.session.uvi}, 0, ${mysqlConn.escape(nowDate)}, ${standardCredit})`, (err, res, fields) => {
                if (res) {
                  console.log('Inserted id ' + res['insertId'] + ' into `player_logins`');
                  resolve(res['insertId']);
                  response.redirect('/play');
                }
                if (err) {
                  console.log('err: ' + err);
                  return false;
                }
              });
            }
            console.log('err: ' + err);
            if (err) return false;
          });
        });
      }
    } else {
      console.log('Who are you?');
      response.redirect('/');
    }
    //return response.redirect('/play');
  });
});

app.post('/analytics', (req, res) => {
  console.log('unloading in /analytics...');
  let uvi = req.session.uvi;
  console.log('');
  console.log('uvi from session: ' + uvi);
  console.log('');
  if (uvi != 0 && uvi != '' & uvi != null & typeof uvi != "undefined") {
    mysqlConn.query(`update player_logins set logged_out = 1 where player_id = ${uvi}`);
  }
});

app.get('/demoplay', async (req, res) => {
  req.session.user = 'demo';
  req.session.uvi = 0;
  req.session.access = 6;
  req.session.credit = standardCredit; // Per Alan, 10/03/2023. It was 1000.

  const username = req.session.user;
  const user = { name: username, time: Date.now().toString() };
  const uvi = req.session.uvi;
  const token = ex.createAccessToken(user);
  res.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
  //res.cookie('user', `demo`);
  res.cookie('uvi', uvi);
  return res.redirect('/play');
});

app.post('/credit_add', async (req, res) => {
  const authHeader = req.cookies['accessToken'];
  const token = authHeader && authHeader.split(' ')[1];
  if (authHeader) {
    const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
      if (err) {
        return false;
      }
      return verified;
    });
    console.log('^^^ validToken: ' + validToken);
    console.log('^^^ validToken.name: ' + validToken.name);
    console.log('^^^ req.session.user: ' + req.session.user);
    var uvi = req.cookies['uvi'];
    console.log('^^^ uvi in cookie: ' + uvi);
    mysqlConn.query(`update player_credit set credit = (credit + 1) where player_id = ${uvi}`, (err, res) => {
      //console.log('err: ' + err);
    });
  }
});

app.post('/credit_use', async (req, res) => {
  const authHeader = req.cookies['accessToken'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('### authHeader: ' + authHeader);
  console.log('### req.body.amount: ' + req.body.amount);
  if (authHeader) {
    const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
      if (err) {
        return false;
      }
      return verified;
    });
    console.log('### validToken: ' + validToken);
    console.log('### validToken.name: ' + validToken.name);
    console.log('### req.session.user: ' + req.session.user);
    if (validToken.name !== req.session.user) {
      return res.json({ credit: '-99' });
    }
    var username = validToken.name;
    // Reactivated 11-08-2023
    if (validToken.name == 'demo') {
      credit_result -= 1;
    } else {
      credit_result--;
      if (credit_result < 0) { credit_result = 0; }
      mysqlConn.query(`update player_credit set credit = ${credit_result} where player_id = ${req.session.uvi}`);
//      const credit = await new Promise((resolve, reject) => {
//           mysqlConn.query(`select credit from player_credit where player_id = ${req.session.uvi}`, (err, results, fields) => {
      //     if (err) {
      //       return false;
      //     }
           // console.log(`credit?: ${results[0]}`);
//          resolve(results[0]['credit']);
           // resolve(123)
//        });
//      });
      //credit_result = credit;
    }


//     const credit_result = await new Promise((resolve, reject) => {
//       mysqlConn.query(`select credit from player_credit where player_id = ${req.session.uvi}`, (err, results, fields) => {
//         if (err) {
//           console.log('### err in credit_result query.  Returning...');
//           return false;
//         }
//         console.log('### credit in credit_result query: ' + results[0]['credit']);
//         resolve(results[0]['credit']);
//         // resolve(123)
//       });
//     });
//
//     console.log('### credit_result after credit query: ' + credit_result);

    //const credit_result = standardCredit; // Per Alan, 10/03/2023. It was 1000.  11-08-2023

    if (credit_result > 0) {  // Use false && to bypass this code    11-08-2023
      //check then insert selection number
      // const last_10_drawings = await new Promise((resolve, reject) => {
      //   mysqlConn.query(`select * from player_selections where player_id = ${req.session.uvi}`)
      // });
      //console.log('### Updating player_credit...');  // Commented 11-08-2023
      //mysqlConn.query(`update player_credit set credit = credit - ${req.body.amount} where player_id = '${req.session.uvi}'`);  // Commented 11-08-2023
      let nextDrawingNum = getDrawingNumber();
//      const last_drawing_id = await new Promise((resolve, reject) => {
//        mysqlConn.query('select id from drawings order by id desc limit 1', (err, results) => {
//          if (err) return false;
//          if (results != null && results != '' && typeof(results) != "undefined") {
//            resolve(results[0]['id']);
//          }
//        })
//      });
      const last_24_hours = await new Promise((resolve, reject) => {
        let oneDayAgoOnMidnight = new Date(Date.now());
        console.log('### Initial oneDayAgoOnMidnight: ' + oneDayAgoOnMidnight);
        oneDayAgoOnMidnight.setDate(oneDayAgoOnMidnight.getDate() - 1);
        oneDayAgoOnMidnight.setHours(0);
        oneDayAgoOnMidnight.setMinutes(0);
        oneDayAgoOnMidnight.setSeconds(0);
        oneDayAgoOnMidnight.setMinutes(0);
        console.log('### Adjusted oneDayAgoOnMidnight: ' + oneDayAgoOnMidnight);
        let queryLimitDate = '' + oneDayAgoOnMidnight.getFullYear() + '-' + (oneDayAgoOnMidnight.getMonth() + 1) + '-' + oneDayAgoOnMidnight.getDate() + ' ' + '00:00:00';
        console.log('### queryLimitDate: ' + queryLimitDate);
        mysqlConn.query(`select count(*) as count from player_selections where player_id = ${req.session.uvi} and date_time >= '${queryLimitDate}'`, (err, results) => {
          if (err) {
            return false;
          }
          resolve(results[0]['count']);
        });
      });
      console.log('### last_24_hours: ' + last_24_hours);
      if (last_24_hours > standardCredit && req.session.uvi != 'demo' && req.session.uvi != 0) {
        // reject({err: 'too many bets', last_48: last_24_hours});
        console.log('^^^ too many bets! Returning -57...');
        return res.json({ credit: -57, msg: 'too many bets' });
      }

      var gameNumber = req.body.gameNumber;
      var thisWinningNumber = req.body.winningNumber;
      console.log('### gameNumber: ' + gameNumber);
      console.log('### thisWinningNumber: ' + thisWinningNumber);
      if (typeof thisWinningNumber != "undefined" && typeof gameNumber != "undefined") {
        console.log('### Inserting into `player_selections`...');
        mysqlConn.query(`insert into player_selections (player_id, selection, winning_number, drawing_id, drawing_num, date_time) values (${req.session.uvi}, '${padWithZeros(req.body.numText)}', '${padWithZeros(thisWinningNumber)}', 0, '${padWithZeros(gameNumber)}', ${mysqlConn.escape(new Date(Date.now()))})`);
      }
//      mysqlConn.query(`insert into player_selections (player_id, selection, drawing_id, drawing_num, date_time) values (${req.session.uvi}, '${padWithZeros(req.body.number_selection)}', ${last_drawing_id + 1}, ${nextDrawingNum}, ${mysqlConn.escape(new Date(Date.now()))})`);
      // mysqlConn.query(`update player_credit set credit = credit - 1 where player_id = ${req.session.uvi}`);
      return res.json({ credit: credit_result, msg: 'OK' });
    } else {
      console.log('^^^ credit_result <= 0.  Returning credit_result: ' + credit_result);
      return res.json({ credit: credit_result, msg: 'Too low' });
    }
  } else {
    console.log('^^^ authHeader is false or 0.  Returning 0');
    return res.json({ credit: 0, msg: 'bad auth' });
  }
});

app.get('/credit', async (req, res) => {
  const authHeader = req.cookies['accessToken'];
  const token = authHeader && authHeader.split(' ')[1];
  if (authHeader) {
    const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
      if (err) {
        return false;
      }
      return verified;
    });
    if (validToken.name !== req.session.user) {
      return res.json({ credit: '-99', user: 'bar' });
    }
    console.log('user in /credit is ' + req.session.user);
    if (req.session.user == 'demo') {
       credit_result = standardCredit; // Per Alan, 10/03/2023. It was 1000.
       return res.json({ credit: `${credit_result}`, user: 'demo' });
    } else {
       //var daily_plays = standardCredit;  // Commented 11-08-2023
       var credit = await new Promise((resolve, reject) => {
         //mysqlConn.query(`select daily_plays from player_logins where player_id = ${req.session.uvi} order by id desc limit 1`, (err, results, fields) => {
         mysqlConn.query(`select credit from player_credit where player_id = ${req.session.uvi}`, (err, results, fields) => {
            if (err) {
              console.error(err);
              return false;
            }
            console.log('results in /credit is ' + results);
            if (results != null && results != '' && typeof results != 'undefined') {
              for (let key in results[0]) {
                console.log('key: ' + key + ' results[0][key]: ' + results[0][key]);
//                if (key == 'daily_plays') {
//                  daily_plays = results[0][key];
//                }
//                if (key == 'credit') {
//                  credit_result = credit;
//                }
              }
//              resolve(results[0]['daily_plays']);
              resolve(results[0]['credit']);
//              daily_plays = results[0]['daily_plays'];
//              console.log('daily_plays in /credit is ' + daily_plays);
//              return credit;
            }
          });
        });
        //return res.json({ credit: `${credit_result}`, keith: 'bar' });
        credit_result = credit;
        console.log('Before return in /credit: credit_result is ' + credit_result);
        return res.json({ credit: `${credit_result}`, user: `${req.session.user}`});
      }
    }
});

app.get('/validateEmail/:oid/:hash', (req, res) => {
  return res.sendFile(__dirname + '/emailVerify.html');
});

app.post('/tallyZero', async (req, res) => {
  const authHeader = req.cookies['accessToken'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('### authHeader: ' + authHeader);
  if (authHeader) {
    const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
      if (err) {
        return false;
      }
      return verified;
    });

    mysqlConn.query(`insert into zero_tally (player_id, date_time) values (${req.session.uvi}, ${mysqlConn.escape(new Date(Date.now()))})`);
  }
});

app.get('/get_tally', async (req, res) => {
  const authHeader = req.cookies['accessToken'];
  const token = authHeader && authHeader.split(' ')[1];
  var tallyCount = 0;

  console.log('### authHeader: ' + authHeader);
  if (authHeader) {
    const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
      if (err) {
        return false;
      }
      return verified;
    });

    tallyCount = await new Promise((resolve, reject) => {
      mysqlConn.query(`select count(*) as tallyCount from zero_tally`, (err, res) => {
        if (res != null && res != '' & typeof res != "undefined") {
          resolve(res[0]['tallyCount']);
        }
        if (err) return false;
      });
    });

    return res.json({ tallyCount: tallyCount });
  }
});

app.post('/emailPassthrough', (req, res) => {
  mysqlConn.query(`select p.*, coalesce(c.credit, 0) as credit from players as p left join player_credit as c on p.id = c.player_id where p.id = '${req.body.oid}' and p.tempHash = '${req.body.hash}'`, (err, results, fields) => {
    if (err) {
      return res.send(new Error(err));
    }

    if (results.length > 0) {
      if (results[0]["access"] == 0) {
        const accessLevel = 3;
        mysqlConn.query(`update players set access = ${accessLevel} where id = ${req.body.oid}`);

        req.session.user = results[0]['name'];
        req.session.uvi = results[0]['id'];
        req.session.access = accessLevel;
        req.session.credit = results[0]['credit'];

        const username = results[0]['name'];
        const user = { name: username, time: Date.now().toString() };
        const token = ex.createAccessToken(user);
        res.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
        res.cookie('user', `${results[0]['name']}`);
        mysqlConn.query(`insert into player_logins (player_id, logged_out, date_time) values (${req.body.oid}, 0, ${mysqlConn.escape(new Date(Date.now()))})`);
        return res.redirect('/play');
      } else {
        return res.redirect('/');
      }
    } else {
      return res.redirect('/');
    }
  });
});

app.get('/emailVerification/:oid/:hash', (req, res) => {
  mysqlConn.query(`select p.*, coalesce(c.credit, 0) as credit from players as p left join player_credit as c on p.id = c.player_id where p.id = '${req.params.oid}' and p.tempHash = '${req.params.hash}'`, (err, results, fields) => {
    if (err) {
      return res.send(new Error(err));
    }

    if (results.length > 0) {
      if (results[0]["access"] == 0) {
        // mysqlConn.query(`update players set access = 3 where id = ${req.params.oid}`);

        // req.session.user = results[0]['name'];
        // req.session.uvi = results[0]['id'];
        // req.session.access = results[0]['access'];
        // req.session.credit = results[0]['credit'];

        // const username = results[0]['name'];
        // const user = { name: username, time: Date.now().toString() };
        // const token = ex.createAccessToken(user);
        // res.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
        mysqlConn.query(`insert into player_logins (player_id, logged_out, date_time) values (${req.params.oid}, 0, ${mysqlConn.escape(new Date(Date.now()))})`);
        return res.sendFile(__dirname + '/emailVerify.html');
      } else {
        return res.redirect('/');
      }
    } else {
      return res.redirect('/');
    }
  });

  // return res.redirect('/');
});

app.post('/validateSignup', async (req, res) => {

  if (!validator.validate(req.body.email)) {
    //bad
    res.set('morno', 'true');
    return res.redirect('/signup');
  }
  let tempHash = uuid().replace(/-/gi, '');
  await new Promise((resolve, reject) => {
    mysqlConn.query(`insert into players (name, email, password, access, tempHash, state, postalCode, pronoun) values (${mysqlConn.escape(req.body.name)}, ${mysqlConn.escape(req.body.email)}, ${mysqlConn.escape(req.body.pass)}, 0, '${tempHash}', ${mysqlConn.escape(req.body.state)}, ${mysqlConn.escape(req.body.postalCode)}, ${mysqlConn.escape(req.body.pronoun)})`, async (err, results, fields) => {
      if (err) {
        console.error(`/validateSignup: ${err}`);
        if (err.errno === 1062) {
          res.set('duperr', 'true');
          return res.redirect('/signup');
        }
        res.set('err', err);
        return res.send('Error: ' + err);
      }


      req.session.user = req.body.user_name;
      req.session.uvi = results.insertId;
      req.session.access = 0;
      req.session.credit = 1;

      const username = req.body.user_name;
      const user = { name: username, time: Date.now().toString() };
      const token = ex.createAccessToken(user);
      res.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
      mysqlConn.query(`insert into player_logins (player_id, logged_out, date_time, daily_plays) values (${req.session.uvi}, 0, ${mysqlConn.escape(new Date(Date.now()))}, ${standardCredit})`);

      mysqlConn.query(`insert into player_credit (player_id, credit) values (${mysqlConn.escape(req.session.uvi)}, ${mysqlConn.escape(req.session.credit)})`);

      sendCustomEmail({ to: `${req.body.email}`, subject: "Email Verification", text: "Please confirm your email", html: `<b>Hello ${req.body.name},</b><br /><a href="https://colorball-ads.com/emailVerification/${results.insertId}/${tempHash}" target="_blank">Please click this link to verify your email address with Colorball.</a><br /><br />If you are having problems with the link, copy and paste this URL into a browser:<br />https://colorball-ads.com/emailVerification/${results.insertId}/${tempHash}` });
      // mysqlConn.query(`insert into player_credit (player_id, credit) values (${results.insertId}, 0)`);

      return res.redirect('/');
    });
  });
});

app.get('/ghost', (req, res) => {
  return res.send('ghost');
});

app.get('/login', (req, res) => {
  return res.sendFile(__dirname + '/login.html');
});

app.get('/logout', (req, res) => {
    mysqlConn.query(`update player_logins set logged_out = 1 where player_id =${req.session.uvi}`, async (err, results, fields) => {
//    if (err) {
//      res.set('err', err);
//      return res.send('Error: Trying to update logged_out');
//    }
    req.session.destroy();
    res.clearCookie('accessToken', { httpOnly: true });
    res.clearCookie('user');
    res.clearCookie('uvi');
    res.clearCookie('showSpecialView');
    res.redirect('/');
  });
});

app.get('/terms', (req, res) => {
  return res.sendFile(__dirname + '/terms.html');
});

app.get('/privacy', (req, res) => {
  return res.sendFile(__dirname + '/privacy.html');
});

app.get('/ads', (req, res) => {
  return res.sendFile(__dirname + '/ads.html');
});

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/home.html');
});

app.get('/noThanks', (req, res) => {
  return res.sendFile(__dirname + '/home.html');
});

app.get('/services', (req, res) => {
  return res.sendFile(__dirname + '/services.html');
});

app.get('/contact', (req, res) => {
  return res.sendFile(__dirname + '/contact.html');
});

app.post('/newPass', (req, res) => {
  //reset new password
  if (!validator.validate(req.body.email)) {
    //bad
    res.set('morno', 'true');
    return res.redirect('/signup');
  }
  let tempHash = uuid().replace(/-/gi, '');
  mysqlConn.query(`update players set password=${mysqlConn.escape(req.body.pass)} where tempHash='${req.body.hash}' and email=${mysqlConn.escape(req.body.email)}`, async (err, results, fields) => {
    if (err) {
      if (err.errno === 1062) {
        res.set('duperr', 'true');
        return res.redirect('/signup');
      }
      res.set('err', err);
      return res.send('Error: ');
    }

    // req.session.user = req.body.name;
    // req.session.uvi = results.insertId;
    // req.session.access = 0;
    // req.session.credit = 0;

    // const username = req.body.name;
    // const user = { name: username, time: Date.now().toString() };
    // const token = ex.createAccessToken(user);
    // res.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
    // mysqlConn.query(`insert into player_logins (player_id, logged_out, date_time) values (${req.session.uvi}, 0, ${mysqlConn.escape(new Date(Date.now()))})`);

    sendCustomEmail({ to: `${req.body.email}`, subject: "Password Reset Confirmation", text: "Password Reset Confirmation.", html: `Your password has been reset.` });

    return res.redirect('/');
  });
});

app.get('/passwordReset/:id/:hash', (req, res) => {
  return res.sendFile(__dirname + '/passwordReset.html');
});

app.post('/passReset', (req, res) => {
  let tempHash = uuid().replace(/-/gi, '');
  mysqlConn.query(`select * from players where email='${req.body.user}'`, (err1, results1, fields1) => {
    if (err1) {
      console.error(`error getting data: ${JSON.stringify(err1)}`);
      res.set('err', err1);
      return res.json({ error: err1 });
    }
    mysqlConn.query(`update players set tempHash='${tempHash}' where email='${req.body.user}'`, async (err, results, fields) => {
      if (err) {
        res.set('err', err);
        return res.json({ error: err });
      }
      try {
        let html = `<b>Hello ${results1[0]['name']},</b><br /><a href="https://colorball-ads.com/passwordReset/${results1[0]['id']}/${tempHash}" target="_blank">Please click this link to reset your password.</a><br /><br />If you are having problems with the link, copy and paste this URL into a browser:<br />https://colorball-ads.com/passwordReset/${results1[0]['id']}/${tempHash}`;
        sendCustomEmail({ to: `${req.body.user}`, subject: "Password Reset", text: "Password Reset.", html });
        return res.send(`A link has been sent to your email to reset your password.`);//json({ resetPass: true, user: req.body.user });
      } catch (e) {
        console.log(`error sending reset email: ${JSON.stringify(e)}`);
        return res.send(`technical difficulties`);
      }
    });
  });
});

app.get('/forgotPass', (req, res) => {
  return res.sendFile(__dirname + '/forgotPass.html');
});

//app.get('/play', ex.checkForDemo, (req, res) => {
app.get('/play', (req, res) => {
  //get last 32 plays plus current play (including start time)
  let isDemo = false;
  console.log('req.session.uvi 2 is: ' + req.session.uvi);
  if(!req.session.uvi || typeof req.session.uvi == "undefined") {
  //   // console.log(`^%^%^%^% not logged in play`);
  //   // console.log(`^%^%^%^% not logged in play`);
    console.log(`### not logged in, in /play`);
    isDemo = true;
    req.session.user = 'demo';
    req.session.uvi = '0';
    req.session.access = 6;
    req.session.credit = standardCredit; // Per Alan, 10/03/2023. It was 1000.

    const username = 'demo';
    const user = { name: username, time: Date.now().toString() };
    const token = ex.createAccessToken(user);
    res.cookie('accessToken', `Bearer ${token}`, { httpOnly: true, maxAge: 3000000 });
    res.cookie('user', 'demo');
  //   return res.redirect('/demoplay');
  } else {
  //   console.log(`$^$^%$ logged in?????`);
  //   console.log(`$^$^%$ logged in?????`);
  //   console.log(`$^$^%$ logged in?????`);
    console.log(`### logged in.`);
  }
  console.log(`### req.session: `, req.session);

  if (req.session.user) {
    let user_name = req.session.user;
  } else {
    let user_name = 'demo';
  }
  console.log('### in /play, req.session.uvi is ' + req.session.uvi);
  mysqlConn.query(`select * from player_credit pc where pc.player_id = '${req.session.uvi}' order by pc.id desc limit 1;`, (err, results) => {
    console.log('err: ' + err);
    console.log('results: ' + results);
    if (results != null && results != '' && typeof(results) != "undefined") {
      //plays_remaining = results[0]['daily_plays'];
      credit = results[0]['credit'];
      credit_result = credit;
      console.log('results in /play: ');
      for (let key in results[0]) {
        console.log('key: ' + key + ' results[0][key]: ' + results[0][key]);
      }
      //console.log('### After query in /play: plays_remaining: ' + plays_remaining);
      console.log('### After query in /play: credit_result: ' + credit_result);
      //req.session.credit = plays_remaining;
      req.session.credit = credit_result;
    }
    let showSpecialView = 0;
    // if (req.session.uvi === 59 || req.session.uvi === 1) {
    //   showSpecialView = 1;
    // }
    res.cookie('showSpecialView', `${showSpecialView}`);
    //res.cookie('uvi',`${req.session.uvi}`);
    if (results != null && results != '' && typeof(results) != "undefined") {
//      var options = {
//        headers: {
//          'sample': 'field',
//          'date_time': results[0]['date_time'],
//          'showSpecialView': showSpecialView,
//          'isDemo': false,
//          'uvi': results[0]['player_id'],
//          'user_name': req.session.user
//        }
//      };
      var options = {
        headers: {
          'sample': 'field',
          'showSpecialView': showSpecialView,
          'isDemo': false,
          'uvi': results[0]['player_id'],
          'user_name': req.session.user,
          'credit': results[0]['credit']
        }
      };
    } else {
      //var options = false;
      var options = {
        headers: {
          'isDemo': true,
          'uvi': req.session.uvi,
          'user_name': req.session.user,
          'credit': `4`
        }
      };
    }
    console.log('options:');
    for (let key in options) {
      console.log('key: ' + key + ' options[key]: ' + options[key]);
      if (key == 'headers') {
        for (let key2 in options['headers']) {
          console.log('key2: ' + key2 + ' -- ' + options['headers'][key2]);
        }
      }
    }
    return res.sendFile(__dirname + '/new_demo.html', options);
    // return res.render('new_demo.html', options);
  });
});

app.get('/about', (req, res) => {
  return res.sendFile(__dirname + '/about.html');
});

app.get('/guys', (req, res) => {
  return res.sendFile(__dirname + '/guys.html');
});

app.get('/gals', (req, res) => {
  return res.sendFile(__dirname + '/gals.html');
});

app.get('/homeVideo', (req, res) => {
  return res.sendFile(__dirname + '/homeVideo.html');
});

app.get('/advertisers', (req, res) => {
  return res.sendFile(__dirname + '/advertisers.html');
});

app.get('/legality', (req, res) => {
  return res.sendFile(__dirname + '/legality.html');
});


app.get('*', (req, res) => {
  // return res.send(`${req.path} does not exist`);
  return res.redirect('/');
});


const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {

  function sendAll(data) {
    wsServer.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    })
  }

  //check if already played today
  // mysqlConn.query(`select * from player_game_entrance where player_id = `);
  //initialize a new connection
  mysqlConn.query(`select * from drawings order by date_time desc limit 33`, (err, results, fields) => {
    if (err) {
      return res.send(new Error(err));
    }

    let first32Drawings = {};
    results.forEach((drawing) => {
      let num1 = getBallFromNum(drawing.num1);
      let num2 = getBallFromNum(drawing.num2);
      let num3 = getBallFromNum(drawing.num3);
      let num4 = getBallFromNum(drawing.num4);
      let drawNum = getDrawingNumberFromTime(drawing.date_time);
      first32Drawings[drawing.id] = { winningNumber: `${num1}${num2}${num3}${num4}`, origDrawingNum: drawing.drawing_num, drawingNum: drawNum, time: drawing.date_time, num1: drawing.num1, num2: drawing.num2, num3: drawing.num3, num4: drawing.num4 };
      // socket.send(JSON.stringify({title: 'test', data: {text: `hello?? ${num1}, ${num2}, ${num3}, ${num4}`, drawingNum: drawNum}}));
    });
    socket.send(JSON.stringify({ title: 'init', data: first32Drawings }));
  });
  socket.on('message', message => {
    console.log(`message received: ${message}`);
    // socket.send(`we received the following message from you: ${message}`);
    // wsServer.clients.forEach(function each(client) {
    //   if (client.readyState === ws.OPEN) {
    //     client.send(message);
    //   }
    // });
  });

  let lastGameData = {};
  let gameMinute = 0;
  let gameTime = 0;
  let newDrawingNum = 0;
  let newDrawingId = 0;

  /*
  play first videos and fast forward to correct position

  1. wait until time is at :40 or :10
  2. close bets
  3. wait 1 second then select 4 videos
  4. wait 1 second then broadcast videos
  5. wait until time is at :60 or :30, then start videos and open bets
  6. wait an additional second?

  let tt = () => {tempTime = new Date(Date.now()); tempTime.setMilliseconds(0); tempTime.setSeconds(59); console.log(tempTime);};
  let tn = () => {tempNow = new Date(Date.now()); console.log(tempNow);};
  `${gs()} :: ${gs() % 30}`;
  const gh = () => new Date(Date.now()).getHours();
  const gs = () => new Date(Date.now()).getSeconds();
  let dt = () => {delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds(); console.log(delay);};
  let dt = () => {tn(); tt(); delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds(); console.log(delay);};
  */
  if (!started) {
    started = true;
    loop = true;
    start = Date.now();

    (async () => {
      while (true) {
        //get delay time as 10 seconds until end of play interval (i.e. T minus 10 seconds)
        let delayTime = ex.gtl(playInterval) - 3;
        gameTime = new Date(Date.now());
        gameTime.setMilliseconds(0);
        if (gameTime.getSeconds() < 30) gameTime.setSeconds(0);
        else gameTime.setSeconds(30);
        console.log(`gameTime: `, gameTime);
        console.log(`delay time 1: ${delayTime}`);
        if (delayTime < 0) delayTime += 30;
        delayTime *= 1000;
        console.debug(`initial delay time: ${delayTime}`);

        await ex.wait(delayTime).then(() => {
          //close bets after delay time
          sendAll({ title: 'closeBets', data: { close: true } });
          console.log('lastGameData: ' + (lastGameData));
          if (lastGameData.id) {
            console.log('checking for winner');
            console.log((lastGameData));
            //mysqlConn.query(`select p.name, p.email, s.player_id, s.selection, s.drawing_id, s.drawing_num, s.date_time from player_selections as s join players as p on s.player_id = p.id where s.drawing_id = ${lastGameData.id} and s.selection = ${lastGameData.winningNumber}`, (err, results, fields) => {

            mysqlConn.query(`select p.name, p.email, s.player_id, s.selection, s.winning_number, s.drawing_id, s.drawing_num, s.date_time from player_selections as s join players as p on s.player_id = p.id where s.selection = s.winning_number`, (err, results, fields) => {
              if (err) {
                console.error(`LINE 612 query error`);
                console.error(err);
                throw err;
              }

              if (results.length > 0) {
                console.error(`WINNER!!`);
                results.map(item => {
                  //console.log(`winner item: ${JSON.stringify(item)}`);
                  let to = `${item.email}`;
                  let subject = 'colorball-ads.com - WINNER!!!'
                  let text = `You're a Winner!! Claim your prize at colorball-ads.com`;
                  let html = `${item.name},<br /> You're a Winner!<br /><br />Contact support@colorball-ads.com for your winnings`;
                  //sendCustomEmail({ to, subject, text, html });
                });
              } else {
                console.error('NO WINNERS :(');
              }
            });

          }
          let videos = ex.myRand(ex.moviesList, 4);
          return videos;
        }).then(async (vs) => {
          //wait 1 second, then
          const newNowMilli = 0;
          await ex.wait(1000 - newNowMilli).then(async () => {
            let tempD = {
              subject: 'test',
              arr: vs
            };

            // let tempMin = new Date(newMinute);
            // tempMin.setSeconds(0);

            newDrawingNum = getDrawingNumber(gameTime);
            newDrawingId = await new Promise((resolve, reject) => {
              mysqlConn.query(`insert into drawings (num1, num2, num3, num4, date_time, drawing_num) values (${vs[0]}, ${vs[1]}, ${vs[2]}, ${vs[3]}, ${mysqlConn.escape(gameTime)}, ${newDrawingNum})`, async (error, results, fields) => {
                if (error) reject(new Error(error));
                resolve(results.insertId);
              });
            });

            lastGameData.id = newDrawingId;
            lastGameData.winningNumber = `${ex.getMiddleNumber(vs[1 - 1])}${ex.getMiddleNumber(vs[2 - 1])}${ex.getMiddleNumber(vs[3 - 1])}${ex.getMiddleNumber(vs[4 - 1])}`;
            console.log('game data');
            console.log(lastGameData);

            sendAll({ title: 'videos', data: tempD });
            now = new Date().getSeconds();
            return;
          });
          return vs;
        }).then(async () => {
          let delay = ex.gtl(playInterval) * 1000;
          console.log(`delay until open bets: `, delay);
          await ex.wait(delay).then(() => {
            sendAll({ title: 'openBets' });
            return;
          });
          return;
        }).then(async () => {
          await ex.wait(1000).then(() => {
            sendAll({ title: 'startVids' });
            return;
          });
          return;
        }).then(async () => {
          await ex.wait(1000).then(() => {
            return;
          });
          return;
        });
      }
    })();

    /*(async () => {
      let firstNums = {
        subject: 'test',
        arr: ex.myRand(ex.moviesList, 4)
      };
      sendAll({ title: 'videos', data: firstNums });
      while (loop) {
        let newMinute = new Date(Date.now());
        newMinute.setMilliseconds(0);
        if (newMinute.getSeconds() >= 50 || (newMinute.getSeconds() >= 20 && newMinute.getSeconds() <= 30)) {
          //another minute
          newMinute.setMinutes(newMinute.getMinutes() + 1);
        }
        newMinute.setSeconds(50);
        now = new Date(Date.now());
        let delayTime = (Date.parse(newMinute) + newMinute.getMilliseconds()) - (Date.parse(now) + now.getMilliseconds());
        console.debug(`initial delay time: ${delayTime}`);

        await ex.wait(delayTime).then(() => {
          //get 4 rand
          sendAll({ title: 'closeBets', data: { close: true } });
          let vids;
          vids = ex.myRand(ex.moviesList, 4);
          videos = vids;
          //check if anyone won this round
          if (lastGameData.id) {
            console.warn(`check for winner`);
            console.warn((lastGameData));
            mysqlConn.query(`select p.name, p.email, s.player_id, s.selection, s.drawing_id, s.drawing_num, s.date_time from player_selections as s join players as p on s.player_id = p.id where s.drawing_id = ${lastGameData.id} and s.selection = ${lastGameData.winningNumber}`, (err, results, fields) => {
              if (err) {
                console.error(`LINE 612 query error`);
                console.error(err);
                throw err;
              }

              if (results.length > 0) {
                console.error(`WINNER!!`);
                results.map(item => {
                  console.log(`winner item: ${JSON.stringify(item)}`);
                  let to = `${item.email}`;
                  let subject = 'colorball-ads.com - WINNER!!!'
                  let text = `You're a Winner!! Claim your prize at colorball-ads.com`;
                  let html = `${item.name},<br /> You're a Winner!<br /><br />Contact support@colorball-ads.com for your winnings`;
                  sendCustomEmail({to, subject, text, html});
                })
                // let to =
              } else {
                console.error('NO WINNERS :(');
              }
            });

          }
          return vids;
        }).then(async (vs) => {
          const newNowMilli = 0;
          await ex.wait(1000 - newNowMilli).then(async () => {
            let tempD = {
              subject: 'test',
              arr: vs
            };

            let tempMin = new Date(newMinute);
            tempMin.setSeconds(0);

            let newDrawingNum = getDrawingNumber();
            let newDrawingId = await new Promise((resolve, reject) => {
              mysqlConn.query(`insert into drawings (num1, num2, num3, num4, date_time, drawing_num) values (${vs[0]}, ${vs[1]}, ${vs[2]}, ${vs[3]}, ${mysqlConn.escape(tempMin)}, ${newDrawingNum})`, async (error, results, fields) => {
                if (error) reject(new Error(error));
                resolve(results.insertId);
              });
            });

            lastGameData.id = newDrawingId;
            lastGameData.winningNumber = `${ex.getMiddleNumber(vs[1 - 1])}${ex.getMiddleNumber(vs[2 - 1])}${ex.getMiddleNumber(vs[3 - 1])}${ex.getMiddleNumber(vs[4 - 1])}`;
            console.log('game data');
            console.log(lastGameData);

            // mysqlConn.query(`insert into player_selections (player_id, selection, drawing_id, drawing_num, date_time) values (59, '${padWithZeros(lastGameData.winningNumber)}', ${lastGameData.id}, ${newDrawingNum}, ${mysqlConn.escape(new Date(Date.now()))})`);
            // mysqlConn.query(`insert into player_selections (player_id, selection, drawing_id, drawing_num, date_time) values (62, '${padWithZeros(lastGameData.winningNumber)}', ${lastGameData.id}, ${newDrawingNum}, ${mysqlConn.escape(new Date(Date.now()))})`);

            sendAll({ title: 'videos', data: tempD });
            now = new Date().getSeconds();
            return;
          });
          return vs;
        }).then(async (vs) => {
          let tempTime = new Date(Date.now());
          tempTime.setMilliseconds(0);
          tempTime.setSeconds(59);
          let tempNow = new Date(Date.now());
          let delay = Date.parse(tempTime) - Date.parse(tempNow) + tempNow.getMilliseconds();
          await ex.wait(delay).then(() => {
            sendAll({ title: 'openBets' });
            return;
          });
          return;
        }).then(async () => {
          await ex.wait(1000).then(() => {
            sendAll({ title: 'startVids' });
            return;
          });
          return;
        }).then(async () => {
          await ex.wait(1000).then(() => {
            return;
          });
          return;
        });
      }
    })();*/
  }
});

// wsServer.on('close', () => {
//   console.log('user disconnected');
// });


const server = http.listen(3000, () => {
  console.log('listening on *:3000');
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

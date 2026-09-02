const jwt = require("jsonwebtoken");

// exports.temp = 'keith';

exports.myRand = function (arr, m) {
	let returnArr = [];

	while (returnArr.length < m) {
		let randNum = Math.floor(Math.random() * 100);
		if (returnArr.indexOf(arr[randNum]) > -1) {
			continue;
		}
		returnArr.push(arr[randNum]);
	}
	return returnArr;
};

exports.wait = function (ms) {
	return new Promise((resolve) => {
		return setTimeout(resolve, ms);
	});
};

//get seconds
// exports.gs = () => new Date(Date.now()).getSeconds();
exports.gs = (modulo = 60) => new Date(Date.now()).getSeconds() % modulo;

//get minutes
exports.gm = () => new Date(Date.now()).getMinutes();

//get time left
exports.gtl = (t = 60) => t - this.gs(t);

exports.authenticateToken = function (req, res, next) {
	// Gather the jwt access token from the request header
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	// console.log(req.path);
	// console.log(window.location);
	if (token == null && req.path !== "/login") res.redirect('/login');//return res.send("must login");//res.sendStatus(401) // if there isn't any token

	if (req.path === '/validate' || req.path === '/ghost') {
		// return res.send('validate me');
		next();
	} else if (req.path === '/login' || req.path === '/favicon.ico') {
		next();
	} else if (token) {
		// console.log("token:");
		// console.log(token);
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			//console.log(err)
			if (err) return res.send("yi");//res.sendStatus(403)
			req.user = user
			next() // pass the execution off to whatever request the client intended
		});
	}
	next();
}

exports.checkForDemo = function (req, res, next) {
	if (!req.session.access || req.session.access < 3) {
		return res.redirect('/login');
	}
	next();
}

exports.createAccessToken = function (data) {
	return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
	// res.cookie('accessToken', `Bearer ${token}`, {httpOnly: true, maxAge: 11000});
	// next();
}

exports.checkSession = async function (req, res, next) {
	const authHeader = req.cookies['accessToken'];
	const token = authHeader && authHeader.split(' ')[1];
	//console.log(`*&*&* auth header: ${authHeader}`);
	//console.log(`$#$#$#$# token: `, token);
	if (authHeader) {
		//console.info(`@@@#@#@#@ authHeader: ${authHeader}`);
		//console.log(`@@@#@#@#@ token: `, token);
		const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
			if (err) {
				//console.log(`*&*&*&*& error: `, err);
				return false;
			}
			//console.log(`@@@#@#@#@ verified: `, verified);
			verified.time = Date.now().toString();
			delete verified.iat;
			delete verified.exp;
			delete verified.jti;
			return jwt.sign(verified, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
		});
		res.clearCookie('accessToken', { httpOnly: true });
		if (!validToken) {
			//console.warn(`UH-OH Spaghettios!! no valid token`);
			return res.redirect('/logout');
		}
		res.cookie('accessToken', `Bearer ${validToken}`, { httpOnly: true, maxAge: 3000000 });
	}

	// let pattern = /\/emailVerification.*/;
	let pathParts = req.path.split('/');
	// console.log("pathParts:");
	// console.log(pathParts);
	// // console.log(req.path);
	// if (!authHeader && req.path !== '/logout' && (req.path !== '/login' && req.path !== '/validate' && req.path !== '/signup' && req.path !== '/validateSignup' && req.path !== '/validateEmail' && !pattern.test(req.path))) return res.redirect('/logout');
	if (!authHeader) {
		switch (pathParts[1]) {
			case 'logout':
			case 'login':
			case 'ppt':
			case 'admin':
			case 'playerList':
			case 'answer_phone_call':
			case 'validate':
			case 'signup':
			case 'validateSignup':
			case 'validateEmail':
			case 'emailPassthrough':
			case 'emailVerification':
			case 'about':
			case 'legality':
			case 'videoAds':
			case 'Kiosks':
			case 'screens':
			case 'terms':
			case 'forgotPass':
			case 'passReset':
			case 'passwordReset':
			case 'newPass':
			case 'play':
			case 'demoplay':
			case 'emailSent':
			case 'privacy':
			case 'videoPage':
			case 'showAd':
			case 'screen4':
			case 'screenOrder':
			case 'screen5':
//			case 'screen1':
			case 'ads':
			case 'guys':
			case 'gals':
			case 'homeVideo':
			case 'advertisers':
			case '':
				//console.log(`***${pathParts[1]}*** no auth header but just go next`);
				//console.log('session: ' + req.session);
				break;
			default:
				//console.log("what?");
				//return res.redirect('/logout');
		}
	}
//	console.log('In re.js:');
//	console.log('user in session is ' + req.session.user);
//	console.log('uvi in cookie is ' + req.cookies['uvi']);
//	console.log('req.path is ' + req.path);
//	console.log('pathParts[1] is ' + pathParts[1]);
	if (req.session.user || req.cookies['uvi']) {
		if (req.path === '/login') {
			return res.redirect('/');
		}
		next();     //If session exists, proceed to page
	} else {
		var err = new Error("Not logged in!");

    if (req.path === '/play' && req.cookies['uvi'] > 0) {
      return res.redirect('/login');
    }
    
    if (req.path == '/videoAds') {
    	return res.redirect('/login');
    }

		// console.log(req.session.user);
		// next(err);  //Error, trying to access unauthorized page!
		// if (req.path !== '/login' && req.path !== '/validate' && req.path !== '/signup' && req.path !== '/validateSignup' && req.path !== '/validateEmail' && !pattern.test(req.path)) {
		// 	// console.log("he");
		// 	return res.redirect('/login');
		// }
		switch (pathParts[1]) {
			case 'logout':
			case 'login':
			case 'ppt':
			case 'admin':
			case 'playerList':
			case 'answer_phone_call':
			case 'validate':
			case 'signup':
			case 'validateSignup':
			case 'validateEmail':
			case 'emailPassthrough':
			case 'emailVerification':
			case 'about':
			case 'legality':
			case 'videoAds':
			case 'Kiosks':
			case 'screens':
			case 'terms':
			case 'forgotPass':
			case 'passReset':
			case 'passwordReset':
			case 'newPass':
			case 'play':
			case 'demoplay':
			case 'emailSent':
			case 'privacy':
			case 'videoPage':
			case 'showAd':
			case 'screen4':
			case 'screenOrder':
			case 'screen5':
//			case 'screen1':
			case 'ads':
			case 'guys':
			case 'homeVideo':
			case 'gals':
			case 'advertisers':
			case '':
				break;
			default:
				return res.redirect('/');
		}
		next();
	}
	//  next();
}

exports.generateAccessToken = function (username) {
	// expires after half and hour (1800 seconds = 30 minutes)
	return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
}

exports.padWithZeros = function (n) {
	let returnStr = '0000' + n;
	return returnStr.slice(-4);
}

exports.getDrawingNumber = function () {
	let now = new Date();
	let start = new Date(now.getFullYear(), 0, 0);
	let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
	let oneDay = 1000 * 60 * 60 * 24;
	let day = Math.floor(diff / oneDay);
	let hour = now.getHours() + 1;
	let mins = now.getMinutes() + 1;
	if (mins === 60) {
		mins = 0;
	}
	let drawingNum = padWithZeros(((hour - 1) * 60) + mins);
	let returnInt = parseInt((day + ((now.getFullYear() - yearZero) * 365)) + '' + drawingNum, 10);
	//console.log(`drawing num for day B: ${day} - ${hour}::${mins} = ${returnInt}`);
	return returnInt;
}

exports.getMiddleNumber = function (num) {
	return Math.floor(num / 10) % 10;
}

let demotype = 'color';
let movieIndexList = [];
for (let i = 0; i < 100; i++) {
	if (demotype === "white") {
		movieIndexList.push(300 + i);
	} else {
		movieIndexList.push(400 + i);
	}
}

exports.moviesList = movieIndexList;

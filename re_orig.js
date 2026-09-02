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
			console.log(err)
			if (err) return res.send("yi");//res.sendStatus(403)
			req.user = user
			next() // pass the execution off to whatever request the client intended
		});
	}
	next();
}

exports.checkForDemo = function (req, res, next) {
	if (!req.session.access || req.session.access < 2) {
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
	if (authHeader) {
		console.info(`authHeader: ${authHeader}`);
		const validToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, verified) {
			if (err) {
				return false;
			}
			verified.time = Date.now().toString();
			delete verified.iat;
			delete verified.exp;
			delete verified.jti;
			return jwt.sign(verified, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
		});
		res.clearCookie('accessToken', { httpOnly: true });
		if (!validToken) {
			console.warn(`UH-OH Spaghettios!! no valid token`);
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
			case 'validate':
			case 'signup':
			case 'validateSignup':
			case 'validateEmail':
			case 'emailPassthrough':
			case 'emailVerification':
			case 'about':
			case 'forgotPass':
			case 'passReset':
			case 'passwordReset':
			case 'newPass':
			case 'play':
			case 'emailSent':
			case '':
				console.log('no auth header but just go next');
				break;
			default:
				console.log("what?");
				return res.redirect('/logout');
		}
	}
	if (req.session.user) {
		if (req.path === '/login') {
			return res.redirect('/');
		}
		next();     //If session exists, proceed to page
	} else {
		var err = new Error("Not logged in!");
		// console.log(req.session.user);
		// next(err);  //Error, trying to access unauthorized page!
		// if (req.path !== '/login' && req.path !== '/validate' && req.path !== '/signup' && req.path !== '/validateSignup' && req.path !== '/validateEmail' && !pattern.test(req.path)) {
		// 	// console.log("he");
		// 	return res.redirect('/login');
		// }
		switch (pathParts[1]) {
			case 'logout':
			case 'login':
			case 'validate':
			case 'signup':
			case 'validateSignup':
			case 'validateEmail':
			case 'emailPassthrough':
			case 'emailVerification':
			case 'about':
			case 'forgotPass':
			case 'passReset':
			case 'passwordReset':
			case 'newPass':
			case 'play':
			case 'emailSent':
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
	console.log(`drawing num for day: ${day} - ${hour}::${mins} = ${returnInt}`);
	return returnInt;
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

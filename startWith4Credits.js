              //
              // Start off this login session with 4 credits...  But only once per day...
              //
              var okayToGetCredit = false;
              mysqlConn.query(`select * from player_logins where player_id = ${req.session.uvi} and logged_out = 1 order by date_time desc`, (err, res) => {
                if (res != null && res != '' & typeof res != "undefined") {
                  let last_logged_in_time = res[0]['date_time'];
                  console.log('Last logged in time: ' + last_logged_in_time);
                  let last_logged_in_dateobj = new Date(last_logged_in_time);
                  console.log('last_logged_in_dateobj: ' + last_logged_in_dateobj);
                  let last_logged_in_milliseconds = last_logged_in_dateobj.getTime();
                  console.log('last_logged_in_milliseconds: ' + last_logged_in_milliseconds);
                  let todayDate = new Date(Date.now());
                  console.log('todayDate: ' + todayDate);
                  let todayMilliseconds = todayDate.getTime();
                  console.log('todayMilliseconds: ' + todayMilliseconds);
                  let dayOfMilliseconds = 60 * 60 * 24 * 1000;
                  console.log('dayOfMilliseconds: ' + dayOfMilliseconds);
                  let milliseconds_since_login = todayMilliseconds - last_logged_in_milliseconds;
                  console.log('milliseconds_since_login: ' + milliseconds_since_login);
                  if (milliseconds_since_login >= dayOfMilliseconds) {
                    okayToGetCredit = true;
                  }
                } else {
                  console.log('User has no prev login records');
                  okayToGetCredit = true;
                }
              });
              console.log('okayToGetCredit: ' + okayToGetCredit);
              if (okayToGetCredit == true) {
                mysqlConn.query(`update player_credit set credit = (credit + ${standardCredit}) where player_id = ${req.session.uvi}`, (err, res) => {
                  console.log('err: ' + err);
                });
              }





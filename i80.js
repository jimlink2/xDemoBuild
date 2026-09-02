const express = require('express');
const app = express();
const http = require('http').createServer(app);

/*
app.get('/', (req, res) => {
  console.log('test');
  return res.send('test');
});

app.get('/demo', (req, res) => {
  console.log('test');
  //let errVar = tempVar.errMe;
  //throw new Error('err');
  process.nextTick(function () {
    throw new Error;
  });
  //console.log(errVar);
  return 'demo';
});
*/


 app.get('*', (req, res) => {
  res.header('X-keith', 'tada');
  res.redirect('https://' + req.headers.host + req.url);
});


app.listen(80, () => console.log("listening on port 3000"));

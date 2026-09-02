import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

function AnswerContent() {

    var params = 'username=Jim&digits=1471&gender=m';
    const queryString = window.location.search;
    alert(queryString);
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("answerContainer").innerHTML = JSON.parse(httpRequest.responseText);
        //document.getElementById("answerContainer").innerHTML = httpRequest.responseText;
        //document.getElementById("reactPlayer1").innerHTML = data;
      }
    };
    httpRequest.open('post', 'answer_phone_call', true);
    //httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send(params);

    return (
      <div>
          <div id="answerContainer">

          </div>
      </div>
    );
}

export default AnswerContent;
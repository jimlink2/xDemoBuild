import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

function PlayerContent() {

    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("reactPlayer1").innerHTML = JSON.parse(httpRequest.responseText);
        //document.getElementById("reactPlayer1").innerText = JSON.parse(httpRequest.responseText);
        //document.getElementById("reactPlayer1").innerHTML = httpRequest.responseText;
      }
    };
    //httpRequest.open('get', 'playerGet');
    httpRequest.open('get', 'playerList');
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send();

    return (
      <div>
          <div id="reactPlayer1">

          </div>
      </div>
    );
}

export default PlayerContent;
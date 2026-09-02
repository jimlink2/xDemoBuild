import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ScreenOrderContent extends Component {
    jQuerycode = () => {
      console.log("At top of jQuerycode()");

      //document.cookie = encodeURI("incr=1");

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
      
      let incr = decodeURI(getCookie("incr"));
      console.log(`the cookie 'incr' in screen4 is: `, incr);
      
      if (incr == '' || incr == null || typeof incr == "undefined") {
        incr = 0;
      } else {
        incr++;
        if (incr > 5) {
          incr = 0;
        }
      }
      
      document.cookie = encodeURI("incr=" + incr);
      console.log("A incr cookie being set to " + incr);
    }

    componentDidMount() {
      this.jQuerycode();
    }
    
    render() {
        console.log("At top of render()...");
        return (
        <div id="screen4Div" className="row bg-white" 
             style={{ padding: '1em 0 0 0' }}>
            <div className="col-10 offset-1">
                <div className="row">
                    <div className="font-weight-bolder my-5 standardText2 topOfHome">
                      <div className="topOfHome2 text-center">
                        <div className="centeredStuff">
  						          <div>
                            <p>Ordering stuff goes here</p>
                        </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
       );
    }
}

export default ScreenOrderContent;
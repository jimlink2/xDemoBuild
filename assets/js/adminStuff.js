import React, { Component } from "react";
//import Greeting from "./greeting";

class AdminStuff extends Component {


    render() {
        const path = window.location.pathname;
        let tempStyle = { paddingTop: 'initial' };
        // if (path === '/login') {
        //     tempStyle = { paddingTop: '50px' };
        // }

        return (
        <div>
            <div className="row innerStripBG" style={tempStyle}>
                <div className="col-12 adminStuff" >
                     <h1 className="h3 mb-3 font-weight-normal">Admin Stuff</h1>
                     <a href="/playerGet">View Players List</a>
                </div>
            </div>
            <div id="playerTable">
            </div>
        </div>
        );
    }

}

export default AdminStuff;

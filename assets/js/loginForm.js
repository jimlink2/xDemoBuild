import React, { Component } from "react";
//import Greeting from "./greeting";


class LoginForm extends Component {


    render() {
        const path = window.location.pathname;
        let tempStyle = { paddingTop: 'initial' };
        // if (path === '/login') {
        //     tempStyle = { paddingTop: '50px' };
        // }

        return (
            <div className="row innerStripBG" style={tempStyle}>
                <div className="col-12 text-center">
                    <div className="row justify-content-center prelative">
                        <img className="homeImage" src="assets/img/Facebook-ad-8.png" />
                        <video id="FrankVideo" className="homeImage" controls>
                            <source type="video/mp4" src="./assets/img/10secondAF-3.mp4" />
                        </video>
                    </div>
                </div>
                <div className="col-12" >
                    <form action="signin" id="signin" className="form-signin" method="POST">
                        <h1 className="h3 mb-3 font-weight-normal">To play, sign in</h1>
                        <label for="user" className="sr-only">Email address</label>
                        <input type="text" name="user" id="user" className="form-control" placeholder="email@hostname.com" required autofocus />
                        <span class="brsmall"></span>
                        <label for="pass" className="sr-only">Password</label>
                        <input type="password" id="pass" name="pass" className="form-control" placeholder="Password" required />

                        <button className="btn btn-lg btn-primary btn-block" type="submit" id='submit' name='submit' >Login</button>

                        <br />
                        <a href='/forgotPass'>Forgot Password</a>

                    </form>

                    <form action="validate" id="ghost" method="POST">

                        <div className="row">
                            <input className="form-control col-2" type="hidden" id='ghost_user' name="user" value="" />
                            <input type="hidden" className="form-control col-2" id='ghost_pass' name="pass" value="" />
                        </div>

                    </form>

                </div>
            </div>

        );
    }

}

export default LoginForm;

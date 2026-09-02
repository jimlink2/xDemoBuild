import React, { Component } from "react";

class ForgotPassForm extends Component {

    render() {
        const path = window.location.pathname;
        let tempStyle = { paddingTop: 'initial' };
        if (path === '/login') {
            tempStyle = { paddingTop: '50px' };
        }
        return (
            <div className="row innerStripBG" style={tempStyle}>
                <div className="col-12">
                    <form action="/passReset" id="resetPass" className="form-signin" method="POST">
                        <h1 className="h3 mb-3 font-weight-normal">Forgot your password?</h1>
                        <label for="user" className="sr-only">Email address</label>
                        <input type="text" name="user" id="user" className="form-control" placeholder="email@hostname.com" required autofocus />
                        <button className="btn btn-lg btn-primary btn-block" type="submit" id='submit' name='submit'>Reset Password</button>
                        Dont have an account? <a href="./signup" className="signup_link" id='signup' name='signup'>Sign Up Here</a>
                        <br />
                        <br />
                        <a href="/login">Nevermind, I remember my password.</a>
                    </form>

                </div>
            </div>
        );
    }
}

export default ForgotPassForm;
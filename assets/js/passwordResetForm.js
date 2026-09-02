import React, { Component } from "react";

class PasswordResetForm extends Component {

    render() {
        return (
            <div className="row innerStripBG" style={{ paddingTop: '50px' }}>
                <div className="col-12 text-center">
                    <form action='/' id='signup' class='form-signin'>
                        <h1 class="h3 mb-3 font-weight-normal">Reset Password</h1>
                        <label for="email" class="sr-only">Email address</label>
                        <input type="text" name="email" id="email" class="form-control" placeholder="Email" required autofocus />
                        <label for="pass" class="sr-only">Password</label>
                        <input type="password" id="pass" name="pass" class="form-control" placeholder="Password" required />
                        <label for="pass2" class="sr-only">Confirm Password</label>
                        <input type="password" id="pass2" name="pass2" class="form-control" placeholder="Confirm Password" required />
                        <button class="btn btn-lg btn-primary btn-block" type="submit" id='submit' name='submit'>Save Password</button>
                    </form>
                    <form action='/newPass' method="POST" id='ghost'>

                        <div class="row">
                            <input class="form-control col-2" type="hidden" id='ghost_email' name="email" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_pass' name="pass" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_hash' name="hash" value="" />
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default PasswordResetForm;
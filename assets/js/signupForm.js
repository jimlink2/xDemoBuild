import React, { Component } from "react";

class SignupForm extends Component {

    render() {
        const path = window.location.pathname;
        let tempStyle = { paddingTop: 'initial' };
        if (path === '/login') {
            tempStyle = { paddingTop: '50px' };
        }
        return (
            <div className="row innerStripBG" style={tempStyle}>
                <div className="col-12 text-center">
                    <div className="row justify-content-center prelative">
                        <img className="homeImage" src="assets/img/circle_3_and_4.png" />
                        <video id="FrankVideo" className="homeImage" controls>
                            <source type="video/mp4" src="./assets/img/10secondAF-3.mp4" />
                        </video>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <form action='/' id='signup' name='signup' class='form-signin'>
                        <h1 class="h3 mb-3 font-weight-bold">Signup</h1>

                        <label for="pronoun" class="sr-only">Mr.____ Ms.____</label>
                        <input type="radio" value="Mr." name="pronoun" required /> Mr.
                        &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="Ms." name="pronoun" required /> Ms.
                        &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="N/A" name="pronoun" required /> N/A

                        <label for="firstName" class="sr-only">First name_____________</label>
                        <input type="text" name="firstName" id="firstName" class="form-control" placeholder="First name___________" required autofocus />
                        <label for="lastName" class="sr-only">Last name____________</label>
                        <input type="text" name="lastName" id="lastName" class="form-control" placeholder="Last name_____________" required />
                        <label for="state" class="sr-only">State, province, country__________</label>
                        <input type="text" name="state" id="state" class="form-control" placeholder="State, province, country__________" required />
                        <label for="postalCode" class="sr-only">Postal Code__________</label>
                        <input type="text" name="postalCode" id="postalCode" class="form-control" placeholder="Postal Code__________" required />
                        <label for="email" class="sr-only">Email address</label>
                        <input type="text" name="email" id="email" class="form-control" placeholder="Email" required />
                        <label for="sponsor_email" class="sr-only">Sponsor Email address</label>
                        <input type="text" name="sponsor_email" id="sponsor_email" class="form-control" placeholder="Sponsor Email" required />
                        <label for="pass" class="sr-only">Password</label>
                        <input type="password" id="pass" name="pass" class="form-control" placeholder="Password" required />
                        <label for="pass2" class="sr-only">Confirm Password</label>
                        <input type="password" id="pass2" name="pass2" class="form-control" placeholder="Confirm Password" required />
                        <button class="btn btn-lg btn-primary btn-block" type="submit" id='submit' name='submit'>Sign Up</button>
                    </form>
                    <form action='/validateSignup' method="POST" id='ghost'>

                        <div class="row">
                            <input class="form-control col-2" type="hidden" id='ghost_email' name="email" value="" />
                            <input class="form-control col-2" type="hidden" id='ghost_sponsor_email' name="sponsor_email" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_pass' name="pass" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_name' name="name" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_state' name="state" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_postalCode' name="postalCode" value="" />
                            <input type="hidden" class="form-control col-2" id='ghost_pronoun' name="pronoun" value="" />
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default SignupForm;
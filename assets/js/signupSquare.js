import React, { Component } from "react";

class SignupSquare extends Component {
    constructor(props) {
        super(props);
        this.height = 'auto';
        this.bgColor = '#fff';
        this.cname = '';
        if (props.cname) {
            this.cname = ' ' + props.cname;
        }
        if (props.bgColor) {
            this.bgColor = props.bgColor;
        }
        if (props.height) {
            this.height = props.height;
        }
    }

    render() {
        return (
            <div className="row text-white">
                <div class={"col-12 py-5 text-center bg-primary boxBG" + this.cname}>
                    Sign Up, Sign In, Play Free!
                    <br />
                    <a href="/play" className="btn btn-danger playNowBtn my-3">Play Now</a>
                    <br />
                    You could win<br /><h3>$250.00</h3>
                </div>
            </div>
        );
    }
}

export default SignupSquare;
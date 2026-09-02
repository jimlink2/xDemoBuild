import React, { Component } from "react";

class Copyrite extends Component {

    render() {
        return (
            <div className="row" id="copyright">
                <hr style={{ borderTop: '1px solid rgb(255 255 255 / 37%)', width: '100%', margin: '3em 0' }} />
                <div class="col-12 text-center">
                    {/*<span>&copy; 2022.COLORBALL. All Rights Reserved</span>*/}
                    <span>Copyright 2025: The HomeBingo Network, Inc. --- 1150 Bower Hill Road, 7th Floor --- Pittsburgh, PA 15243 --- Phone: 412-303-0743</span>
                </div>
            </div>
        );
    }
}

export default Copyrite;
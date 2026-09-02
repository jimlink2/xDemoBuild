'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';

import Footer from './footer.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <div className="row">
                    <div className="col-12 text-center" style={{ padding: '4em 0', background: 'white' }}>
                        <h1>A verification email has been sent to the address provided.<br />If you don't see it in your inbox, please check your spam folder.</h1>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
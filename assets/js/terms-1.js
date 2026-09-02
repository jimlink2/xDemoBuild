'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import AboutHeader from './aboutHeader.js';
import TermsStrip from './termsStrip.js';
import Footer from './footer.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <AboutHeader />
                <TermsStrip />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
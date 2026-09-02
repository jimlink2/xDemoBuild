'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import PPTForm from './PPTForm.js';
import Footer from './footer.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <Header />
                <PPTForm />
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);

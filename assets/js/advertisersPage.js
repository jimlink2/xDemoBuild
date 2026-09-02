'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import AdvertisersContent from './advertisersContent.js';

function App() {
    return (
        <div className="row">
            <div className="col-12" style={{height:'100%vh'}}>
                <MenuBar />
                <Header />
                <AdvertisersContent />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
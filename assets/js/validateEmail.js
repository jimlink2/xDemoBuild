'use strict';
import MenuBar from './menuBar.js';
import Footer from './footer.js';

function App() {
    const pathParts = window.location.pathname.split('/');
    console.log(pathParts);
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#004283', height: '100%vh' }}>
                <MenuBar />
                <div className="row">
                    <div className="col-12">
                        <form method="POST" action="/emailPassthrough" id="accountValidationForm" className="hidden">
                            <input type="text" className="form-control" name="oid" value={pathParts[2]} />
                            <input type="text" className="form-control" name="hash" value={pathParts[3]} />
                            <input type="submit" value="Submit" />
                        </form>
                        Please wait while we validate your email.
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);

setTimeout(() => {
    document.getElementById('accountValidationForm').submit();
}, 500);
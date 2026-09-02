'use strict';
import Header from './header.js';
import MenuBar from './menuBar.js';
import Footer from './footer.js';
import AdsTxt from './adsTxt.js';
import ColorBallTxt from './colorballTxt.js';
import MethodTxt from './methodTxt.js';
import React from "react";
import ReactDOM from 'react-dom';


function App() {
    return (
        <div className="row">
            <div className="col-12" style={{ background: '#FFFFFF', height: '100%vh' }}>
            <MenuBar />
            <Header />
                <div className="row text-center">
                    <div className="col-12 text-center">
                        <img className="homeImage" src="./assets/img/circle_3_and_4.png" />
                        <img className="homeImage" src="./assets/img/icons/Legality scrabble.jpg" alt="Legality" title="Legality" id="Legality_img" />
                        <video id="FrankVideo" className="homeImage" controls>
                           <source type="video/mp4" src="./assets/img/10secondAF-3.mp4" />
                        </video>
                    </div>
                </div>
                <div className="row bg-white text-center">
                    <div className="col-12" style={{ background: '#FFFFFF', height: '100%vh' }}>
                        <div className="row bg-white text-center" style={{ padding: '3em 0' }}>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-10 offset-1">
                                        <h1><font size="+5"><center><b> The Legality of</b> </center></font></h1>
                                        <br />
                                        <h1><font size="+5"><center><b> <ColorBallTxt /> Pick-3 and Pick-4 Games</b> </center></font></h1>
                                        <br />
                                        <h2 class="red3"><font size="+3"><b><center>NEWS FLASH</center></b></font></h2>
                                        <br />
                                        <h2><font size="+3"><b><center>The Attorney General of Pennsylvania has admitted in court, as a matter of law, that: 
                                        <br />
                                        the <ColorBallTxt /> <MethodTxt /> of advertising and marketing "...
                                        <br />
                                        is not a lottery,... and is not a method of gambling".</center></b></font></h2>
                                        <br />
                                        <h2><font size="+3"><b><center>Introduction</center></b></font></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text1">
                                        <b><font size="+2">This memorandum of law addresses the legality of operating and playing <ColorBallTxt /> Pick-3 &amp; Pick-4 number guessing games in all the states and territories of the U.S.A., the provinces of Canada and in England.  This memo of law also applies to the legality of advertising and marketing on the colorball-ads.com website.</ font></b></div>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text2"><b>
                                        <font size="+2">The author of this memorandum of law is a retired attorney with extensive experience in gambling law, legal research, appellate court brief preparation, patent law, patent applications, and professional engineering.  He holds several patents on random number generation.  His patent application is pending on the <MethodTxt /> of advertising and marketing described on the About page of this Website and on the ball-mixing chamber displayed on the Home page of this Website.</font>
                                        </b></div>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text3"><b>
                                        <font size="+2">After carefully reading, studying, and analyzing the statutory law and judicial opinions of every state, territory, and province of the United States of America and Canada and England, the undersigned has come to the following conclusion and hereby submits the following expert legal opinion:</font></b>
                                        </div>
                                        <h2><b><center>Conclusion</center></b></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text4"><b>
                                        <font size="+2">Based upon said search, investigation and study, and the undersigned's extensive legal experience, the undersigned assures and guarantees all registrants, players, ad-viewers, advertisers, sponsors and contractors that the operation, promotion, development or play of games of chance such as <ColorBallTxt /> Pick-3 &amp; Pick-4, wherein play is free and no purchase is necessary, and winners receive big cash prizes, as described on the colorball-ads.com website, complies fully with all the laws of North America and England.  <ColorBallTxt /> Pick-3 &amp; Pick-4 number guessing games and the policy of the <ColorBallTxt /> Website comply completely with all of said laws and regulations.  Said games would not constitute unlawful gambling unless the players were required to risk something of value to the promoter, such as money, as a condition of playing.
                                        </font></b></div>
                                        <h2><b><center>The Statutes</center></b></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text5"><b>
                                        <font size="+2">All of the statutes of all of the states of the U.S.A. and Canada and England provide:</font>
                                        </b></div>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text6"><font size="+2"><div/><i>
                                        Unless a player of a game of chance is required to risk something of value as a condition for playing, neither the player nor the operator of the game is committing illegal conduct.
                                        </i></font>
                                        </div>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text7"><b>
                                        <font size="+2">A detailed, comprehensive alphabetical list of the applicable laws of all states and provinces of the U.S.A., Canada and England can be viewed at:  <a href="/Gambling%20law%20compilation-USA-CANADA-ENGLAND-OTHERS.pdf" target="_blank">Compilation of gambling laws</a>
                                        <br />
                                        </font>
                                        </b></div>
                                        <h2><font size="+3"><b><center>Additional Assurance</center></b></font></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text8"><b>
                                        <font size="+2">In the event that some government official requests that play of <ColorBallTxt /> Pick-3 &amp; Pick-4 games be discontinued in a specific territory, <ColorBallTxt />-<AdsTxt /> will remove its kiosks from said territory, and commence litigation to obtain judicial approval. This type of pro-active, geo-fencing, constitutes the ultimate assurance that the <ColorBallTxt />-<AdsTxt /> Website and <ColorBallTxt /> Pick-3 & Pick-4 games will fully comply with all laws, everywhere, and at all times in the future.</font>
                                        </b></div>
                                        <h2><font size="+3"><b><center>Public Opinion</center></b></font></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text9"><b>
                                        <font size="+2">Public opinion can affect the thinking and actions of government officials.  <ColorBallTxt /> Pick-3 &amp; Pick-4 games will please the public because they will:</font>
                                        </b></div>
                                        <ol className="col-12 text-left font-weight-bolder my-5 standardText"><b>
                                        <li>
                                        Help solve the problems of gambling addiction;
                                        </li>
                                        <li>Combat the predatory practices of gambling promoters who take advantage of the poor;
                                        </li>
                                        <li>Reduce the unfair &quot;selective tax upon habituated gamblers&quot; that government-sponsored lotteries have become;
                                        </li>
                                        <li>Enable people of all income levels to enjoy the thrill of gambling without wasting money;
                                        </li>
                                        <li>Enhance the good reputation of its advertisers, who are supplying the prize money.
                                        </li>
                                        </b></ol>
                                        <h2><font size="+3"><b><center>Certificate of Compliance</center></b></font></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text10"><b>
                                        <font size="+2">The undersigned hereby certifies that playing or participating in the play or operation of <ColorBallTxt /> Pick-3 &amp; Pick-4 games, or advertising on the colorball-ads.com website will, at all times, currently and in the future, comply with all the laws of all the states, territories and provinces of North America and England.</font>
                                        </b></div>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text11"><b>
                                        Respectfully submitted,
                                        </b></div>

                                        {/*<div className="col-12 text-left">
                                        <img src="./assets/img/AFrank.jpg" alt="Signature" title="Signature" width="200px" />
                                        </div>*/}

                                        <br />
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text12"><b>
                                        /s/ Alan Frank, J.D., P.E.
                                        </b>
                                        </div>
                                        <h2><font size="+3"><b><center>Contact</center></b></font></h2>
                                        <div className="col-12 text-left font-weight-bolder my-5 standardText" id="text13"><b>For more information, contact: <a href="mailto:colorball923@gmail.com">support@colorballnumbers.com</a></b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<App />, domContainer);
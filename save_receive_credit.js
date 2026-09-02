    function receiveCredit() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log('received response');
                let data = JSON.parse(httpRequest.responseText);
                if (data.msg === 'too many bets') {
                    //TODO: print proper message
                    alert("You can sign in only once every 24 hours.\nPlease try again tomorrow.");
                    // return;
                } else {
                    document.getElementById('credit').innerHTML = `$${data.credit}`;
                    credit_amount = parseInt(data.credit, 10);
                    // TODO: check to make sure a duplicate is not being entered - give feedback to user if true
                    // currSelectedNumbers.push(numText);
                    // let selNums = currSelectedNumbers.reduce((acc, cur) => {
                    //     return `${acc}<div class="col-5">${cur}</div>`;
                    // }, '');
                    // document.getElementById('selected-number').innerHTML = `<div class="row">${selNums}</div>`;
                    if (selectedQueue.length() < 10) {
                        selectedQueue.enqueue(numText);
                        let queueLen = selectedQueue.length();
                        for(let i = 1; i <= queueLen; i++) {
                            document.getElementById('selection_row_text_'+i).innerHTML = selectedQueue.elements[queueLen - (i-1) - 1];
                            document.getElementById('selection_row_text_'+i).style.opacity = 1;
                        }
                    }
                    document.getElementById('numpad-selection').innerHTML = '';
                    numpadSelectedArr = [];
                }
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }

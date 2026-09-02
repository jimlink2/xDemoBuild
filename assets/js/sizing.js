function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function reportWindowSize() {
    // let showSpecialView = getCookie('showSpecialView');
    // if (showSpecialView == 1) {
    //     return;
    // }
    let headerBar = document.getElementById("headerBar");
    if (headerBar) {
    document.querySelector('body').style.marginTop = headerBar.offsetHeight + "px";
    }
}

var callback = function () {
    // Handler when the DOM is fully loaded
    window.onresize = reportWindowSize;
    reportWindowSize();
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}
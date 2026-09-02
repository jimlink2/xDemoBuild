const CookieHelper = (function () { 

  // -----------------------------
  // Set a cookie (safe for WebView)
  // -----------------------------
  function setCookie(name, value, days = 365, path = "/") {
    const encoded = encodeURIComponent(value);

    let expires = "";
    if (days) {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + d.toUTCString();
    }

    // IMPORTANT: No Secure, No SameSite=None (breaks file://)
    document.cookie =
      name + "=" + encoded +
      expires +
      "; path=" + path;
  }

  // -----------------------------
  // Get a cookie (auto-decodes)
  // -----------------------------
  function getCookie(name) {
    const prefix = name + "=";
    const cookies = document.cookie.split(";");

    for (let c of cookies) {
      c = c.trim();
      if (c.startsWith(prefix)) {
        return decodeURIComponent(c.substring(prefix.length));
      }
    }
    return "";
  }

  // -----------------------------
  // Delete a cookie
  // -----------------------------
  function deleteCookie(name, path = "/") {
    // Set expiration in the past
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path;
  }

  return {
    set: setCookie,
    get: getCookie,
    delete: deleteCookie
  };

})();


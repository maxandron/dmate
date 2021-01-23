var s = document.createElement('script');
s.src = "https://www.google.com/recaptcha/api.js?render=" + RECAPTCHA_KEY;
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
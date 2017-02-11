function setHash(newHash, suppressHashChange) {
    if (newHash && newHash.charAt(0) != "#") {
        newHash = "#" + newHash;
    }
    if (suppressHashChange && window.history.replaceState) {
        var newUrl = window.location.hash ? window.location.href.replace(window.location.hash, newHash || "") : window.location.href + newHash || "";
        window.history.replaceState( {} , document.title, newUrl);
    } else {
        location.hash = newHash || "_"; //fallback
    }
};

module.exports = setHash;

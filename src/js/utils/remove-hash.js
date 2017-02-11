var setHash = require("./set-hash");

function removeHash(suppressHashChange) {
    setHash(null, suppressHashChange);
};

module.exports = removeHash;

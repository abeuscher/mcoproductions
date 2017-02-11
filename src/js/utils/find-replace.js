function findReplace(inputStr, search, newval) {
    //53% slower than regex approach, but regex caused problems in IE
    return inputStr.split(search).join(newval);
}

module.exports = findReplace;

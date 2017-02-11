function parseHTML(str) {
    var tmp = document.implementation.createHTMLDocument("Document");
    tmp.body.innerHTML = str;
    return tmp.body.children.length == 1 ? tmp.body.children[0] : tmp.body.children;
}

module.exports = parseHTML;

var getDefaults = require("lodash/defaults");
var forEach = require("lodash/forEach");

var HostsApp = function(data) {
    var self = this;
    self.opts = {
        "div": document.getElementById("hostsApp"),
        "templates": {
            "thumbs": require("./inc/hosts-thumb.pug"),
            "profile": require("./inc/hosts-profile.pug")
        }
    };
    this.blocks = document.createElement("div");
    this.blocks.innerHTML = this.opts.templates.thumbs(data.hosts);
    this.opts.div.appendChild(this.blocks);
    this.activateBG("data-bg");
    this.activateModals("data-info");
}
HostsApp.prototype.activateBG = function(attrName) {
    var self = this;
    forEach(document.querySelectorAll("[" + attrName + "]"), function(el) {
        el.setAttribute("style", "background:url('" + el.getAttribute(attrName) + "') no-repeat center top; background-size:cover;");
    });
}
HostsApp.prototype.activateModals = function(attrName) {
    var self = this,
        modals = [];
    forEach(document.querySelectorAll("[" + attrName + "]"), function(el) {
        /*
        modals.push(new Modal({
            "template": self.opts.templates.profile,
            "data": JSON.parse(el.getAttribute("data-info")),
            "links": el
        }));
        */
    });
}

module.exports = HostsApp;

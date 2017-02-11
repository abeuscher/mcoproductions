var ee = require("event-emitter");
var getDefaults = require("lodash/defaults");
var forEach = require("lodash/forEach");



var default_opts = {
    "container": document.body,
    "classes": {
        "container": "modal-open",
        "modal": "modal",
        "modalWrapper": "modal-overlay",
        "closeButton": "btn-close"
    },
    "containerClass": "modal-open",
    "modalWrapperClass": "modal-overlay",
    "modalClass": "modal"
}


var Modal = function(opts) {
    this.opts = getDefaults(opts, default_opts);
    this.opts.id = require("./utils/generate-hash.js")();
    this.ee = ee({});
    this.state = "closed";
    this.activateLinks();
};
Modal.prototype.open = function(callBack) {
    this.lastFocus = document.activeElement;
    this.toggleContainerClass();
    if (!this.wrapper) {
        this.wrapper = document.createElement("div");
        this.wrapper.innerHTML = this.opts.template(this.opts.data);
        this.wrapper.classList.add(this.opts.classes.modalWrapper);
    }
    this.opts.container.appendChild(this.wrapper);
    this.wrapper.setAttribute('aria-hidden', 'false');
    this.wrapper.setAttribute('tabindex', '0');
    this.wrapper.focus();
    this.addCloseListeners();
    if (callBack) {
        callBack()
    }
    this.state = "open";
    this.ee.emit("open");
};
Modal.prototype.addCloseListeners = function() {
    var self = this;
    var listener;
    forEach(document.querySelectorAll("." + this.opts.classes.closeButton), function(el) {
        el.removeEventListener("click", listener);

        el.addEventListener("click", listener = function(event) {
            self.close(event);
        });
    });
    self.opts.container.addEventListener("keydown", function(event) {
        self.close(event);
    });
    self.wrapper.addEventListener('click', function(e) {
        if (e.target == self.wrapper) {
            self.close(e);
        }
    }, false);
}
Modal.prototype.close = function(event) {
    var self = this;
    if (self.state == "open" && (!event.keyCode || event.keyCode === 27)) {

        this.wrapper.setAttribute('aria-hidden', 'true');
        this.wrapper.setAttribute('tabindex', '-1');
        this.lastFocus.focus();
        this.opts.container.removeChild(this.wrapper);
        this.toggleContainerClass(true);
        self.state = "closed";
        self.ee.emit("close");
    }
};
Modal.prototype.toggleContainerClass = function(toggle) {
    if (!toggle && !this.opts.container.classList.contains(this.opts.classes.container)) {
        this.opts.container.classList.add(this.opts.classes.container);
    } else if (toggle && this.opts.container.classList.contains(this.opts.classes.container)) {
        this.opts.container.classList.remove(this.opts.classes.container);
    }
};
Modal.prototype.activateLinks = function() {
    var self = this;
    if (typeof this.opts.links === "Array") {
        forEach(this.opts.links, function(linkEl) {
            var linkCB;
            linkEl.removeEventListener("click", linkCB);
            linkEl.addEventListener("click", linkCB = function() {
                self.open();
            });
            linkEl.setAttribute("data-modal-id", self.opts.id);
        });
    } else {
        var linkCB;
        this.opts.links.removeEventListener("click", linkCB);
        this.opts.links.addEventListener("click", linkCB = function() {
            self.open();
        });
        this.opts.links.setAttribute("data-modal-id", self.opts.id);
    }
};
module.exports = Modal;

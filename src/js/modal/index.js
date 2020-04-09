var getDefaults = require("lodash/defaults");
var forEach = require("lodash/forEach");

var newID = require("./utils/generate-hash.js")();

var default_opts = {
  "id" : newID,
  "container" : document.body,
  "classes" : {
    "container" : "modal-open",
    "modal" : "modal",
    "modalWrapper" : "modal-overlay",
    "closeButton" : "btn-close"
  },
  "containerClass" : "modal-open",
  "modalWrapperClass" : "modal-overlay",
  "modalClass" : "modal",
  "template" : require("./inc/sample-modal.pug"),
  "data" : require("./sample-data.json"),
  "links" : document.querySelectorAll("[data-opens-modal='"+newID+"']")
}


var Modal = function(opts) {
    this.opts = getDefaults(opts,default_opts);
    this.state = "closed";
    this.isFunc = isFunction(this.opts.template);
    this.activateLinks();

    function isFunction(functionToCheck) {
     var getType = {};
     return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
};
Modal.prototype.open = function(callBack) {
  this.state = "open";
  this.lastFocus = document.activeElement;
  this.toggleContainerClass();
  if (this.isFunc) {
    if (!this.wrapper) {
      this.wrapper = document.createElement("div");
      this.wrapper.innerHTML = this.opts.template(this.opts.data);
      this.wrapper.classList.add(this.opts.classes.modalWrapper);
    }
    this.opts.container.appendChild(this.wrapper);
  }
  else {
    this.wrapper = this.opts.template;
  }
  this.wrapper.setAttribute('aria-hidden', 'false');
  this.wrapper.setAttribute('tabindex', '0');
  this.wrapper.focus();
  this.addCloseListeners();
  if (callBack) { callBack() }
};
Modal.prototype.addCloseListeners = function() {
  var self = this;
  var listener;
  forEach(document.querySelectorAll("."+this.opts.classes.closeButton), function(el) {
    el.removeEventListener("click", listener);
    el.addEventListener("click", listener = function(event) {
      self.close(event);
    });
  });
  self.wrapper.addEventListener('click', function( e ) {
    if (e.target == self.wrapper) {
       self.close( e );
     }
  }, false);
}
Modal.prototype.close = function(event) {
  var self = this;
  if (self.state == "open" && ( !event.keyCode || event.keyCode === 27 ) ) {
    self.state = "closed";

    this.wrapper.setAttribute('aria-hidden', 'true');
    this.wrapper.setAttribute('tabindex', '-1');
    this.lastFocus.focus();
    if (this.isFunc) {
        this.opts.container.removeChild(this.wrapper);
    }
    this.toggleContainerClass(true);
  }
};
Modal.prototype.toggleContainerClass = function(toggle) {
  if (!toggle && !this.opts.container.classList.contains(this.opts.classes.container)) {
    this.opts.container.classList.add(this.opts.classes.container);
  }
  else if(toggle && this.opts.container.classList.contains(this.opts.classes.container)) {
    this.opts.container.classList.remove(this.opts.classes.container);
  }
};
Modal.prototype.activateLinks = function() {
  var self = this;
  if (typeof this.opts.links === "Array") {
    forEach(this.opts.links, function(linkEl) {
      var linkCB;
      linkEl.removeEventListener("click",linkCB);
      linkEl.addEventListener("click",linkCB = function() {
        self.open();
      });
    });
  }
  else {
    var linkCB;
    this.opts.links.removeEventListener("click",linkCB);
    this.opts.links.addEventListener("click",linkCB = function() {
      self.open();
    });
  }
};
module.exports = Modal;

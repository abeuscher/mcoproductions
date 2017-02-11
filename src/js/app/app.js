var forEach = require("lodash/forEach");

var Modal = require("modal/index.js");
var HostsApp = require("../hosts-app/index.js");
var TriviaWidget = require("./modules/trivia-widget.js");

require("dom4");

window.addEventListener("load", function() {
    var widgets = [{
            "el": document.querySelectorAll(".cta")[0],
            "ifExists": function(el) {
                var bookingModal = document.getElementById("bookingModal");
                var bookingFunc = function() {
                    var div = document.createElement("div");
                    div.append(bookingModal);
                    return div.innerHTML;
                }
                var bookingForm = new Modal({
                    "template": bookingFunc,
                    "data": {},
                    "links": el
                });
                //console.log("cta is here")
            }
        }, {
            "el": document.getElementById("triviaWidget"),
            "ifExists": function(el) {
                el.innerHTML = require("./inc/trivia-widget.pug")();
            },
            "onData": function(el, data) {
                var widget = new TriviaWidget({
                    "el": document.getElementById("searchBox"),
                    "templates": {
                        "searchResults": require("./inc/search-results.pug"),
                        "triviaTonight": require("./inc/trivia-tonight.pug")
                    },
                    "data": data
                });
                var searchBtn = document.getElementById("searchToggle");
                searchBtn.addEventListener("click", function() {
                    var searchMenu = document.getElementById("searchBox");
                    searchMenu.classList.toggle("active");
                });
            }
        }, {
            "el": document.getElementById("triviaWidget"),
            "ifExists": function(el) {
                var widgetHTML = require("./inc/trivia-widget.pug");
                el.innerHTML = widgetHTML();
            }
        }, {
            "el": document.querySelectorAll(".hb-button")[0],
            "ifExists": function(el) {
                el.addEventListener("click", function() {
                    var dropDown = document.querySelectorAll(".drop")[0];
                    var hamBurger = document.querySelectorAll(".hamburger")[0];
                    dropDown.classList.toggle("active");
                    hamBurger.classList.toggle("active");
                });
            }
        },
        {
            "el": document.getElementById("hostsApp"),
            "onData": function(el, data) {
                var hostsApp = new HostsApp(data);
            }
        }
    ];

    function procWidg(widgets, thisEvent, data) {
        forEach(widgets, function(val) {
            if (val.el && val[thisEvent]) {
                val[thisEvent](val.el, data);
            }

        });
    }
    procWidg(widgets, "ifExists");
    var getter = fetch("./data.json")
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        procWidg(widgets, "onData", data);
      });
});

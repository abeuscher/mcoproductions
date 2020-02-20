var groupBy = require("lodash/groupBy");
var keys = require("lodash/keys");
var forEach = require("lodash/forEach");
var find = require("lodash/find");

var getDay = require("../utils/get-day.js");
var convertMilitaryTime = require("../utils/convert-military-time.js");
var resetSelect = require("../utils/reset-select.js");

var TriviaWidget = function (opts) {
  var self = this;
  self.opts = opts;
  self.today = new getDay();
  forEach(this.opts.data.games, function(game, index) {
    self.opts.data.games[index].venue = find(self.opts.data.venues,{"_id":game.venue._id});
    console.log(self.opts.data.games[index].venue,game,index);
    if (!self.opts.data.games[index].venue.maplink) {
      var venue = self.opts.data.games[index].venue;
      var url = "https://www.google.com/maps/dir/''/" + (venue.name + " " + venue.address + ",+" + venue.City + "," + venue.State).split(" ").join("+") +"?z=20";
      self.opts.data.games[index].venue.maplink = url;
    }
    self.opts.data.games[index].time = convertMilitaryTime(game.time);
  });
  this.menu = {
    day : this.writeMenu({"type":"day","label":"By Day"}),
    host : this.writeMenu({"type":["host","display"],"label":"By Host"}),
    state : this.writeMenu({"type":["venue","City"],"label":"By Town"})
  };
  document.getElementById("searchForm").appendChild(this.menu.day.el);
  document.getElementById("searchForm").appendChild(this.menu.host.el);
  document.getElementById("searchForm").appendChild(this.menu.state.el);
  this.writeTriviaTonight();
}
TriviaWidget.prototype.sortList = function(param) {
  var self = this, sortFunc;
  if (typeof param === 'object') {
    sortFunc = function(z) {return z[param[0]][param[1]]};
  }
  else {
    sortFunc = function(z) {return z[param];}
  }
  var lastKey;
  var data = groupBy(self.opts.data.games,sortFunc);
  data = param=="day" ? data : sortAlpha(data);
  function sortAlpha(theData) {
    var theKeys = keys(theData).sort();
    var output = {};
    for (k in theKeys) {
      for (x in theData) {
        if (theKeys[k]==x) {
          if (param[1]=="City") {
            output[x + ", " + theData[x][0].venue.State] = theData[x];
          }
          else {
            output[x] = theData[x];
          }
        }
      }
    }
    return output;
  }
  var newObj = {};
  if (param=="day") {
    forEach(this.today.days, function(day) {
      if (data[day]) {
        newObj[day] = data[day];
      }
    });
    data = newObj;
  }
  return data;
}

TriviaWidget.prototype.writeMenu = function(opts) {
  var self = this;
  var thisMenu = {};
  thisMenu.data = this.sortList(opts.type);
  thisMenu.el = document.createElement("select");
  thisMenu.el.innerHTML = opts.label;
  var defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected",true);
  defaultOption.setAttribute("value","");
  defaultOption.innerHTML = opts.label;
  thisMenu.el.appendChild(defaultOption);
  forEach(thisMenu.data, function(games, key) {
    var optionEl = document.createElement("option");
    optionEl.value=JSON.stringify(games);
    optionEl.innerHTML = key;
    thisMenu.el.appendChild(optionEl);
  });
  thisMenu.el.addEventListener("change", function() {
    this.classList.toggle("active");
    var daysGames = JSON.parse(thisMenu.el.options[thisMenu.el.selectedIndex].value);
    daysGames.day = thisMenu.el.options[thisMenu.el.selectedIndex].innerHTML;
    document.getElementById("searchResults").classList.add("populated");
    document.getElementById("searchResults").innerHTML = self.opts.templates.searchResults(daysGames);
    resetSelect(this);
  });
  return thisMenu;
};
TriviaWidget.prototype.writeTriviaTonight = function() {
  var self = this;
  var byDay = groupBy(self.opts.data.games,function(z) {return z["day"];});
  var today = self.opts.templates.triviaTonight(byDay[self.today.value]);
  if (today) {
    document.getElementById("triviaTonight").classList.add("populated");
    document.getElementById("triviaTonight").innerHTML = self.opts.templates.triviaTonight(byDay[self.today.value]);
  }
};
TriviaWidget.prototype.reset = function() {
  resetSelect(true);
  document.getElementById("searchResults").innerHTML="";
  document.getElementById("searchResults").classList.remove("populated");
}

module.exports = TriviaWidget;

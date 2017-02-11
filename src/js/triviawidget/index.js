require("google-maps");
var utils = require('../utils/index.js');
var gMap = require('../mapmaker/index.js');


var TriviaWidget = function(data, opts) {
    this.s = opts;
    this.data = data;
    this.init();
};
TriviaWidget.prototype.init = function() {
    this.makeTriviaTonight();
    this.fillSearchDrops();
};
TriviaWidget.prototype.fillSearchDrops = function() {
    var drops = {
        day: $("select#search-day"),
        town: $("select#search-town"),
        state: $("select#search-state")
    };
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var latlng = {};
    var geocoder = new google.maps.Geocoder();
    for (i in days) {
        drops.day.append($("<option/>", {
            html: days[i],
            value: days[i]
        }));
    }

    for (i in this.data) {
        var game = this.data[i];
        latlng[i] = game.venue.address;
    }
//getAddress(geocoder, latlng);
    function getAddress(geocoder, latlng) {
        geocoder.geocode({
            'location': latlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log(results);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
};
TriviaWidget.prototype.makeTriviaTonight = function() {
    this.slides = [];

    for (i in this.data) {

        var game = this.data[i];
        console.log(game);
        game.key = i;
        game.time = getFormattedTime(game.time);

        if (game.day.toLowerCase() == day_name().toLowerCase()) {
            this.slides[i] = utils.HTMLMixin(require("./inc/slide.html"), game);
            this.s.bucket.find(".slider-trivia-tonight").first().append(this.slides[i]);
        }

        function getFormattedTime(fourDigitTime) {
            var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
            var hours = ((hours24 + 11) % 12) + 1;
            var amPm = hours24 > 11 ? 'pm' : 'am';
            var minutes = fourDigitTime.substring(2);

            return hours + minutes + amPm;
        }

        function day_name() {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var now = new Date();
            return days[now.getDay()];
        }

    }
};
module.exports = TriviaWidget;

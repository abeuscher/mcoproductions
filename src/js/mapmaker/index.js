require("google-maps");

var gMap = function(lat, lng, bucket) {

    this.loc = {
        lat: lat,
        lng: lng
    };

    this.bucket = bucket;
    this.init();
}
gMap.prototype.init = function() {
    var self = this;

    var mapOptions = {
        zoom: 19,
        center: this.loc,
        disableDefaultUI: true,
        gestureHandling: 'none'
    };
    map = new google.maps.Map(this.bucket,mapOptions);
    var marker = new google.maps.Marker({
      position: this.loc,
      draggable:false,
      animation: google.maps.Animation.DROP,
      map: map
    });
    marker.addListener("click", function() {
      location.href="https://www.google.com/maps/dir//"+self.loc.lat+","+self.loc.lng+"/@"+self.loc.lat+","+self.loc.lng+",21z"
    });
};



module.exports = gMap;

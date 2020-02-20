function ConvertMilitaryTime (milTime) {
  var pieces = milTime.split(':');

  var hours = Number(pieces[0]);
  var minutes = Number(pieces[1]);

  var timeValue = "" + ((hours >12) ? hours - 12 : hours);
  if (parseInt(minutes)) {
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
  }
  timeValue += (hours >= 12) ? "p" : "a";

  return timeValue;
}
module.exports = ConvertMilitaryTime;

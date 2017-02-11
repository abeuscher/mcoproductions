function getDay(inDate) {
  this.startDate = inDate || new Date();
  this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  this.value = this.days[this.startDate.getDay()];
}
module.exports = getDay;

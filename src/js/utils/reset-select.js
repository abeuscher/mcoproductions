var forEach = require("lodash/forEach");
function resetSelect(selectEl) {
    var theSelects = document.querySelectorAll("select");
    forEach(theSelects, function(thisSelect) {
      if (thisSelect != selectEl) {
        thisSelect.selectedIndex = 0;
        thisSelect.classList.remove("active");
      }
    });
}
module.exports = resetSelect;

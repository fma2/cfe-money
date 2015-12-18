function listSchools(arr) {
  var schoolslist = ""
  for (i=0; i<arr.length; i++) {
    schoolslist += "<span class='school-list-item'>"+arr[i]+"</span>"
  }
  return schoolslist;
}
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
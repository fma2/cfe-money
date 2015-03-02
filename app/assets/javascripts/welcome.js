$( document ).ready(function() {
  $("body").hide(0).delay(100).fadeIn(2200);

  //AJAX call for dynamic text background data
  $.ajax({
    dataType: 'json',
    url: '/random',
    type: 'GET'
  }).success(function(data) {
    createDynamicTextBackground(data)
  }).fail(function() {
    console.log("Failed to load background text")
  });
})


// function createDynamicTextBackground(data) {
//   var txt = [];
//   for (k in data) {
//     txt.push(data[k].school);
//     txt.push(data[k].total_enrollment);
//     txt.push("$" + data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"))
//   }
//   var txt_now = '';
//   for (var i = 0; i < txt.length; i++) {
//     txt_now += txt[i] + ' ';
//   }
//   var txt_rep = '', l = 0;
//   while(l < 100) {
//     txt_rep += txt_now;
//     l++;
//   }
//   var title = document.getElementById('background')    
//   var attribute = document.createAttribute("data-bg");
//   attribute.value = txt_rep;
//   title.setAttributeNode(attribute);
// }
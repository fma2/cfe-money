$( document ).ready(function() {


  $("body").hide(0).delay(100).fadeIn(2200);

  $('.read-more').click(function(e) {
    $(this).hide();
  });

  $("#results-section .school-section").css("display", "none");

  $('.loc-tabs li:nth-child(1)').addClass('active'); // selects RoS tab when page loads
  $('.tab-content .tab-pane:nth-child(1)').addClass('in');
  $('.tab-content .tab-pane:nth-child(1)').addClass('active');

  $('#search_text2, #search_text1').on("click", function( e ) {
    $("body, html").animate({ 
      scrollTop: $('.loc-tabs').offset().top 
    }, 600);
  })

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

  //AJAX call for district section information
  // $.ajax({
  //   dataType: 'json',
  //   url: '/school_districts',
  //   type: 'GET'
  // }).success(function(data) {
  //   var schoolDistrictButtons = $('#school-district-buttons');
  //   var schoolDistrictInfo =  $('#school-district-info');
  //   createDistrictButtons(data, schoolDistrictButtons);
  //   createSchoolDistrictInformation(data, schoolDistrictInfo)
  // }).fail(function() {
  //   console.log("Failed to load school district information");
  // }); 

  // AJAX call for assembly section information
  // $.ajax({
  //   dataType: 'json',
  //   url: '/electoral_districts',
  //   type: 'GET'
  // }).success(function(data) {
  //   var electoralDistrictButtons = $("#electoral-district-buttons");
  //   var electoralDistrictInfo = $("#electoral-district-info");
  //   createElectoralDistrictButtons(data, electoralDistrictButtons);
  //   createElectoralDistrictInformation(data,electoralDistrictInfo);
  // }).fail(function() {
  //   console.log("Failed to load electoral district information");
  // }); 

})

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

function createDynamicTextBackground(data) {
  var txt = [];
  for (k in data) {
    txt.push(data[k].school);
    txt.push(data[k].total_enrollment);
    txt.push("$" + data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"))
  }
  var txt_now = '';
  for (var i = 0; i < txt.length; i++) {
    txt_now += txt[i] + ' ';
  }
  var txt_rep = '', l = 0;
  while(l < 100) {
    txt_rep += txt_now;
    l++;
  }
  var title = document.getElementById('background')    
  var attribute = document.createAttribute("data-bg");
  attribute.value = txt_rep;
  title.setAttributeNode(attribute);
}

function twitterLink() {
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
}
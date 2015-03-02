$( document ).ready(function() {
  // $("body").hide(0).delay(100).fadeIn(2200);

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
  //   url: '/districts',
  //   type: 'GET'
  // }).success(function(data) {
  //   var schoolDistrictButtons = $('#school-district-buttons');
  //   var schoolDistrictInfo =  $('#school-district-info');
  //   createDistrictButtons(data, schoolDistrictButtons);
  //   createDistrictInformation(data, schoolDistrictInfo)
  // }).fail(function() {
  //   console.log("Failed to load school district information");
  // }); 

  $('.read-more').click(function(e) {
    $(this).hide();
  });

  //AJAX call for assembly section information
  // $.ajax({
  //   dataType: 'json',
  //   url: '/electoral',
  //   type: 'GET'
  // }).success(function(data) {
  //   var electoralDistrictButtons = $("#electoral-district-buttons");
  //   var electoralDistrictInfo = $("#electoral-district-info");
  //   createDistrictButtons(data, electoralDistrictButtons);
  //   createDistrictInformation(data,electoralDistrictInfo);
  // }).fail(function() {
  //   console.log("Failed to load electoral district information");
  // }); 

  $('.read-more').click(function(e) {
    $(this).hide();
  });
});

$(document).on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var school = button.data('school');
  var district = button.data('district');
  var enrollment = button.data('enrollment');
  var amount = button.data('owed');
  $.getScript("https://platform.twitter.com/widgets.js");
  if (school !=undefined) {
    var modal = $('#schoolModal')
    var formattedAmt = parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
    modal.find('.modal-title').text(school + " ");
    modal.find('.modal-title-district').text("(" + district + ")")
    modal.find('.amount-number').text("$" + formattedAmt);
    modal.find('.enrollment-number').text(enrollment);
    modal.find('.twitter-link').html("<a href='https://twitter.com/share' class='twitter-share-button' data-url='http://www.howmuchnysrobbed.nyc/' data-text='NYS & @nygovcuomo owe "+school+" $"+formattedAmt+" - ' data-count='none' data-hashtags='NYOpportunity, allkidsneed, wecantwait'>Tweet</a>")
  }

});


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
//   var attribute = document.createAttribute("data-bg");
//   attribute.value = txt_rep;
//   document.body.setAttributeNode(attribute);
// }

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

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    console.log("hi")
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});


function createDistrictButtons(data,buttonsdiv) {
  for (k in data) {
    buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#district'+data[k].code+'" aria-expanded="false" aria-controls="collapseExample">'+data[k].district+'</a>')
  }
}

function createDistrictInformation(data, infodiv) {
  for (k in data) {
    infodiv.append('<div class="collapse" id="district'+data[k].code+'"><div class="well"><div class="row"><div class="col-md-8"><h5 class="well-title">total amount owed to '+data[k].district+' </h5><h3 class="well-content highlight-title">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3></div><div class="col-md-4"><h5 class="well-title">total number students</h5><h3 class="well-content highlight-title">'+data[k].total_enrollment+'</h3></div></div></div></div>') 
  }

}
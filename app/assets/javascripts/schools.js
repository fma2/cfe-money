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

  //AJAX call for district section information
  $.ajax({
    dataType: 'json',
    url: '/districts',
    type: 'GET'
  }).success(function(data) {
    createDistrictInformation(data)
  }).fail(function() {
    console.log("Failed to load district information");
  }); 

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
  $.getScript("http://platform.twitter.com/widgets.js");
  if (school !=undefined) {
    var modal = $('#schoolModal')
    var formattedAmt = parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
    modal.find('.modal-title').text(school + " ");
    modal.find('.modal-title-district').text("(" + district + ")")
    modal.find('.amount-number').text("$" + formattedAmt);
    modal.find('.enrollment-number').text(enrollment);
    modal.find('.twitter-link').html("<a href='https://twitter.com/share' class='twitter-share-button' data-url='http://www.howmuchnysrobbed.nyc/' data-text='NYS and @nygovcuomo owe "+school+" $"+formattedAmt+" - ' data-count='none' data-hashtags='allkidsneed, wecantwait, eduequity'>Tweet</a>")
  }

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
  var attribute = document.createAttribute("data-bg");
  attribute.value = txt_rep;
  document.body.setAttributeNode(attribute);
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

function createDistrictInformation(data) {
  var districtButtons = document.getElementById('district-buttons');
  for (var i = 1; i < 33; i++) {
    $('#district-buttons').append('<a class="btn btn-custom" data-toggle="collapse" href="#district'+i+'" aria-expanded="false" aria-controls="collapseExample">District '+i+'</a>')
  }
  console.log(data)
  $('#district-buttons').append('<a class="btn btn-custom" data-toggle="collapse" href="#district75" aria-expanded="false" aria-controls="collapseExample">District 75</a>')
  for (k in data) {
    var district = parseInt(k) + 1;
    if (data[k].code == 'D75') {
      $('#district-info').append('<div class="collapse" id="district75"><div class="well"><div class="row"><div class="col-md-8"><h5 class="well-title">total amount owed to special schools district 75 </h5><h3 class="well-content highlight-title">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3></div><div class="col-md-4"><h5 class="well-title">total number students</h5><h3 class="well-content highlight-title">'+data[k].total_enrollment+'</h3></div></div></div></div>')
    }
    $('#district-info').append('<div class="collapse" id="district'+district+'"><div class="well"><div class="row"><div class="col-md-8"><h5 class="well-title">total amount owed to geographic district '+district+' </h5><h3 class="well-content highlight-title">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3></div><div class="col-md-4"><h5 class="well-title">total number students</h5><h3 class="well-content highlight-title">'+data[k].total_enrollment+'</h3></div></div></div></div>') 
  }

}
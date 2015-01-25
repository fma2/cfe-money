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
 
});

$(window).on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var dbn = button.data('dbn'); // Extract info from data-* attributes
  var school = button.data('school');
  var enrollment = button.data('enrollment');
  var amount = button.data('owed');
  var modal = $('#schoolModal')
  modal.find('.modal-title').text(school);
  modal.find('.amount-number').text("$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  modal.find('.enrollment-number').text(enrollment);
});


function createDynamicTextBackground(data) {
  var txt = [];
  for (k in data) {
    txt.push(data[k].dbn);
    txt.push(data[k].school);
    txt.push(data[k].total_enrollment);
    txt.push("$" + data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
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
    $('#district-buttons').append('<a class="btn btn-default" data-toggle="collapse" href="#district'+i+'" aria-expanded="false" aria-controls="collapseExample">District '+i+'</a>')
  }

  for (k in data) {
    $('#district-info').append('<div class="collapse" id="district'+k+'"><div class="well"><div class="row"><div class="col-md-8"><h5 class="well-title">Total Amount Owed to District '+k+': </h5><h3 class="well-content">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3></div><div class="col-md-4"><h5 class="well-title">Total Number Students</h5><h3 class="well-content">'+data[k].total_enrollment+'</h3></div></div></div></div>')
  }

}
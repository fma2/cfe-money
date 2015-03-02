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
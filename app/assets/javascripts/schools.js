$(document).on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var modal = $('#schoolModal')

  var school_id = button.data('school-id');
  var school = button.data('school');

  var amount = button.data('owed');
  modal.find('.legislators-section').text('');

  $.ajax({
    dataType: 'json',
    url: "/legislators/"+school_id+"",
    type: 'GET'
  }).success(function(data) {
    var legislators_information = data;
    if (legislators_information.length > 0) {
      for (i = 0; i< legislators_information.length; i++) {
        modal.find('.legislators-section').append("<div class='col-lg-6'>" +
            "<div class='legislator-information'>" +
              "<div class='col-lg-3'>" +
                "<div class='leg-photo'><a href="+legislators_information[i].website+" target='_blank'><img class='img-responsive' src='"+legislators_information[i].photo+"'></a></div>" +
              "</div>" +
              "<div class='col-lg-9'>" +
                "<h4 class='leg-name'><a href="+legislators_information[i].website+" target='_blank'>"+legislators_information[i].full_name+"</a></h4>" +
                "<p class='leg-house'>"+legislators_information[i].house+"</p>" +
                "<h5 class='leg-district'>"+legislators_information[i].district_name+"</h5>" +
                "<p class='leg-email'><a href='mailto:"+legislators_information[i].email+"?Subject=What are you doing to get CFE money back to our schools?'>"+legislators_information[i].email+"</a></p>" +
                "<p class='leg-albanyno'>"+legislators_information[i].albany_office_no+"</p>" +
                "<p class='leg-website'>" +
                  "<a href="+legislators_information[i].website+" target='_blank'>website</a>" +
                "</p>" +
              "</div>" +
              "<br>" +
            "</div>" +
          "</div>")
      }
    }
  }).fail(function() {
    console.log("Failed to load legislators information")
  });

  var school = button.data('school');
  var district = button.data('district');
  var enrollment = button.data('enrollment');
  var amount = button.data('owed');

  $.getScript("https://platform.twitter.com/widgets.js");
  if (school !=undefined) {
    var formattedAmt = parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
    modal.find('.modal-title').text(school.toProperCase() + " ");
    modal.find('.modal-title-district').text("(" + district.toProperCase() + ")")
    if (formattedAmt=="0.00") {
      modal.find('.amount-number').text("budget data not available");
    } else {
      modal.find('.amount-number').text("$" + formattedAmt);
    }
    modal.find('.enrollment-number').text(enrollment);
    modal.find('.twitter-link').html("<a href='https://twitter.com/share' class='twitter-share-button' data-url='http://www.howmuchnysrobbed.nyc/' data-text='NYS & @nygovcuomo owe "+school+" $"+formattedAmt+" - ' data-count='none' data-hashtags='MySchoolNeeds, AllKidsNeed, WeCantWait'>Tweet</a>")
  }
});


function createDistrictButtons(data,buttonsdiv) {
  for (k in data) {
    buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#district'+data[k].code+'" aria-expanded="false" aria-controls="collapseExample">'+data[k].district+'</a>')
  }
}

function createElectoralDistrictButtons(data,buttonsdiv) {
  for (k in data) {
    if (data[k].full_name == undefined) {
      buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#district'+data[k].code+'" aria-expanded="false" aria-controls="collapseExample">'+data[k].district+'</a>')
    } else {
      buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#district'+data[k].code+'" aria-expanded="false" aria-controls="collapseExample">'+data[k].district+' - '+data[k].last_name+'</a>')
    }
  }
}

function createSchoolDistrictInformation(data,infodiv) {
for (k in data) {
  infodiv.append('<div class="collapse" id="district'+data[k].code+'">' +
    '<div class="well">'+
      '<div class="row">'+
        '<div class="col-md-8">' +
          '<h5 class="well-title">total amount owed to '+data[k].district+' </h5>'+
          '<h3 class="well-content highlight-title">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3>' +
        '</div>'+
        '<div class="col-md-4">' +
          '<h5 class="well-title">total number students</h5>' +
          '<h3 class="well-content highlight-title">'+data[k].total_enrollment+'</h3>' +
        '</div>'+
      '</div>'+        
    '</div>'+
  '</div>') 
  }
}

function createElectoralDistrictInformation(data, infodiv) {
  for (k in data) {

    if (data[k].full_name == undefined) {
      infodiv.append('<div class="collapse" id="district'+data[k].code+'">' +
      '<div class="well">'+
        '<div class="row">'+
          '<div class="col-md-8">' +
            '<h5 class="well-title">total amount owed to '+data[k].district+'</h5>'+
            '<h3 class="well-content highlight-title">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3>' +
          '</div>'+
          '<div class="col-md-4">' +
            '<h5 class="well-title">total number students</h5>' +
            '<h3 class="well-content highlight-title">'+data[k].total_enrollment+'</h3>' +
          '</div>'+
        '</div>'+
        '<div class="row">'+
          '<div class="col-md-8">' +
            '<h5 class="well-title">elected official</h5>'+
            "<p>VACANT</p>" +
          '</div>'+
          '<div class="col-md-4">' +
            '<h5 class="well-title">schools in district</h5>'+
            "<p>"+listSchools(data[k].schools)+"</p>" +
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>') 
    } else {
      infodiv.append('<div class="collapse" id="district'+data[k].code+'">' +
        '<div class="well">'+
          '<div class="row">'+
            '<div class="col-md-7">' +
              '<h5 class="well-title">total amount owed to '+data[k].district+'</h5>'+
              '<h3 class="well-content highlight-title">$'+data[k].amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</h3>' +
            '</div>'+
            '<div class="col-md-5">' +
              '<h5 class="well-title">total number students</h5>' +
              '<h3 class="well-content highlight-title">'+data[k].total_enrollment+'</h3>' +
            '</div>'+
          '</div>'+
          '<div class="row">'+
            '<div class="col-md-7">' +
              '<h5 class="well-title well-schools-list-title">schools in district</h5>'+
              "<div class='well-schools-list'>"+listSchools(data[k].schools)+"</div>" +
            '</div>'+
            '<div class="col-md-5">' +
              "<div class='well-legislator-information'>" +
                '<h5 class="well-title">elected official</h5>'+
                "<div class='col-lg-3'>" +
                  "<div class='well-leg-photo'><a href="+data[k].website+" target='_blank'><img class='img-responsive' src='"+data[k].photo+"'></a></div>" +
                "</div>" +
                "<div class='col-lg-9'>" +
                  "<h4 class='well-leg-name'><a href="+data[k].website+" target='_blank'>"+data[k].full_name+"</a></h4>" +
                  "<p class='well-leg-house'>"+data[k].house+"</p>" +
                  "<h5 class='well-leg-district'>"+data[k].district_name+"</h5>" +
                  "<p class='well-leg-email'><a href='mailto:"+data[k].email+"?Subject=What are you doing to get CFE money back to our schools?'>"+data[k].email+"</a></p>" +
                  "<p class='well-leg-albanyno'>"+data[k].albany_office_no+"</p>" +
                  "<p class='well-leg-website'>" +
                    "<a href="+data[k].website+" target='_blank'>website</a>" +
                  "</p>" +
                "</div>" +
                "<br>" +
              "</div>" +
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>') 
    }
  }
}

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
function findLegTotals(chamber,district){
  $.ajax({
    dataType:'json',
    url: '/electoral_districts/'+chamber+'/'+district+'',
    type: 'GET'
  }).success(function(data) {
    var electoralDistrictInfo = $("#"+chamber+""+district+"");
    createElectoralDistrictInformation(data[0],electoralDistrictInfo)
  }).fail(function(){
    console.log("Could not get electoral districts' data");
  })
}

function createSchoolDistrictInformation(data,infodiv) {
  for (k in data) {
    infodiv.append('<div class="accordion-group">' +
      '<div class="accordion-heading">' +
      '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#district'+data[k].code+'">' +
      '<button type="button" class="btn btn-primary btn-block"><i class="fa fa-angle-right"></i> '+data[k].district+'</button>' +
      '</a>' +
      '</div>' +
      '<div id="district'+data[k].code+'" class="accordion-body collapse">' +
      '<div class="accordion-inner">' +
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
      '</div>' +
      '</div>' +
      '</div>')
  }
}

function createElectedOfficialInformation(data,infodiv) {
  var x = $("#electoral-districts-accordion");
  var chamber;
  if (data.chamber == "upper") {
    chamber = "SD"
  } else if  (data.chamber == "lower") {
    chamber = "AD"
  }
  x.append(
    '<div class="accordion-group">' +
    '<div class="accordion-heading">' +
    '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#'+data.chamber+''+data.district+'">' +
    '<button type="button" class="btn btn-primary btn-block leg-button"><i class="fa fa-angle-right"></i> '+chamber+''+data.district+' - '+data.last_name+'</button>' +
    '</a>' +
    '</div>' +

    '<div id="'+data.chamber+''+data.district+'" class="accordion-body collapse">' +
    '<div class="accordion-inner">' +
    '<div class="row">'+
    '<div class="col-md-6">' +
    "<div class='well-legislator-information'>" +
    '<h5 class="well-title">legislator</h5>'+
    "<div class='col-lg-5'>" +
    "<div class='well-leg-photo'><a href="+data.url+" target='_blank'><img class='img-responsive img-rounded' src='"+data.photo_url+"'></a></div>" +
    "</div>" +
    "<div class='col-lg-7'>" +
    "<h4 class='well-leg-name'><a href="+data.url+" target='_blank'>"+data.full_name+"</a></h4>" +
    "<h5>" +
    "<span class='well-leg-house'>"+chamber+"</span> " +
    "<span class='well-leg-district'>"+data.district+"</span>" +
    "</h5>" +
    "<p class='well-leg-email'><a href='mailto:"+data.email+"?Subject=What are you doing to get CFE money back to our schools?' onclick='ga('send', 'event', 'Take action link', 'click', 'Email legislator');'>"+data.email+"</a></p>" +
    "<p class='well-leg-albanyno'><a href='tel:"+data.offices[0]["phone"]+" onclick='ga('send', 'event', 'Take action link', 'click', 'Call legislator');''>"+data.offices[0]["phone"]+"</a></p>" +
    "<p class='well-leg-website'>" +
    "<a href="+data.url+" target='_blank'>website</a>" +
    "</p>" +
    "</div>" +
    "<br>" +
    "</div>" +
    '</div>'+
    "<div class='col-md-6'>" +

    "</div>" +
    '</div>'+
    '<div class="row">'+
    '<div class="col-md-7">' +
    '<h5 class="well-title">total amount owed to district</h5>'+
    '<h3 class="well-content highlight-title"></h3>' +
    '</div>'+
    '<div class="col-md-5">' +
    '<h5 class="well-title">total number students</h5>' +
    '<h3 class="well-content highlight-title"></h3>' +
    '</div>'+
    '</div>'+
    '<div class="row">'+
    '<div class="col-md-12">' +
    '<h5 class="well-title well-schools-list-title">schools in district</h5>'+
    "<div class='well-schools-list'></div>" +
    '</div>'+
    '</div>'+
    '</div>' +
    '</div>' +
    '</div>')

}

function createElectoralDistrictInformation(data, infodiv) {
  infodiv.find('.col-md-7 .well-content').text(data.amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  infodiv.find('.col-md-5 .well-content').text(data.total_enrollment);
  for (k in data.schools) {
    infodiv.find('.well-schools-list').append('<p>'+data.schools[k]+'</p>')
  }

}
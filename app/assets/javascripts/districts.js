function createDistrictButtons(data,buttonsdiv) {
  for (k in data) {
    buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#district'+data[k].code+'" aria-expanded="false" aria-controls="collapseExample">'+data[k].district+'</a>')
  }
}

function createElectoralDistrictButtons(data,buttonsdiv) {
  for (k in data) {

    if (data[k].full_name == undefined) {
      buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#'+data[k].chamber+''+data[k].district+'" aria-expanded="false" aria-controls="collapseExample">'+data[k].district+'</a>')
    } else {
      if (data[k].chamber == "upper") {
        buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#'+data[k].chamber+''+data[k].district+'" aria-expanded="false" aria-controls="collapseExample">SD'+data[k].district+' - '+data[k].last_name+'</a>')
      } else if (data[k].chamber =="lower") {
        buttonsdiv.append('<a class="btn btn-custom" data-toggle="collapse" href="#'+data[k].chamber+''+data[k].district+'" aria-expanded="false" aria-controls="collapseExample">AD0'+data[k].district+' - '+data[k].last_name+'</a>')
      }
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

function createElectedOfficialInformation(data,infodiv) {
  if (data.full_name == undefined) {
    infodiv.append('<div class="collapse" id="#'+data.chamber+''+data.district+'">' +
      '<div class="well">'+
      '<div class="row">'+
      '<div class="col-md-7">' +
      '<h5 class="well-title">total amount owed to '+data.chamber+' '+data.district+'</h5>'+
      '<h3 class="well-content highlight-title"></h3>' +
      '</div>'+
      '<div class="col-md-5">' +
      '<h5 class="well-title">total number students</h5>' +
      '<h3 class="well-content highlight-title"></h3>' +
      '</div>'+
      '</div>'+
      '<div class="row">'+
      '<div class="col-md-7">' +
      '<h5 class="well-title">schools in district</h5>'+
      "<div class='well-schools-list'></div>" +
      '</div>'+
      '<div class="col-md-5">' +
      '<h5 class="well-title">elected official</h5>'+
      "<p>VACANT</p>" +
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>') 
  } else {
    infodiv.append('<div class="collapse" id="'+data.chamber+''+data.district+'">' +
      '<div class="well">'+
      '<div class="row">'+
      '<div class="col-md-7">' +
      '<h5 class="well-title">total amount owed to '+data.chamber+' '+data.district+'</h5>'+
      '<h3 class="well-content highlight-title"></h3>' +
      '</div>'+
      '<div class="col-md-5">' +
      '<h5 class="well-title">total number students</h5>' +
      '<h3 class="well-content highlight-title"></h3>' +
      '</div>'+
      '</div>'+
      '<div class="row">'+
      '<div class="col-md-7">' +
      '<h5 class="well-title well-schools-list-title">schools in district</h5>'+
      "<div class='well-schools-list'></div>" +
      '</div>'+
      '<div class="col-md-5">' +
      "<div class='well-legislator-information'>" +
      '<h5 class="well-title">elected official</h5>'+
      "<div class='col-lg-3'>" +
      "<div class='well-leg-photo'><a href="+data.url+" target='_blank'><img class='img-responsive' src='"+data.photo_url+"'></a></div>" +
      "</div>" +
      "<div class='col-lg-9'>" +
      "<h4 class='well-leg-name'><a href="+data.url+" target='_blank'>"+data.full_name+"</a></h4>" +
      "<p class='well-leg-house'>"+data.chamber+"</p>" +
      "<h5 class='well-leg-district'>"+data.district+"</h5>" +
      "<p class='well-leg-email'><a href='mailto:"+data.email+"?Subject=What are you doing to get CFE money back to our schools?'>"+data.email+"</a></p>" +
      "<p class='well-leg-albanyno'><a href='tel:"+data.offices[0]["phone"]+"'>"+data.offices[0]["phone"]+"</a></p>" +
      "<p class='well-leg-website'>" +
      "<a href="+data.url+" target='_blank'>website</a>" +
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

function createElectoralDistrictInformation(data, infodiv) {
  infodiv.find('.col-md-7 .well-content').text(data.amount_owed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  infodiv.find('.col-md-5 .well-content').text(data.total_enrollment);
  for (k in data.schools) {
    infodiv.find('.well-schools-list').append('<p>'+data.schools[k]+'</p>')
  }

}
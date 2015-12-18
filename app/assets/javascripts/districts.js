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
            '<h5 class="well-title">schools in district</h5>'+
            "<div class='well-schools-list'>"+listSchools(data[k].schools)+"</div>" +
          '</div>'+
          '<div class="col-md-5">' +
            '<h5 class="well-title">elected official</h5>'+
            "<p>VACANT</p>" +
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
                  "<p class='well-leg-albanyno'><a href='tel:"+data[k].albany_office_no+"'>"+data[k].albany_office_no+"</a></p>" +
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
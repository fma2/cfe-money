$( document ).ready(function() {

  $("body").hide(0).delay(100).fadeIn(2200);
  // $('.read-more').click(function(e) {
  //   $(this).hide();
  // });

  var divsToHide = ["#school-info-section", "#school-info-section .school-section", "#take-action-section", "#legislators-section", "#cart"]

  for (k in divsToHide) {
    hideDiv(divsToHide[k])
  }

  $('.loc-tabs li:nth-child(1)').addClass('active'); // select NYC tab when page opens
  $('.tab-content .tab-pane:nth-child(1)').addClass('in');
  $('.tab-content .tab-pane:nth-child(1)').addClass('active');

  $('#search_text2, #search_text1').on("click", function( e ) {
    $("body, html").animate({ 
      scrollTop: $('.loc-tabs').offset().top 
    }, 600);
  })

  $("[rel='tooltip']").tooltip();
  $('.thumbnail').hover(
      function(){
        $(this).find('.caption').slideDown(250);
      },
      function(){
        $(this).find('.caption').slideUp(250);
      }
    ); 

  $("#cart-items #item").click(function() {
    event.preventDefault();
    event.stopPropagation();
    var cost = $(this).data('cost');
    var itemData = $(this).data;
    var itemTag = $(this).data('item')
    var itemName = $(this).data('name');
    updateAmountLeftToSpend(cost, itemTag, itemName);
  })

  //AJAX call for dynamic text background data
  // $.ajax({
  //   dataType: 'json',
  //   url: '/random',
  //   type: 'GET'
  // }).success(function(data) {
  //   createDynamicTextBackground(data)
  // }).fail(function() {
  //   console.log("Failed to load background text")
  // });

})

function toggleVisibility(id) {
  var e = document.getElementById(id);
  if(e.style.display == 'visible')
    e.style.visibility = 'hidden';
  else
    e.style.visibility = 'visible';
}

function hideDiv(selector) {
  $(selector).css("visibility", "hidden")
} 

function updateAmountLeftToSpend(cost, item, name) {
  var cartSection = $("#cart")
  var amountLeft = cartSection.find('#amount-left-to-spend').data("amount-number");  
  var updatedAmount = amountLeft - cost;
  if (updatedAmount > 0) {
    cartSection.find('#amount-left-to-spend').data("amount-number", updatedAmount);
    var formattedAmt = parseFloat(updatedAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
    cartSection.find('#amount-left-to-spend').text("$" + formattedAmt);
    updateCart(item, name);
  } else {
    cartSection.find("#purchased-items").prepend("<div class='alert alert-info fade in'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Oh snap! </strong>You don't have enough available to spend on that item.</div>");
    window.setTimeout(function() { $(".alert").alert('close'); }, 2000);
  }
}


function updateCart(item, name) {
  var addedItems = $("#cart").find("#added-items");
  var numberofItems = addedItems.children().length;
  var number = 1;
  if (numberofItems != 0) {
    if ($("#added-items > p[data-item-name="+item+"]").length > 0) {
      var itemInCart = addedItems.find("p[data-item-name="+item+"]");
      var currentCount = itemInCart.data("item-count");
      var newCount = currentCount + 1
      itemInCart.data("item-count", newCount)
      itemInCart.html('<p data-item-name='+item+' data-item-count='+newCount+'><span id="number-of-items">'+newCount+' </span>'+name+'</p>')
    } else {
      addedItems.append('<p data-item-name='+item+' data-item-count='+number+'><span id="number-of-items">'+number+' </span>'+name+'</p>')
    }
  } else {
    addedItems.append('<p data-item-name='+item+' data-item-count='+number+'><span id="number-of-items">'+number+' </span>'+name+'</p>')
  }
}



//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    // $.scrollify.move("#");
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

// $.scrollify({
//   section : ".cover",
//   sectionName : "section-name",
//   easing: "easeInOutExpo",
//   scrollSpeed: 1500,
//   offset : 0,
//   scrollbars: true,
//   before:function() {},
//   after:function() {},
//   afterResize:function() {}
// });
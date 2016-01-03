// GLOBAL VARIABLES
var defaultLocationTab = 1; // set default location tab
var teacher = 54329; // resource costs
var arts_program = 75000;
var library = 77000;
var divsToToggle = ["#school-info-section", "#school-info-section .school-section", "#take-action-section", "#cart"]

// Document ready function
$(document).ready(function() {
  homeReset();
})

function homeReset(){
  // fade page in
  $("body").hide(0).delay(100).fadeIn(2200);

  // animate search bar
  $('#search_text2, #search_text1').on("click", function( e ) { 
    $("body, html").animate({ 
      scrollTop: $('.loc-tabs').offset().top 
    }, 600);
  })  
  
  // initial hide of divs below header
  $(function(){
    $(".visible-results").hide();
    $("#legislators-section").hide();
    showDiv("#two .equal")
    for (k in divsToToggle) {
      hideDiv(divsToToggle[k])
    }
  })

  addSmoothScroll('a.page-scroll'); // add smoothScroll
  setActiveSearchTab(1); // select NYC tab when page open
  addCartItemsListeners(); // add cart event listeners
  animateCartButtons(); // animate captions for cart items
}

function addSmoothScroll(div) {
  $(div).smoothScroll();
}

function setActiveSearchTab(tabNum){
  $('.loc-tabs li:nth-child('+tabNum+')').addClass('active'); 
  $('.tab-content .tab-pane:nth-child('+tabNum+')').addClass('in');
  $('.tab-content .tab-pane:nth-child('+tabNum+')').addClass('active');
}

function hideDiv(selector) {
  $(selector).css("visibility", "hidden")
} 
function showDiv(selector) {
  $(selector).css("visibility", "visible")
}

function formatAmount(amount){
  return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
}

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function isArray(object)
{
  if (object.constructor === Array) return true;
  else return false;
}


function twitterLink() {
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
}


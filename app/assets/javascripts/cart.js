function addCartItemsListeners(){
  $("#cart-items #item").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    var cost = $(this).data('cost');
    var itemData = $(this).data;
    var itemTag = $(this).data('item')
    var itemName = $(this).data('name');
    console.log($("#cart").find('#amount-left-to-spend').data("amount-number"));
    updateAmountLeftToSpend(cost, itemTag, itemName);
  })
}

function animateCartButtons(){
  $("[rel='tooltip']").tooltip();
  $('.thumbnail').hover(
    function(){
      $(this).find('.caption').slideDown(250);
    },
    function(){
      $(this).find('.caption').slideUp(250);
    }
  );
}
function updateAmountLeftToSpend(cost, item, name) {
  var cartSection = $("#cart")
  var amountLeft = cartSection.find('#amount-left-to-spend').data("amount-number");  
  console.log(amountLeft)
  var updatedAmount = amountLeft - cost;
  $("#purchased-items").css("display", "block")
  if (updatedAmount > 0) {
    cartSection.find('#amount-left-to-spend').data("amount-number", updatedAmount);
    cartSection.find('#amount-left-to-spend').css("color", "#ff606e");

    var formattedAmt = parseFloat(updatedAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
    cartSection.find('#amount-left-to-spend').text("$" + formattedAmt);
    updateCart(item, name);
  } else {
    cartSection.find(".details-section").prepend("<div class='alert alert-info fade in'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Oh snap! </strong>You don't have enough available to spend on that item.</div>");
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
      // p = itemInCart.appendChild(p);
      itemInCart.html('<p data-item-name='+item+' data-item-count='+newCount+'><span id="number-of-items">'+newCount+' </span>'+name+'</p>')
    } else {
      addedItems.append('<p data-item-name='+item+' data-item-count='+number+'><span id="number-of-items">'+number+' </span>'+name+'</p>')
    }
  } else {
    addedItems.append('<p data-item-name='+item+' data-item-count='+number+'><span id="number-of-items">'+number+' </span>'+name+'</p>')
  }
}
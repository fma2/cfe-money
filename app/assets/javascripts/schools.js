$( document ).ready(function() {
	console.log("ready!");
});

$(window).on('show.bs.modal', function (event) {
	console.log("hi");
  var button = $(event.relatedTarget) // Button that triggered the modal
  var dbn = button.data('dbn'); // Extract info from data-* attributes
  var school = button.data('school');
  var enrollment = button.data('enrollment');
  var amount = button.data('owed');
  console.log(enrollment);
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $('#schoolModal')
  modal.find('.modal-title').text(school);
  modal.find('.amount-number').text("$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  modal.find('.enrollment-number').text(enrollment);
  // modal.find('.modal-title').text('New message to ' + recipient)
  // modal.find('.modal-body input').val(recipient)
});
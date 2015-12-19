// not sure where the 2 items below  are used in site
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


//resource costs
var teacher = 54329;
var arts_program = 75000;
var library = 77000;


function showSchoolInformation() {
	$(".result-item a").click(function(e){
		$(".warning-text").css("display", "none");
		$("#results-section .school-section").css("display", "inline");
		
		var button = $(this);
		prepareSchoolInformation(button);
	})
}

function prepareSchoolInformation(button){
	console.log('clicked');
	var schoolInfo = $('#school-information')
	var takeAction = $('#take-action-section')
	var cartSection = $('#cart');

	var school = button.data('school');
	var district = button.data('district');
	var enrollment = button.data('enrollment');
	var amount = button.data('owed');
	var senate = button.data('senate');
	var assembly = button.data('assembly');

	if (school !=undefined) {
		var formattedAmt = parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
		schoolInfo.find('.school-title').text(school.toProperCase() + " ");
		// takeAction.find('.school-title').text(""+school.toProperCase()+"'s");
		schoolInfo.find('.school-title-district').text("(" + district.toProperCase() + ")")

		cartSection.find('.school-title').text(school.toProperCase() + " ");
		cartSection.find('.school-title-district').text("(" + district.toProperCase() + ")")

		if (formattedAmt=="0.00") {
			schoolInfo.find('.amount-number').text("budget data not available");
			cartSection.find('.amount-number').text("budget data not available");
		} else {
			schoolInfo.find('.amount-number').text("$" + formattedAmt);
			cartSection.find('.amount-number').text("$" + formattedAmt);

		}

		displayResourceAmount(amount, schoolInfo);

		var perStudentAmount = parseFloat(amount / enrollment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
		schoolInfo.find('.per-student-amount').text(perStudentAmount);
		cartSection.find('.per-student-amount').text(perStudentAmount);


		schoolInfo.find('.twitter-link').html("<a href='https://twitter.com/share' class='twitter-share-button' data-url='http://www.cfemoneyowednys.org/' data-text='NYS & @nygovcuomo owe "+school+" $"+formattedAmt+" - ' data-count='none' data-hashtags='ProtectOurSchools, AllKidsNeed, WeCantWait'>Tweet</a>")

		$("#take-action-section .legislators-section").css("display", "inline");
		findSchoolLegInformation("upper", senate, takeAction);
		findSchoolLegInformation("lower", assembly, takeAction);

		twitterLink();

		schoolInfo.find('.twitter-link').html("<a href='https://twitter.com/share' class='twitter-share-button'{count} data-size='large' data-url='http://www.cfemoneyowednys.org/' data-text='NYS & @nygovcuomo owe "+school+" $"+formattedAmt+" - ' data-count='none' data-hashtags='ProtectOurSchools, AllKidsNeed, WeCantWait'>Tweet</a>");
	}
};

// School legislators js

// '+ENV['SUNLIGHT_FOUNDATION_API_KEY']+'
function findSchoolLegInformation(chamber, district, targetDiv) {
	$.ajax({
		dataType:'json',
		url: 'http://openstates.org/api/v1//legislators/?state=ny&chamber='+chamber+'&active=true&district='+district+'&apikey='+ENV['SUNLIGHT_FOUNDATION_API_KEY']+'',
		type: 'GET'
	}).success(function(data){
		var legislators = data;
		var leg = legislators[0]
		displaySchoolLegInformation (chamber, leg, targetDiv);
	}).fail(function() {
		console.log("Failed to load electoral district information");
	})
}

function displaySchoolLegInformation(chamber, legislator, targetDiv) {
	console.log(legislator);

	targetDiv.find('.legislators-section .leg-'+chamber+' .leg-photo img').attr("src", legislator["photo_url"]);
	var legInfoSection = '.legislators-section .leg-'+chamber+' .leg-info';
	targetDiv.find(legInfoSection).append('<p>'+legislator["full_name"]+'</p>');
	targetDiv.find(legInfoSection).append('<p>Chamber: '+legislator["chamber"]+'</p>');
	targetDiv.find(legInfoSection).append('<p>District: '+legislator["district"]+'</p>');
	targetDiv.find(legInfoSection).append('<p>'+legislator["email"]+'</p>');
	targetDiv.find(legInfoSection).append('<p>'+legislator.offices[0]["phone"]+'</p>');


}

// School resources

function calculateResourceAmount(cost, fundsAvailable){
	return Math.round(fundsAvailable / cost);
}

function displayResourceAmount(amount, targetDiv) {
	// var amountAvailable = amount
	// if (amount > library) {
	// 	amountAvailable +- library
	// 		targetDiv.find('.resource-library .resource-text h4').text(''+num_library+' libraries')		
	// }
	var amount_per_resource = amount / 3
	var num_teacher = calculateResourceAmount(teacher, amount_per_resource)
	var num_arts_programs = calculateResourceAmount(arts_program, amount_per_resource)
	var num_library = calculateResourceAmount(library, amount_per_resource)

	targetDiv.find('.resource-teacher .resource-text h4').text('Hiring at least '+num_teacher+' classroom teacher/s')
	targetDiv.find('.resource-arts .resource-text h4').text('Providing an arts program for at least '+num_arts_programs+' years/')
	targetDiv.find('.resource-library .resource-text h4').text('Maintaining the library for at least '+num_library+' year/s')

}
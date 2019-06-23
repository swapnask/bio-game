$(document).ready(function() {


	$("#UpdateProfile").on('click', function() {
	    var playerid = $("#playername").val();
		var proficiency = $("#proficiencyDropDown").find(":selected").text();
		var dataObject = {
				"proficiency" : proficiency
			};

		  $.ajax({
			  type : "PUT",
			  url : "/gameeduapp/player/" + playerid,
			  data : JSON.stringify(dataObject),
			  success : function(success, status, xhr) {
				if(success) {
					alert("Your profile has been updated");
				} else {
					alert("Error updating your profile details");
				}
			  },
			  error : function(error, status) {
				
			  },
			  dataType : "json",
			  contentType: 'application/json'
		  });


	});
});

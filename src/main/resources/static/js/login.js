$(document).ready(function() {

	$("#SignIn").on('click', function() {
		var player_id = $("#player_id").val();
		var password = $("#password").val();
		var dataObject = {
				"playerId" : player_id,
				"password" : password
			};
		var fields = ["playerId","password"];
		var result = validateObjectFields(dataObject, fields);
		if(result.fieldsMissing == true) {
        	alert(result.msg);
        }
		else {
		console.log(JSON.stringify(dataObject));
		  $.ajax({
			  type : "POST",
			  url : "/gameeduapp/login",
			  data : JSON.stringify(dataObject),
			  success : function(success, status, xhr) {
				if(success) {
				//alert("Successfully Logged in");
					window.globalVar = player_id;
					window.location.href = 'home';
				} else {
					$("#SignIn").before("<div style='color:red;'>*User Name or Password incorrect</div>");
				}
			  },
			  error : function(error, status) {
				
			  },
			  dataType : "json",
			  contentType: 'application/json'
		  });
		}

	});
	$("#Register").on('click', function() {
		window.location.href = 'register';
	});
});

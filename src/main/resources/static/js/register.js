$(document).ready(
				function() {
					$("#Register").on('click', function() {
						var player_id = $("#player_id").val();
						var password = $("#password").val();
						var confirmpassword = $("#confirmpassword").val();
						var firstName = $("#firstname").val();
						var lastName = $("#lastname").val();

						//var playerId = makeid(3);

						var dataObject = {
						        "playerId" : player_id,
								"password" : password,
								"firstName" : firstName,
								"lastName" : lastName,
								"proficiency" : "BEGINNER"
							};
                       var fields = ["playerId","password", "firstName", "lastName", "proficiency"];
						
				        var result = validateObjectFields(dataObject, fields);
				        console.log(result);
				        if(result.fieldsMissing == true) {
				        	alert(result.msg);
				        }
				        else if (confirmpassword !== password) {
							alert("Passwords do not match!");
						}
						else if(isNumeric(firstName)){
							alert("First name cannot contain digits.");
						}
						else if(isNumeric(lastName)){
							alert("Last name cannot contain digits.");
						}
						else {
						console.log(JSON.stringify(dataObject));
							$.ajax({
										type : "POST",
										url : "/gameeduapp/register",
										data : JSON.stringify(dataObject),
										success : function(success, status, xhr) {
												alert("Successfully registered");
												window.location.href = 'web';
										},
										error : function(error, status) {
											alert("Failed to register: ", error);
											console.log(error);
										},
										contentType : 'application/json'
									});
						}
					});
					$("#Cancel").on('click', function() {
						window.location.href = 'web';
					});
					
					});99
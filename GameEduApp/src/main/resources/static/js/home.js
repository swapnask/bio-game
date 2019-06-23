$(document).ready(
				function() {
				getUserDetails();
				$("#UserProfileContent").css("display","none");
                $("#UserDashboardContent").css("display","none");
                $("#UserLeaderboardContent").css("display","none");
                $("#HomeContent").css("display","block");
                    //Fetches user details from the Server
                    				function getUserDetails (){
                    					$.ajax({
                    						type : "GET",
                    						url : "/gameeduapp/currentPlayer",
                    						success : function(data) {
                                               console.log(data)
                    							window.globalVar = data;
                    							$("#UserProfileContent").css("display","none");
                                               $("#UserDashboardContent").css("display","none");
                                               $("#UserLeaderboardContent").css("display","none");
                    							//setUserDetails();
                    						},
                    						error : function(error, status) {
                    							console.log("error:", error);
                    						},
                    						dataType : "json"
                    					});
                    				}


                    $("#UserProfile").on('click', function() {
                    	$("#UserProfileContent").css("display","block");
                    	 $("#HomeContent").css("display","none");
                         $("#UserDashboardContent").css("display","none");
                         $("#UserLeaderboardContent").css("display","none");
                    });

                     $("#Home").on('click', function() {
                          $("#HomeContent").css("display","block");
                          $("#UserProfileContent").css("display","none");
                          $("#UserDashboardContent").css("display","none");
                          $("#UserLeaderboardContent").css("display","none");
                     });

                    $("#UserLeaderboard").on('click', function () {
                        $("#HomeContent").css("display","none");
                        $("#UserProfileContent").css("display","none");
                        $("#UserDashboardContent").css("display","none");
                        $("#UserLeaderboardContent").css("display","block");
                        displayUserLeaderboard();
                    });

                    $("#UserDashboard").on('click', function () {
                        $("#HomeContent").css("display","none");
                        $("#UserProfileContent").css("display","none");
                        $("#UserDashboardContent").css("display","block");
                        $("#UserLeaderboardContent").css("display","none");
                     });

                     $("#BiologyCourse").on('click', function (e) {
                            e.stopPropagation();
                            $("#HomeContent").css("display","none");
                     	    $("#CoursePage").css("display","block");
                     	    getChapters();
                     });
});

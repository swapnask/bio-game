var pickedup;
var chapterId;
$(document).ready(
				function() {
				getUserDetails();
                $("#logout").on('click', function() {
                    var playerId = window.globalVar;
                	$.ajax({
                		type : "POST",
                	    url : "/gameeduapp/logout/" + playerId,
                		success : function(success, status, xhr) {
                			window.globalVar = undefined;
                		    $('#alertModal .modal-title').text("Message");
                			$('#alertModalContent').text("You are sucessfully logged out!");
                			$('#alertModal').modal('show');
                			$('#alertModal').on('hide.bs.modal', function (e) {
                				window.location.href='web';
                			});
                		},
                		error : function(error, status) {
                						 	}
                	});

                });

                 $(function(){
                      $("#includedContent").load("b.html");
                    });

                    //Fetches user details from the Server
                    				function getUserDetails (){
                    					$.ajax({
                    						type : "GET",
                    						url : "/gameeduapp/currentPlayer",
                    						success : function(data) {
                                              // console.log(data)
                    							window.globalVar = data;
                    							console.log(window.globalVar);
                    							 $(".game-tab-content").load("landing");
                    							$("#UserProfileContent").css("display","none");
                                               $("#UserDashboardContent").css("display","none");
                                               $("#UserLeaderboardContent").css("display","none");
                                               $("#HomeContent").css("display","block");
                                               setUserDetails();

                    						},
                    						error : function(error, status) {
                    							console.log("error:", error);
                    						}
                    					});
                    				}

                    				function setUserDetails() {

                                    	if (window.globalVar == undefined) {
                                    		console.log("Redirecting");
                                    		window.location.href = 'web';

                                    	}else{
                                    		document.getElementById("displayUserlabel").innerHTML= 'Username :';
                                    		document.getElementById("displayUser").innerHTML= window.globalVar;

                                    	}

                                    }


                    $("#UserProfile").on('click', function() {
                        $(".game-tab-content").load("profile");
//                        $("#playernametxt").val(window.globalVar)
//                    	$("#UserProfileContent").css("display","block");
//                    	 $("#HomeContent").css("display","none");
//                         $("#UserDashboardContent").css("display","none");
//                         $("#UserLeaderboardContent").css("display","none");
                    });

                     $("#Home").on('click', function() {
                        $(".game-tab-content").load("landing");
//                          $("#HomeContent").css("display","block");
//                          $("#UserProfileContent").css("display","none");
//                          $("#UserDashboardContent").css("display","none");
//                          $("#UserLeaderboardContent").css("display","none");
                     });

                    $("#UserLeaderboard").on('click', function () {
                    $(".game-tab-content").load("leaderboard");
                        displayUserLeaderboard();
                    });

                    $("#UserDashboard").on('click', function () {
                        $(".game-tab-content").load("dashboard");
                        displayUserDashboard();
                     });

                     $("#BiologyCourse").on('click', function (e) {
                        $(".game-tab-content").load("course");
                     	    fetchChapters();
                     });

                     $("#Questions").on('click', function (e) {
                           e.stopPropagation();
                           fetchQuestions(window.selectedChapterId);


                    });

                     $("#ChaptersResult:has(td)").mouseover(function(e) {
                        $(this).css("cursor", "pointer");
                     });

                     $("#ChaptersResult:has(td)").click(function(e) {
                        $("#ChaptersResult td").removeClass("highlight");
                        var clickedCell= $(e.target).closest("td");
                        console.log(clickedCell.text());

                        //alert('Clicked table cell value is: ' + clickedCell.text());
                        getChapterModel(clickedCell.text());
                     });

                     function fetchChapters() {
                     		$.ajax({
                     			type : "GET",
                     			url : "/gameeduapp/chapters",
                     			success : function(data, status, xhr) {
                     				console.log("success:", data);
                     				var html = '';
                     				$("#ChaptersResult tbody tr").remove();
                     				if(data.length == 0){
                     					html += '<tr><td>' + "-" +
                     					'</td></tr>';
                     					$("#ChaptersResult tbody").append(html);
                     				}
                     				else {
                                          for(var i = 0; i < data.length ; i++){
                                             html += '<tr><td>' +
                                             data[i].chapterName +
                                             '</td></tr>';
                                          }
                                          $("#ChaptersResult tbody").append(html);

                     				}

                     			},
                     			error : function(error, status, xhr) {
                     				console.log(error);
                     			},
                     			dataType : "json",
                     			contentType : 'application/json'
                     		});

                     }


                     function getChapterModel(chapterName)
                     {

                        $.ajax({
                            type : "GET",
                            url : "/gameeduapp/chaptermodel/" + chapterName,
                            success : function(data, status, xhr) {
                               console.log("success:", data);
                               $("#ChapterPage").css("display","block");
                               displayChapterDetails(data.chapterId, data.chapterName, data.conceptText, data.link);
                            },
                            error : function(error, status, xhr) {
                                    console.log(error);
                             },
                        dataType : "json",
                        contentType : 'application/json'
                    });
                 }

                 function displayChapterDetails(chapterId, chapterName, chapterText, chapterLink)
                 {
                        $("#CoursePage").css("display","none");
                        window.selectedChapterId = chapterId;
                        chapterId = chapterId;
                        document.getElementById("headerTxt").innerHTML= chapterName;
                        document.getElementById("chapterTxt").innerHTML= chapterText;

                 }


});

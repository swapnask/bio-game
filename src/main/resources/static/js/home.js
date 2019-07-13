var pickedup;
var chapterId;
$(document).ready(
    function () {
        getUserDetails();
        $("#logout").on('click', function () {
            var playerId = window.globalVar;
            $.ajax({
                type: "POST",
                url: "/gameeduapp/logout/" + playerId,
                success: function (success, status, xhr) {
                    window.globalVar = undefined;
                    $('#alertModal .modal-title').text("Message");
                    $('#alertModalContent').text("You are sucessfully logged out!");
                    $('#alertModal').modal('show');
                    $('#alertModal').on('hide.bs.modal', function (e) {
                        window.location.href = 'web';
                    });
                },
                error: function (error, status) {
                }
            });

        });

        //Fetches user details from the Server
        function getUserDetails() {
            $.ajax({
                type: "GET",
                url: "/gameeduapp/currentPlayer",
                success: function (data) {
                    // console.log(data)
                    window.globalVar = data;
                    console.log(window.globalVar);
                    $(".game-tab-content").load("landing", function () {
                        $("#BiologyCourse").on('click', function (e) {
                            $(".game-tab-content").load("course", function () {
                                fetchChapters();
                            });
                        });
                    });
                    setUserDetails();

                },
                error: function (error, status) {
                    console.log("error:", error);
                }
            });
        }

        function setUserDetails() {

            if (window.globalVar == undefined) {
                console.log("Redirecting");
                window.location.href = 'web';

            } else {
                document.getElementById("displayUserlabel").innerHTML = 'Username :';
                document.getElementById("displayUser").innerHTML = window.globalVar;

            }

        }


        $("#UserProfile").on('click', function () {
            $(".game-tab-content").load("profile", function () {
                initUserProfile();
            });

        });

        $("#Home").on('click', function () {
            $(".game-tab-content").load("landing", function () {
                $("#BiologyCourse").on('click', function (e) {
                    $(".game-tab-content").load("course", function () {
                        fetchChapters();

                    });
                });
            });
        });

        $("#UserLeaderboard").on('click', function () {
            $(".game-tab-content").load("leaderboard", function () {
                displayUserLeaderboard();
            });

        });

        $("#UserDashboard").on('click', function () {
            $(".game-tab-content").load("dashboard", function () {
                displayUserDashboard();
            });

        });




    });

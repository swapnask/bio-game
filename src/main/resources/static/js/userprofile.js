//$(document).ready(function() {

function initUserProfile() {
    $("#playernametxt").val(window.globalVar)

    $("#UpdateProfile").on('click', function () {

        var selected_proficiency = 0;
        console.log(window.globalVar);

        var playerid = $("#playernametxt").val();
        var proficiency = $("#proficiencyDropDown").find(":selected").text();

        var arr = {"BEGINNER": 0, "INTERMEDIATE": 1, "EXPERT": 2};
        for (var key in arr) {
            if (key == proficiency) {
                selected_proficiency = arr[key];
                console.log(selected_proficiency);
            }
        }


        var dataObject = {
            "proficiency": selected_proficiency
        };

        $.ajax({
            type: "PUT",
            url: "/gameeduapp/player/" + playerid,
            data: JSON.stringify(dataObject),
            success: function (success, status, xhr) {
                if (success) {
                    alert("Your profile has been updated");
                } else {
                    alert("Error updating your profile details");
                }
            },
            error: function (error, status) {

            },
            dataType: "json",
            contentType: 'application/json'
        });

    });
}


//});

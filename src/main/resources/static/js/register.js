$(document).ready(
    function () {
        $("#Register").on('click', function () {
            var player_id = $("#player_id").val();
            var password = $("#password").val();
            var confirmpassword = $("#confirmpassword").val();
            var firstName = $("#firstname").val();
            var lastName = $("#lastname").val();

            //var playerId = makeid(3);

            var dataObject = {
                "playerId": player_id,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "proficiency": "BEGINNER"
            };
            var fields = ["playerId", "password", "firstName", "lastName", "proficiency"];

            var result = validateObjectFields(dataObject, fields);
            console.log(result);
            if (result.fieldsMissing == true) {
                toastr.warning(result.msg);
            } else if (confirmpassword !== password) {
                toastr.warning("Passwords do not match!");
            } else if (isNumeric(firstName)) {
                toastr.warning("First name cannot contain digits.");
            } else if (isNumeric(lastName)) {
                toastr.warning("Last name cannot contain digits.");
            } else {
                console.log(JSON.stringify(dataObject));
                $.ajax({
                    type: "POST",
                    url: "/gameeduapp/register",
                    data: JSON.stringify(dataObject),
                    success: function (success, status, xhr) {
                        toastr.success("Successfully registered");
                        window.location.href = 'web';
                    },
                    error: function (error, status) {
                        toastr.error("Failed to register: "+ error);
                        console.log(error);
                    },
                    contentType: 'application/json'
                });
            }
        });
        $("#Cancel").on('click', function () {
            window.location.href = 'web';
        });

    });
99
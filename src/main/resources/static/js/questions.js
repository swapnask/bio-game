var dataVar = [];
var iteratorVar = 0;
var attempts = 0;

function initQuestions() {
    $("#Questions").on('click', function (e) {
       addEventhandlers();
    });
}

function addEventhandlers() {
    $("#NextLevel").hide();
    $("#TryAgain").hide();
    $(".game-tab-content").load("questions", function () {
        fetchQuestions(window.selectedChapterId);
        $("#CheckAnswer").click(function () {
            checkAnswer();
        });
    });
}

function fetchQuestions(chapterId) {
    if (window.globalVar == undefined) {
        window.location.href = 'web';
    }
    var chapter_Id = window.selectedChapterId;
    var playerId = window.globalVar;
    $.ajax({
        type: "GET",
        url: "gameeduapp/question?chapterId=" + chapter_Id + "&playerId=" + playerId,
        success: function (data, status, xhr) {

            if(data.length != 0) {
                document.getElementById("questionsHeaderTxt").innerHTML = 'Science -> Biology ->' + data[0].chapter.chapterName + '-> Questions';
                dataVar = data;
                setQuestionData(data);
            } else {
                toastr.info("Successfully completed all questions sets of this chapter! Please start with different chapter.");
                $(".game-tab-content").load("course", function () {
                    fetchChapters();
                });
            }
        },
        error: function (error, status, xhr) {
            console.log(error);
        },
        dataType: "json",
        contentType: 'application/json'
    });

}

function setQuestionData(data) {

    if(data.length > iteratorVar) {
        document.getElementById("QuestionText").innerHTML = data[iteratorVar].questionId + '. ' + dataVar[iteratorVar].questionText;
        document.getElementById("QuestionNumber").innerHTML = 'Question ' + dataVar[iteratorVar].questionId;
        console.log(dataVar);
        var optionsHTML = "<label><input type='radio' name='option' value=" + data[iteratorVar].optionList[0].optionText + ">" + data[iteratorVar].optionList[0].optionText + "</label><br>" +
            "<label><input type='radio' name='option' value=" + data[iteratorVar].optionList[1].optionText + ">" + data[iteratorVar].optionList[1].optionText + "</label><br>" +
            "<label><input type='radio' name='option' value=" + data[iteratorVar].optionList[2].optionText + ">" + data[iteratorVar].optionList[2].optionText + "</label><br>" +
            "<label><input type='radio' name='option' value=" + data[iteratorVar].optionList[3].optionText + ">" + data[iteratorVar].optionList[3].optionText + "</label><br>";
        var optionList = $("#optionList");

        optionList.append(optionsHTML);
    } else {
        $("#QuestionNumber").text("");
        $("#QuestionText").text("Done with Question Set! ");
        $("#CheckAnswer").hide();
        finishGame();
    }

}

function finishGame() {

    iteratorVar=0;
    $.ajax({
        type: "POST",
        url: "gameeduapp/endGame?playerId="+ window.globalVar,
        success: function (data, status, xhr) {
            if(!data.currentLevelComplete) {
                $("#TryAgain").show();
                toastr.warning("Level not completed. Please try again.");
                $("#TryAgain").click(function (event) {
                    $(".game-tab-content").load("questions", function () {
                        addEventhandlers();
                    })
                });

            } else {
                $("#NextLevel").show();
                toastr.success("Badge " + badgeMap[data.currentLevel] + " earned successfully! Click Next Level to go to the next Game!");
                $("#NextLevel").click(function (event) {

                    $(".game-tab-content").load("questions", function () {
                        addEventhandlers();
                    })
                });
            }
        },
        error: function (error, status, xhr) {
            toastr.error("Oops! Something went wrong, try again!");
            console.log(error);
        },
        dataType: "json",
        contentType: 'application/json'
    });


}

function checkAnswer() {

    var answer= $("input[name='option']:checked").val();

    var dataObject = {
        questionId: dataVar[iteratorVar].questionId,
        playerId: window.globalVar,
        answer: answer,
        attemptNo: attempts
    };

    attempts++;

    $.ajax({
        type: "POST",
        url: "gameeduapp/checkAnswer",
        data: JSON.stringify(dataObject),
        success: function (data, status, xhr) {
            console.log("success:", data);
            if(data) {
                toastr.success("Congratulations! Correct Answer!");
                $("#optionList").empty();
                iteratorVar++;
                setQuestionData(dataVar);
                attempts =0;
            } else if(attempts >= 2){
                toastr.error("Oops! Incorrect Answer! Used up all attempts to answer the question.");
                toastr.info("Correct Answer is: " + dataVar[iteratorVar].answer);
                $("#optionList").empty();
                iteratorVar++;
                setQuestionData(dataVar);
            } else {
                toastr.error("Oops! Incorrect Answer, try again!");
            }
        },
        error: function (error, status, xhr) {
            toastr.error("Oops! Something went wrong, try again!");
            console.log(error);
        },
        dataType: "json",
        contentType: 'application/json'
    });
}


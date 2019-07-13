var dataVar = [];
var iteratorVar = 0;

function initQuestions() {
    $("#Questions").on('click', function (e) {

        $(".game-tab-content").load("questions", function () {
            fetchQuestions(window.selectedChapterId);
            $("#CheckAnswer").click(function () {
                checkAnswer();
            });
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
            console.log("success:", data);
            document.getElementById("questionsHeaderTxt").innerHTML = 'Science -> Biology ->' + data[0].chapter.chapterName + '-> Questions';

            // for (var i = 0; i < data.length; i++) {
            //     dataVar.push(data[i]);
            // }
            dataVar = data;
            setQuestionData(data);
            // document.getElementById("chapterTxt").innerHTML= chapterText;
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
        $("#NextLevel").show();
    }

}

function checkAnswer() {

    var answer= $("input[name='option']:checked").val();

    var dataObject = {
        questionId: dataVar[iteratorVar].questionId,
        playerId: window.globalVar,
        answer: answer
    };

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


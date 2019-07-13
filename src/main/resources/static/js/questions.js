var dataVar = [];
var iteratorVar = 0;
function fetchQuestions(chapterId) {
		 if(window.globalVar == undefined){
		 	window.location.href = 'web';
		 }
		 var chapter_Id = window.selectedChapterId;
		 var playerId = window.globalVar;
		$.ajax({
			type : "GET",
			url : "gameeduapp/question?chapterId=" + chapter_Id + "&playerId=" + playerId,
			success : function(data, status, xhr) {
				console.log("success:", data);
                document.getElementById("questionsHeaderTxt").innerHTML= 'Science -> Biology ->' + data[0].chapter.chapterName + '-> Questions';

                for(var i = 0; i < data.length; i ++)
                    {
                        dataVar.push(data[i]);
                    }
                       setQuestionData(data);
               // document.getElementById("chapterTxt").innerHTML= chapterText;
			},
			error : function(error, status, xhr) {
				console.log(error);
			},
			dataType : "json",
			contentType : 'application/json'
		});

}
function setQuestionData(data)
{

    document.getElementById("QuestionNumber").innerHTML= dataVar[iteratorVar].questionId + '. ' + dataVar[iteratorVar].questionText;
    console.log(dataVar);
    var optionsHTML = "<label><input type='radio' value="+dataVar[iteratorVar].optionList[0].optionText+">" + dataVar[iteratorVar].optionList[0].optionText+"</label><br>" +
                      "<label><input type='radio' value="+dataVar[iteratorVar].optionList[1].optionText+">" + dataVar[iteratorVar].optionList[1].optionText+"</label><br>" +
                      "<label><input type='radio' value="+dataVar[iteratorVar].optionList[2].optionText+">" + dataVar[iteratorVar].optionList[2].optionText+"</label><br>" +
                      "<label><input type='radio' value="+dataVar[iteratorVar].optionList[3].optionText+">" + dataVar[iteratorVar].optionList[3].optionText+"</label><br>";
    var optionList = $("#optionList");

    optionList.append(optionsHTML);
//    var option = dataVar[0].optionList[0].optionText;
//    //$("input[name=option][value=" + option + "]").prop('checked', true);
//    document.getElementById("option1").innerHTML = option;
//    $("input[name=option]").val([dataVar[0].optionList[0].optionText]);

    $("#NextQuestion").click(function() {
        $("#optionList").empty();
        setQuestionData(data);
        iteratorVar++;
    });

}


function fetchChapters() {
    $.ajax({
        type: "GET",
        url: "/gameeduapp/chapters",
        success: function (data, status, xhr) {
            console.log("success:", data);
            var html = '';
            $("#ChaptersResult tbody tr").remove();
            if (data.length == 0) {
                html += '<tr><td>' + "-" +
                    '</td></tr>';
                $("#ChaptersResult tbody").append(html);
            } else {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' +
                        data[i].chapterName +
                        '</td></tr>';
                }
                $("#ChaptersResult tbody").append(html);

            }
            $("#ChaptersResult:has(td)").mouseover(function (e) {
                $(this).css("cursor", "pointer");
            });

            $("#ChaptersResult:has(td)").click(function (e) {
                $("#ChaptersResult td").removeClass("highlight");
                var clickedCell = $(e.target).closest("td");
                console.log(clickedCell.text());

                //alert('Clicked table cell value is: ' + clickedCell.text());
                getChapterModel(clickedCell.text());
            });

        },
        error: function (error, status, xhr) {
            console.log(error);
        },
        dataType: "json",
        contentType: 'application/json'
    });

}


function getChapterModel(chapterName) {

    $.ajax({
        type: "GET",
        url: "/gameeduapp/chaptermodel/" + chapterName,
        success: function (data, status, xhr) {
            console.log("success:", data);
            $("#ChapterPage").css("display", "block");
            displayChapterDetails(data.chapterId, data.chapterName, data.conceptText, data.link);
        },
        error: function (error, status, xhr) {
            console.log(error);
        },
        dataType: "json",
        contentType: 'application/json'
    });
}

function displayChapterDetails(chapterId, chapterName, chapterText, chapterLink) {
    $(".game-tab-content").load("chapters", function () {
        window.selectedChapterId = chapterId;
        chapterId = chapterId;
        document.getElementById("headerTxt").innerHTML = chapterName;
        document.getElementById("chapterTxt").innerHTML = chapterText;
        initQuestions();
    })


}
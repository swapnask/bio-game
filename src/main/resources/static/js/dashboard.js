//var num_correct_ans = 0;
//var num_incorrect_ans = 0;
function drawChart(num_correct_ans, num_incorrect_ans) {
      var data = google.visualization.arrayToDataTable([
      ['Task', 'Number'],
      ['Number of Correct Answers', num_correct_ans],
      ['Number of Incorrect Answers', num_incorrect_ans]
    ]);

      var options = {'title':'My Progress', 'width':650, 'height':400};

      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }

function displayUserDashboard() {
		 if(window.globalVar == undefined){
		 	window.location.href = 'web';
		 }
		var playerId = window.globalVar;
		$.ajax({
			type : "GET",
			url : "/gameeduapp/leaderboard/player/" + playerId,
			success : function(data, status, xhr) {
			    var count = 0;
			    if(data[0].badgeList.length == 0){
			        count = 0;
			    }
			    else {
			        count = data[0].badgeList.length;
			    }
				console.log("success:", data);
				$("#playername").val(data[0].playerName);
				$("#rating").val(data[0].rating);
				$("#proficiency").val(data[0].proficiency);
				$("#level").val(data[0].level);
				$("#numbadgesearned").val(data[0].badgeList)
				var num_correct_ans = data[0].correctAns;
				var num_incorrect_ans = data[0].incorrectAns;
				if(num_correct_ans > 0 && num_incorrect_ans > 0) {
				    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart(num_correct_ans, num_incorrect_ans));
                }
                else {
                    $('#piechart').hide();
                }
			},
			error : function(error, status, xhr) {
				console.log(error);
			},
			dataType : "json",
			contentType : 'application/json'
		});

}
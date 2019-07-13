function displayUserLeaderboard() {
		// if(window.globalVar == undefined){
		// 	window.location.href = 'web';
		// }
		$.ajax({
			type : "GET",
			url : "/gameeduapp/leaderboard/player",
			success : function(data, status, xhr) {
				console.log("success:", data);
				var html = '';
				$("#UserLeaderboardResult tbody tr").remove();
				if(data.length == 0){
					html += '<tr><td>' + "-" +
					'</td><td>' + "-" +
					'</td><td>' + "-" +
					'</td><td>' + "-" +
					'</td><td>' + "-" +
					'</td><td>' + "-" +
					'</td></tr>';
					$("#UserLeaderboardResult tbody").append(html);
				}
				else {
				      var playerId = window.globalVar;
                     for(var i = 0; i < data.length ; i++){
                        if(playerId == data[i].playerId){
                            continue;
                        }
                        html += '<tr><td>' + data[i].playerId +
                        					'</td><td>' + data[i].playerName +
                        					'</td><td>' + data[i].proficiency +
                        					'</td><td>' + data[i].rating +
                        					'</td><td>' + data[i].level +
                        					'</td><td>' + data[i].badgeList.count +
                        					'</td></tr>';
                     }
                     $("#UserLeaderboardResult tbody").append(html);

				}

			},
			error : function(error, status, xhr) {
				console.log(error);
			},
			dataType : "json",
			contentType : 'application/json'
		});

}
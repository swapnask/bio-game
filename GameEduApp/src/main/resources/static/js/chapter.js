
function tdclick(event){
    console.log('td clicked');
    event.stopPropagation()
}

function getChapters() {
		// if(window.globalVar == undefined){
		// 	window.location.href = 'web';
		// }
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
                        html += '<tr><td>' + data[i].chapterName + onclick='tdclick(event);'
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

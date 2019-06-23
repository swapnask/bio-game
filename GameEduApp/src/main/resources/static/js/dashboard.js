$(window).on('load', function() {

     google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);
});

function drawChart() {
       var num_correct_ans = 10;
       var num_incorrect_ans = 20;
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

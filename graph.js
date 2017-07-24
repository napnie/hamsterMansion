$(document).ready(function() {
	var link = "http://158.108.165.223/data/OACEED/"
	var $hamster = $('#hamStatus')
    var inCage = "Yes"
    var outCage = "No"

    function send(value, variable = "") {
        console.log(link + variable + (variable ? "/" : "") + "set/" + value)
        $.ajax({
            url: link + variable + (variable ? "/" : "") + "set/" + value
        }).done(function () {

        })
	}
	
	var howTemp = function() {
        var $temp = $('#tempBar')
        var chart = new CanvasJS.Chart("chartContainer", {

      title:{
        text: "Fruits sold in First Quarter"              
      },
      data: [//array of dataSeries              
        { //dataSeries object

         /*** Change type "column" to "bar", "area", "line" or "pie"***/
         type: "column",
         dataPoints: [
         { label: "banana", y: 18 },
         { label: "orange", y: 29 },
         { label: "apple", y: 40 },                                    
         { label: "mango", y: 34 },
         { label: "grape", y: 24 }
         ]
       }
       ]
     });

    chart.render();
  }

    $.ajax({
            url: link + "Temperature"
        }).done(function (data) {
            // range of temp bar is 12 - 30 ,width 18
            var percent = ((data-12)/18)*100

            $temp.css("width", percent+"%")
            removeColor()
            if(data < 18) {
                $temp.text("Too cold")
                $temp.addClass("progress-bar-info")
            } else if(data < 29) {
                $temp.text("Comfortable")
                $temp.addClass("progress-bar-success")
            } else {
                $temp.text("Too hot")
                $temp.addClass("progress-bar-warning")
            }
        })
    }
)


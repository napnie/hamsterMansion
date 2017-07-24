$(document).ready(function () {
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

    var lure = function() {
        send(1, "Lure")
        while ($hamster.text() == outCage) {
            await(3000)
            howHam()
        }
        send(0, "Lure")
    }

    var howHam = function () {
        $.ajax({
            url: link + "deathORalive"
        }).done(function (data) {
            if (data == 1) {
                $hamster.text(outCage)
                lure()
            }
            else {
                $hamster.text(inCage)
            }
        })
    }

    var howMoisture = function() {
        var $mois = $('#moisPercent')
        $.ajax({
            url: link + "Moisture"
        }).done(function (data) {
            $mois.text(data)
        })
    }

    var howFood = function() {
        var $food = $('#foodBar')
        var max = 5
        var min = 100
        var range = min - max

        $.ajax({
            url: link + "Food"
        }).done(function (data) {

            var percent = ( (data - min)/range ) * 100

            $food.css("width", percent+"%")
            $food.text(percent+"%")
        })
    }

    var howTemp = function() {
        var $temp = $('#tempBar')
        var removeColor = function() {
            $temp.removeClass("progress-bar-success")
            $temp.removeClass("progress-bar-info")
            $temp.removeClass("progress-bar-warning")
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

    $('#lure').click(lure() )

    setInterval(function () {
        howHam()
        howMoisture()
        howFood()
        howTemp()
    }, 5000)
})
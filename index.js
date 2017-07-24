$(document).ready(function () {
    /** Server for Hamster Mansion */
    var link = "http://158.108.165.223/data/OACEED/"
    /** DOM object for Hamster status */
    var $hamster = $('#hamStatus')
    var inCage = "Yes"
    var outCage = "No"
    /** Status of luring system */
    var luring = false
    var audio = new Audio('./sfx/alert.mp3')

    function send(value, variable = "") {
        console.log(link + variable + (variable ? "/" : "") + "set/" + value)
        $.ajax({
            url: link + variable + (variable ? "/" : "") + "set/" + value
        }).done(function () {

        })
    }

    var isLureStop = function() {
        if (luring && $hamster.text() == inCage) { // It make sure so that when luring system is off, it won't bother the server
            send(0, "Lure")
            luring = false
            audio.pause()
        }
    }

    var howHam = function () {
        $.ajax({
            url: link + "deathORalive"
        }).done(function (data) {
            if (data == 1) {
                $hamster.text(outCage)
                send(1, "Lure")
                luring = true
                audio.play()
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
        var max = 6
        var min = 0
        var range = max - min

        $.ajax({
            url: link + "Food"
        }).done(function (data) {

            var percent = ( data/range ) * 100

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

    $('#lure').click(function() {
        send(1, "Lure")
    } )

    setInterval(function () {
        howHam()
        howMoisture()
        howFood()
        howTemp()
        isLureStop()
    }, 5000)
})
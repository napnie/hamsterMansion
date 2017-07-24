$(document).ready(function () {
    /** Server for Hamster Mansion */
    var link = "http://158.108.165.223/data/OACEED/"
    /** DOM object for Hamster status */
    var $hamster = $('#hamStatus')
    var inCage = "Yes"
    var outCage = "No"
    /** Status of luring system */
    var luring = false
    var lureStatus = false
    var audio = new Audio('./sfx/alert.mp3')

    function send(value, variable = "") {
        console.log(link + variable + (variable ? "/" : "") + "set/" + value)
        $.ajax({
            url: link + variable + (variable ? "/" : "") + "set/" + value
        }).done(function () {

        })
    }

    var isLureStop = function() {
        if (!luring && lureStatus && $hamster.text() == inCage ) { // It make sure so that when luring system is off, it won't bother the server
            send(0, "Lure")
            lureStatus = false
            luring = false
            audio.pause()
        }
    }

    var howHam = function () {
        $.ajax({
            url: link + "deathORalive"
        }).done(function (data) {
            console.log("Status "+ data)
            if (data == 1 && !lureStatus) {
                $hamster.text(outCage)
                send(1, "Lure")
                lureStatus = true
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
        var max = 0
        var min = 6
        var range = min - max

        $.ajax({
            url: link + "Food"
        }).done(function (data) {
            console.log("food "+data)
            var percent = ( (min - data)/range ) * 100

            $food.css("width", percent+"%")
            $food.text(percent+"%")
        })
    }

    var howTemp = function() {
        var $temp = $('#tempBar')
        var removeColor = function() {
            $temp.removeClass("bar-hot")
            $temp.removeClass("bar-comfort")
            $temp.removeClass("bar-cold")
        }

        $.ajax({
            url: link + "Temperature"
        }).done(function (data) {
            // range of temp bar is 12 - 30 ,width 18
            var percent = ((data-12)/18)*100
            console.log("Temp "+data)

            $temp.css("width", percent+"%")
            removeColor()
            if(data < 18) {
                $temp.text("TOO COLD "+data+"°C")
                $temp.addClass("bar-cold")
            } else if(data < 29) {
                $temp.text("COMFORTABLE "+data+"°C")
                $temp.addClass("bar-comfort")
            } else {
                $temp.text("TOO HOT "+data+"°C")
                $temp.addClass("bar-hot")
            }
        })
    }

    $('#lure').click(function() {
        if(lureStatus) {
            send(0, "Lure")
            lureStatus = false
            luring = false
        } else {
            send(1, "Lure")
            lureStatus = true
            luring = true
        }
        
    } )

    setInterval(function () {
        howHam()
        howMoisture()
        howFood()
        howTemp()
        isLureStop()
    }, 5000)
})

function setFood(value) {
    $('#foodBar').css("width", value+"%")
    $('#foodBar').text(value+"%")
}
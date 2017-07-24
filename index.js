$(document).ready(function () {
    var link = "http://158.108.165.223/data/OACEED/"

    function send(value, variable = "") {
        console.log(link + variable + (variable ? "/" : "") + "set/" + value)
        $.ajax({
            url: link + variable + (variable ? "/" : "") + "set/" + value
        }).done(function () {

        })
    }

    var howHam = function () {
        var $hamster = $('#hamStatus')
        $.ajax({
            url: link + "deathORalive"
        }).done(function (data) {
            console.log(data)
            if (data == 1) {
                $hamster.text("Yes")
            }
            else {
                $hamster.text("No")
            }
        })
    }

    $('#hamStatus').click(function () {
        var $hamster = $(this)
        if ($hamster.text() == "Yes") $hamster.text("No")
        else $hamster.text("Yes")
    })

    $('#lure').click(function () {
        send(1, "Lure")
        while ($hamster.text() != "Yes") {
            await(3000)
            howHam()
        }
        send(0, "Lure")
    })

    setInterval(function () {
        var hamStatus
        howHam()
    }, 5000)
})
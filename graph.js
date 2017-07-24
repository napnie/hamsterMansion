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
})

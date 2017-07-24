$(document).ready(function() {
    var link = "http://158.108.165.223/data/OACEED/"

    $('#hamStatus').click(function() {
        var $hamster = $(this)
        if($hamster.text() == "Yes") $hamster.text("No")
        else $hamster.text("Yes")
    })

    function receive(variable, anwer) {

    }

    setInterval(function() {
        
    }, 5000)
})
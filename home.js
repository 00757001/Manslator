jQuery(document).ready(function() {
    localStorage.clear()
    $('#btn').click(function() {
        $('#modal').modal({
            fadeDuration: 1000,
            fadeDelay: 0.50,
        });
    });

    $('#info').click(function() {
        $('#modal2').modal({
            fadeDuration: 1000,
            fadeDelay: 0.50
        });
    });

    $("#btn4").click(function() {
        $('#modal3').modal({
            fadeDuration: 1000,
            fadeDelay: 0.50
        });
    });

    $('#modal').on(
        function() {
            $('#iceman').show();
            $('#jeangrey').show();
            $('#wolverine').show();
            $('#woman').show();
        }
    )


    $("#btn1").click(
        function() {
            location = '../Load_Page/Load_Page1.html'
        }
    );
    $("#btn2").click(
        function() {
            location = '../Load_Page/Load_Page2.html'
        }
    );
    $("#btn3").click(
        function() {
            location = '../Load_Page/Load_Page3.html'
        }
    );
});
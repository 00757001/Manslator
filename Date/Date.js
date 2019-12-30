$(document).ready(function() {
    //-------background----------------------
    $('body').autoBackgroundScroll({
        speed: 0.3,
        direction1: 'bottom',
        direction2: 'right',
        imageWidth: 2000,
        imageHeight: 2000
    });
    //----------------localStroage-------------
    if ("count" in localStorage) {
        localStorage['count'] = parseInt(localStorage['count']) + 1;
    } else {
        localStorage.setItem("count", 1);
        localStorage.setItem("stage", "");
        localStorage.setItem("credit", 1);
    }
    if (localStorage['count'] == 1) $('#clickstart').html("點擊任意處開始第一關...");
    else if (localStorage['count'] == 2) $('#clickstart').html("點擊任意處開始第二關...");
    else if (localStorage['count'] == 3) $('#clickstart').html("點擊任意處開始第三關...");
    //---------------getJson-----------------
    var choice;
    var answer;
    $.getJSON("https://api.myjson.com/bins/pybls", function(result) {
        $.each(result, function(i, field) {
            stageArray = localStorage['stage'].split('');
            choice = Math.floor(Math.random() * field.length);
            while (stageArray.includes(choice.toString())) {
                choice = Math.floor(Math.random() * field.length);
            }
            localStorage['stage'] += choice.toString();
            $('#c1').html(field[choice][0]);
            $('#c2').html(field[choice][1]);
            $('#c3').html(field[choice][2]);
            $('#c4').html(field[choice][3]);
            $('#c5').html(field[choice][4]);
            $('#q_text').html(field[choice][5])
            $('#A').html(field[choice][6]);
            $('#B').html(field[choice][7]);
            $('#C').html(field[choice][8]);
            answer = field[choice][9];
            console.log(answer);
        });
    });
    //credit
    $('html').one("click", function() {
        $('#clickstart').hide("fade", "fast");
        //---------------chat_part--------------------------
        var current = 1000;
        var speed = 3000;
        console.log($('#c1').html());
        if ($('#c1').html() != "EOF") {
            $("#mes1").delay(current).show('slide', 2000, function() {
                $("#w1").show("fade", "fast", function() {
                    window.setTimeout(function() {
                        $("#w1").hide("fade", "fast");
                        $("#c1").show("slide");
                    }, 2000);
                });
            });
            current += speed;
        }
        $("#mes2").delay(current).show('slide', { direction: "right" }, 2000, function() {
            $("#w2").show("fade", "fast", function() {
                window.setTimeout(function() {
                    $("#w2").hide("fade", "fast");
                    $("#c2").show("slide", { direction: "right" });
                }, 1500);
            });
        });
        current += speed;
        $("#mes3").delay(current).show('slide', 2000, function() {
            $("#w3").show("fade", "fast", function() {
                window.setTimeout(function() {
                    $("#w3").hide("fade", "fast");
                    $("#c3").show("slide");
                }, 1500);
            });
        });
        current += speed;
        $("#mes4").delay(current).show('slide', { direction: "right" }, 2000, function() {
            $("#w4").show("fade", "fast", function() {
                window.setTimeout(function() {
                    $("#w4").hide("fade", "fast");
                    $("#c4").show("slide", { direction: "right" });
                }, 1500);
            });
        });
        current += speed;
        $("#mes5").delay(current).show('slide', 2000, function() {
            $("#w5").show("fade", "fast", function() {
                window.setTimeout(function() {
                    $("#w5").hide("fade", "fast");
                    $("#c5").show("slide");
                }, 1500);
            });
        });
        current += 4000;
        $('#div_chat').delay(current).animate({ "left": "-=15%" }, "slow", function() {
            $('#question').toggle("fold", 1000, function() {
                $('.select').toggle("fold", 1000);
                window.setTimeout(function() {
                    $('#div_manslator').show("shake", "slow");
                }, 2500);
            });
        });
        var click = 0;
        $('#manslator').click(function() {
            if (localStorage['credit'] > 0) {
                $('.title').show("fade");
                $('.barras').show("fade");
                localStorage['credit']--;
                $('.barra-nivel').each(function() {
                    var valorLargura = $(this).data('nivel');
                    $(this).animate({
                        width: valorLargura
                    });
                });
                window.setTimeout(function() {
                    $('.title').text("翻譯成功");
                }, 3000)
                var right = '#' + answer;
                $(right).delay(3500).effect("bounce", "slow");
                $(right).animate({ fontSize: "x-large" }, 1000);
            } else if (click < 3) {
                click++;
                $("#modal4").modal({});
            } else if (click > 0) {
                $("#modal5").modal({});
            }
        });

        $('.select').click(function() {
            var choose = $(this).children(":first").attr('id');
            if (choose == 'A') $('#c6').html($('#A').html());
            else if (choose == 'B') $('#c6').html($('#B').html());
            else if (choose == 'C') $('#c6').html($('#C').html());
            //console.log(choose);
            $('.select').hide("fold", 1000);
            $('#question').hide("fold", 1000);
            $('#div_chat').delay(1500).animate({ "left": "+=15%" }, "slow", function() {
                $("#mes6").delay(1500).show('slide', { direction: "right" }, 1000, function() {
                    $("#w6").show("fade", "fast", function() {
                        window.setTimeout(function() {
                            $("#w6").hide("fade", "fast");
                            $("#c6").show("slide", { direction: "right" });
                            window.setTimeout(function() {
                                if (choose == answer && localStorage['count'] != 3) { //json answer
                                    $('#modal1').modal({
                                        fadeDuration: 1000,
                                        fadeDelay: 0.50
                                    });
                                    window.setTimeout(function() { window.location.reload(); }, 2500);
                                } else if (choose == answer && localStorage['count'] == 3) { //json answer
                                    $('#modal3').modal({
                                        fadeDuration: 1000,
                                        fadeDelay: 0.50
                                    });
                                    window.setTimeout(
                                        function() {
                                            $('#firework2').show();
                                        }, 1000
                                    )
                                    window.setTimeout(function() {
                                        $('#superman').show("fade", "slow", 2000);
                                    }, 3000);
                                    window.setTimeout(function() { window.history.go(-2); }, 6000);
                                } else {
                                    $('#modal2').modal({
                                        fadeDuration: 1000,
                                        fadeDelay: 0.50
                                    });
                                    window.setTimeout(function() { window.history.go(-2); }, 3000);
                                }
                            }, 1000);
                        }, 1500);
                    });
                });
            });
        });
    });
});

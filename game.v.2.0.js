$(document).ready(function () {

    var walls = [
        '             ',
        ' ## ## ## ## ',
        ' #         # ',
        '   ## # ##   ',
        ' #    #    # ',
        ' # ## # ## # ',
        '   #     #   ',
        ' #   ###   # ',
        ' # #     # # ',
        '   ## # ##   ',
        ' #         # ',
        ' ## ## ## ## ',
        '             '
    ];
    var score = 0;
    var gameIntervalId;
    var eggsIntervalId;
    var $app = $('#app');
    var $board = createBoard();
    $app.append($board);

    var $pacManPosition = $('.table > div:nth-child(7) > div').eq(6);
    createPacMan($pacManPosition);


    $('#start-button').click(play);
    $('#restart-button').click(play);

    function range(size) {
        return Array.from({length: size})
    }


    function createBoard() {
        return $('<div>').addClass('table').append(
            walls.map(function (wall) {
                return $('<div>').append(wall.split('').map(function (segment) {
                    return $('<div>').addClass(segment === '#' ? 'wall' : 'dots')
                }))
            })
        );
    }

    // function drawEggStartingPosition() {
    //     return $('.table div:first div').eq(
    //         Math.floor(Math.random() * size)
    //     )
    // }

    function createPacMan($node) {
        $node.addClass('pacMan')
    }


    // function createEgg($node) {
    //     $node.addClass('egg')
    // }

    function moveEggs() {
        $('.egg').each(function () {
            $(this)
                .removeClass('egg')
                .parent()
                .next()
                .find('div')
                .eq($(this).index())
                .addClass('egg')
        })
    }


    function movePacManRight() {
        var $currentNode = $('.pacMan');
        var $targetNode = $currentNode.next();

        if ($targetNode.length === 0 || $targetNode.hasClass('wall')) {
            // skip
        } else {
            $currentNode.removeClass('pacMan');
            $targetNode.addClass('pacMan');
        }
    }

    function movePacManLeft() {
        var $currentNode = $('.pacMan');
        var $targetNode = $currentNode.prev();

        if ($targetNode.length === 0 || $targetNode.hasClass('wall')) {
            // skip
        } else {
            $currentNode.removeClass('pacMan');
            $targetNode.addClass('pacMan');
        }
    }

    function movePacManUp() {
        var $currentNode = $('.pacMan');
        var $targetNode = $($currentNode.parent().prev().children()[$currentNode.index()]);

        if ($targetNode.length === 0 || $targetNode.hasClass('wall')) {
            // skip
        } else {
            $currentNode.removeClass('pacMan');
            $targetNode.addClass('pacMan');
        }
    }

    function movePacManDown() {
        var $currentNode = $('.pacMan');
        var $targetNode = $($currentNode.parent().next().children()[$currentNode.index()]);

        if ($targetNode.length === 0 || $targetNode.hasClass('wall')) {
            // skip
        } else {
            $currentNode.removeClass('pacMan');
            $targetNode.addClass('pacMan');
        }
    }


    function detectCatch() {
        var $consumptionNode = $('div.pacMan.dots');
        if ($consumptionNode.length === 1) {
            $consumptionNode.removeClass('dots');
            updateScore(1);
        }
        ;

        if ($('.pacMan.dots').length > 0) {
            $('.pacMan.dots').removeClass('dots');

        }
    }

    function updateScore(delta) {
        score += delta;
        $('#score').text(score);
    }

    function play() {
        $(window).off('keydown keyup');
        score = 0;
        updateScore(0);
        $(window).on('keyup', function (event) {
            // console.log(event.keyCode, event.key);

            switch (event.keyCode) {
                case 39:
                    movePacManRight();
                    break;

                case 37:
                    movePacManLeft();
                    break;

                case 38:
                    movePacManUp();
                    break;

                case 40:
                    movePacManDown();
                    break;
            }
            detectCatch();
        });

        $(window).on('keydown', function (event) {
            event.preventDefault();
        })
    }

    gameIntervalId = setInterval(function () {
        // moveEggs();
        detectCatch();
    }, 300)

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
                clearInterval(interval);
                $('.start-screen, .play-screen').hide();
                $('.end-screen').show().css('display', 'flex');
                $('header h1').html('Fajna gra? Spróbuj jeszcze raz!');
                $('div.thanks').append('Super! Twój wynik to ' + $(updateScore()));
            }

        }, 1000);

    }


    window.onload = function () {
        var fiveMinutes = 60 * 0.1,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    };



});
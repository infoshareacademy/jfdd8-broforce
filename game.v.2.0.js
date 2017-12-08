$(document).ready(function () {
    var size = 10;
    var gameIntervalId;
    var eggsIntervalId;
    var $app = $('#app');
    var $board = createBoard();
    $app.append($board);

    var $pacManPosition = $('.table > div:last > div').eq(4);
    createBasket($pacManPosition);

    play();

    function range(size) {
        return Array.from({ length: size })
    }

    function createBoard() {
        return $('<div>').addClass('table').append(
            range(size).map(function () {
                return $('<div>').append(range(size).map(function () {
                    return $('<div>')
                }))
            })
        );
    }

    // function drawEggStartingPosition() {
    //     return $('.table div:first div').eq(
    //         Math.floor(Math.random() * size)
    //     )
    // }

    function createBasket($node) {
        $node.addClass('basket')
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
        $('.pacMan').removeClass('pacMan').next().addClass('pacMan');
    }

    function movePacManLeft() {
        $('.pacMan').removeClass('pacMan').prev().addClass('pacMan');
    }

    function movePacManUp() {
        $('.pacMan').removeClass('pacMan').parent().prev().find('div').eq($(this).index()).addClass('pacMan');
    }

    function movePacManDown() {
        $('.pacMan').removeClass('pacMan').parent().next().find('div') .eq($(this).index()).addClass('pacMan');
    }

    function detectCatch() {
        if ($('.pacMan.egg').length > 0) {
            console.log('CATCHED!')
        }
    }

    function play() {
        $(window).on('keyup', function (event) {
            // console.log(event.keyCode);
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
            detectCatch()
        });

        gameIntervalId = setInterval(function () {
            moveEggs();
            detectCatch();
        }, 300);

        // eggsIntervalId = setInterval(function () {
        //     var $eggPosition = drawEggStartingPosition();
        //     createEgg($eggPosition);
        // }, 500);
    }
})
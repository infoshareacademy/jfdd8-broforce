$(document).ready(function () {
    var size = 11;
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

    var gameIntervalId;
    var eggsIntervalId;
    var $app = $('#app');
    var $board = createBoard();
    $app.append($board);

    var $pacManPosition = $('.table > div:nth-child(7) > div').eq(6);
    createPacMan($pacManPosition);
    createDots();

    play();

    function range(size) {
        return Array.from({ length: size })
    }


    function createBoard() {
        return $('<div>').addClass('table').append(
            walls.map(function (wall) {
                return $('<div>').append(wall.split('').map(function (segment) {
                    return $('<div>').addClass(segment === '#' ? 'wall' : null)
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

    function createDots() {
        walls.filter(function (wall) {
            return wall.class === wall ? null : $('walls').addClass('dots');
            // return $('wall.*:contains("#")') ? null : $('walls').addClass('dots');
        })


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
        if ($('.pacMan.egg').length > 0) {
            console.log('CATCHED!')
        }
    }

    function play() {
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
            detectCatch()
        })
    }

        gameIntervalId = setInterval(function () {
            moveEggs();
            detectCatch();
        }, 300)

        // eggsIntervalId = setInterval(function () {
        //     var $eggPosition = drawEggStartingPosition();
        //     createEgg($eggPosition);
        // }, 500);

});
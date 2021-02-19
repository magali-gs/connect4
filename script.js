(function game() {
    var currentPlayer = "player1";
    var board = $("#board");
    var allSlots = board.find(".slot");
    var col = $(".column");
    var messageField = $(".winner-field");
    var messageContainer = $(".message");
    var overlay = $(".overlay");
    var winner = false;
    var round = 0;
    var player1 = 0;
    var player2 = 0;
    var currentPlayerField = $(".field-player");
    var btnNewGame = $(".btn-newGame");
    var btnReload = $(".btn-reset");
    var roundFiled = $(".field-counter");
    var player1Field = $(".field-player1");
    var player2Field = $(".field-player2");


    //find the lowest empty slot
    col.on("click", function (e) {
        var slotsInColumn = $(e.currentTarget).children();

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                // foundEmptySlot = true;
                break;
            }
        }

        // Check if the column is full
        if (i == -1) {
            console.log("no empty slot, try again!");
            return;
        }
        
        // Check for victory
        if (checkForVictory(slotsInColumn)) {
            // player won in column
            winner = true;
            victoryMessage();
            return;
        } else {
            var slotsInRow = $(".row" + i);
            if (checkForVictory(slotsInRow)) {
                // player won in row
                winner = true;
                victoryMessage();
                return;
            } else {
                // player won in diagonal
                checkDiagonalVictory();
            }
        }

        //Show the current player time
        if (currentPlayer == "player1") {
            currentPlayerField.css({
                backgroundColor: "lightpink",
            });
        } else {
            currentPlayerField.css({
                backgroundColor: "lightblue",
            });
        }

        switchPlayers();
    });

    //Check for victory
    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    // winner!!!
                    return true;
                }
            } else {
                count = 0;
                
            }
        }
    }

    function checkDiagonalVictory() {
        var arrayDiagonal = [
            //24
            [2, 9, 16, 23],
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41],
            [12, 19, 26, 33],
            [19, 26, 33, 40],
            [18, 25, 32, 39],
            [38, 33, 28, 23],
            [37, 32, 27, 22],
            [32, 27, 22, 17],
            [36, 31, 26, 21],
            [31, 26, 21, 16],
            [26, 21, 16, 11],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [20, 15, 10, 5],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [18, 13, 8, 3]
        ];
        for (var i = 0; i < arrayDiagonal.length; i++) {
            if (
                allSlots.eq(arrayDiagonal[i][0]).hasClass(currentPlayer) &&
                allSlots.eq(arrayDiagonal[i][1]).hasClass(currentPlayer) &&
                allSlots.eq(arrayDiagonal[i][2]).hasClass(currentPlayer) &&
                allSlots.eq(arrayDiagonal[i][3]).hasClass(currentPlayer)
            ) {
                winner = true;
                victoryMessage();
                return true;
            }
        }
    }

    //Keep track of the current player
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    //Message to announce the victory
    function victoryMessage () {
        var message = '<p>' + currentPlayer.toLocaleUpperCase() + " is the  winner! </p>";
        if(winner) {
            messageField.html(message);
            messageContainer.addClass("on");
            overlay.addClass("on");
        }
        //Set the score
        if (currentPlayer == 'player1') {
            player1++;
        } else {
            player2++;
        }
    }

    //Button that starts a new round
    btnNewGame.on("click", function () {
        round++;
        allSlots.removeClass("player1");
        allSlots.removeClass("player2");
        console.log("click", round);
        messageContainer.removeClass("on");
        overlay.removeClass("on");
        roundFiled.html('<p> Round ' + round + '</p>');
        player1Field.html("<p> Player 1 wins " + player1 + "</p>");
        player2Field.html("<p> Player 2 wins " + player2 + "</p>");
        
    });
    //Button that reload the game
    btnReload.on("click", function () {
        location.reload();
    });
})();
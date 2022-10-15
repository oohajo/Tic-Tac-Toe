window.onload = function () {
    game.init();
}


class Game {

    winningVariants = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    currentPlayer = 'X';

    init() {
        document.querySelectorAll(".cell").forEach(
            cell => cell.addEventListener('click', this.cellClickHandler)
        );

        document.getElementById("restart-game").addEventListener('click', () => this.restartGame());
    }

    initGame() {
        this.currentPlayer = "X";
        document.querySelectorAll(".cell").forEach(
            target => target.innerHTML = ""
        );
    }

    cellClickHandler = (e) => {
        this.playerTurn(e.target);
    };

    playerTurn(target) {
        if (target.innerHTML == 'X' || target.innerHTML == 'O') return;
        target.innerHTML = this.currentPlayer;

        this.currentPlayer = this.currentPlayer == 'X' ? "O" : "X";
        this.checkWinner();
    }

    checkWinner() {
        for (let i = 0; i < this.winningVariants.length; i++) {
            const variant = this.winningVariants[i];
            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if (a == "" || b == "" || c == "") continue;
            if (a == b && b == c) {

                if (a == 'X') {
                    this.setWinner("The winner is " + "'" + a + "'");
                } else {
                    this.setWinner("The winner is " + "'" + a + "'")
                }
            }
        }
    }

    setWinner(winnerName) {
        document.getElementById("winner").innerHTML = winnerName;
    }

    getCellValue = (i) => {
        return document.querySelector(`.cell[data-index='${i}']`).innerHTML;
    }

    restartGame() {
        this.initGame();
        document.getElementById("winner").innerHTML = "Let's Play!";
    }
}

const game = new Game();
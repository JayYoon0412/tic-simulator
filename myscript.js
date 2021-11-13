const game = (() => {
    "use strict";
    const board = document.getElementById("turn-board");
    let gameActive = true;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    function currentPlayerTurn() {
        if (!gameActive) return;
        return `${currentPlayer}'s Turn`;
    }
    function gameResult() {
        return `${currentPlayer} WON!`;
    }
    board.textContent = currentPlayerTurn();
    let wCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleClick(e) {
        const clickedSquare = e.target;
        const clickedSquareNumber = parseInt(clickedSquare.getAttribute("data-key"));
        if (gameBoard[clickedSquareNumber]!=""|| !gameActive) {
            return;
        }
        handleTurn(clickedSquare, clickedSquareNumber);
        checkStatus();
    }
    function handleTurn(clickedElement, clickedIndex) {
        clickedElement.textContent = currentPlayer;
        gameBoard[clickedIndex] = currentPlayer;
    }
    function checkStatus(){
        let gameWon = false;
        for (let i=0; i<8; i++) {
            let a = gameBoard[wCombination[i][0]];
            let b = gameBoard[wCombination[i][1]];
            let c = gameBoard[wCombination[i][2]];

            if (!a||!b||!c) continue;
            if (a===b&&b===c) {
                gameWon = true;
                break;
            }
        }
        if (gameWon) {
            board.textContent = gameResult();
            gameActive = false;
            return;
        }
        if (!gameBoard.includes("")){
            board.textContent = "IT IS A TIE!";
            gameActive = false;
            return;
        }
        changePlayer();
    }
    function changePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        board.textContent = currentPlayerTurn();
    }
    function restart() {
        document.querySelectorAll(".board-square").forEach(square => square.textContent="");
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        board.textContent = currentPlayerTurn();
    }
    return {handleClick, restart};
});

const tic = game();

document.querySelectorAll(".board-square").forEach(square => square.addEventListener("click", tic.handleClick));
document.getElementById("restart-game").addEventListener("click", tic.restart);
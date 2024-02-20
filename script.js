//eval, minmax fct
//localstorage
//contains

window.onload = () => {

    const btnRecommencer = document.getElementById('btn-recommencer');
    const btnCommencer = document.getElementById('btn-play');
    const btnPlay = document.getElementById('btn-play');
    const cellPlayerO = document.getElementById('cell-playerO');
    const cellPlayerX = document.getElementById('cell-playerX');

    let tour = 0;
    const PLAYER_X = 'X';
    const PLAYER_O = 'O';
    let player;
    let starter;
    let score = {
        playerX: 0,
        playerO: 0,
    }
    let won = false;
    let rows = document.querySelectorAll('.row');
    let cells = document.querySelectorAll('.cell');
    const victoryMessage = document.querySelector('#victory-message');

    // cells.forEach((cell, i) => {
    //     cell.innerText = '';
    // });

    function play(e) {
        if ((e.target.childNodes.length !== 0) || won === PLAYER_X || won === PLAYER_O) {
            return false;
        }

        tour++;
        console.log("Player : ", player, "Tour : ", tour);

        e.target.innerText = player;

        player = player == PLAYER_X ? PLAYER_O : PLAYER_X;
        let tableau = makeArray();

        //On vérifie quelles cells sont remplies (index)
        let filledTabCells = Array.from(cells).map((elem, i) => (elem.childNodes.length > 0 ? i : null)).filter(i => i !== null);

        //Vérification de la présence du gagnant et qui il est
        won = checkWinner(tableau);

        if (won === PLAYER_X || won === PLAYER_O) {
            victoryMessage.innerText = `Le joueur ${won} a gagné la partie !`;
        }
        else if (tour >= 9 && !won) {
            victoryMessage.innerHTML = 'Match nul.'
        }

        //MAJ Score
        won = updateScore(won);
    }

    function restartGame() {
        tour = 0;
        won = false;

        starter = getRandomNumber(2);
        starter = starter === 0 ? PLAYER_O : PLAYER_X;
        player = starter === PLAYER_O ? PLAYER_O : PLAYER_X;

        victoryMessage.innerHTML = `Le joueur ${starter} commence`;

        console.log(starter, ' commence le premier (O = Computer, X = Player)');

        cells.forEach((cell, i) => {
            cell.innerText = '';
        })
    }


    function startGame() {
        if (starter !== undefined || tour > 0) {
            return false;
        }
        btnCommencer.style.display = "none";
        tour = 0;

        starter = getRandomNumber(2);
        starter = starter === 0 ? PLAYER_O : PLAYER_X;
        player = starter === PLAYER_O ? PLAYER_O : PLAYER_X;

        console.log(starter, ' commence le premier (O = Computer, X = Player)');

        //MEssage règles
        victoryMessage.innerHTML = `Le joueur ${starter} commence le premier`;

        for (let i = 0; i <= cells.length - 1; i++) {
            let cell = cells[i];
            cell.addEventListener('click', play);
        }
    }


    function getRandomNumber(offset) {
        const nb = Math.floor(Math.random() * offset);
        return nb;
    }

    function checkWinner(tableau) {
        const rows = tableau.length;
        const cols = tableau[0].length;

        // We check the rows and columns
        //first we go througn the rows of the array, and we check lines/cols
        for (let i = 0; i < rows; i++) {
            if (checkLine(tableau[i]) || checkLine(tableau.map(row => row[i]))) {
                return tableau[i][i];
            }
        }

        // We check the two diagonals
        if (checkLine(tableau.map((row, i) => row[i]))) {
            return tableau[0][0];
        }
        if (checkLine(tableau.map((row, i) => row[cols - 1 - i]))) {
            return tableau[0][cols - 1];
        }

        return false;
    }

    //Vérifie si chaque cell de la ligne est égale a la 1e cellule
    function checkLine(line) {
        return line.every(cell => cell === line[0] && cell !== '');
    }

    function updateScore(won) {

        //MAJ Score
        if (won !== false) {
            if (won === PLAYER_X) {
                score.playerX += 1;
                cellPlayerX.innerText = score.playerX;
            }
            else {
                score.playerO += 1;
                cellPlayerO.innerText = score.playerO;
            }
            console.log('Score updaté, won = ', won);
            return won;
        }
        else {
            return false;
        }
    }

    function makeArray() {
        let tableau = [];
        rows.forEach((tabRow, i) => {
            let rowCells = tabRow.querySelectorAll('td');
            let tableauRow = [];

            rowCells.forEach((cell, j) => {
                tableauRow.push(cell.innerText);
            });
            tableau.push(tableauRow);
        });
        return tableau;
    }

    //Handlers

    btnPlay.addEventListener('click', startGame);

    btnRecommencer.addEventListener('click', restartGame);

    // btnPlay.addEventListener('click', (e) => {
    //     for (let i = 0; i <= cells.length - 1; i++) {
    //         let cell = cells[i];
    //         cell.addEventListener('click', play);
    //     }

    // });


}

// if (cell.innerText === PLAYER_X || cell.innerText === PLAYER_O)
//     if (cell.classList.contains('col1') || cell.classList.contains('col2') || cell.classList.contains('col3')) {
//         col += cell.innerText;
//     }
//     else if (cell.classList.contains('diagonale1') || cell.classList.contains('diagonale2')) {
//         diag += cell.innerText;
//     }
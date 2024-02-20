window.onload = () => {

    const cellPlayerO = document.getElementById('cell-playerO');
    const cellPlayerX = document.getElementById('cell-playerX');
    const restartButton = document.querySelector('#btn-recommencer');
    const btnCommencer = document.getElementById('btn-play');

    let tour = 0;
    let player;

    //Symbols X and O
    // let symbolX = new Image();
    // // symbolX.src = "assets/neon_x.webp";
    // symbolX.setAttribute('src', "assets/neon_x.webp");
    // symbolX.classList.add('symbol_x');

    // let symbolX = `<img src="assets/neon_x.webp" class="symbol_x" />`;
    // let symbolO = `<img src="assets/double_neon_o.png" class="symbol_o" />`;
    // let symbolO = new Image();
    // symbolX.src = "assets/double_neon_o.png";
    // symbolO.setAttribute('src', "assets/double_neon_o.png");
    // symbolO.classList.add('symbol_o');

    // const PLAYER_X = symbolX;

    // const PLAYER_O = symbolO;

    const PLAYER_X = 'X';
    const PLAYER_O = 'O';
    let starter;
    let score = {
        playerX: 0,
        playerO: 0,
    }
    let won = false;
    let rows = document.querySelectorAll('.row');
    let cells = document.querySelectorAll('.cell');
    const rulesParagraph = document.querySelector('#regles');

    // cells.forEach((cell, i) => {
    //     cell.innerText = '';
    // });

    function play(e) {
        if ((e.target.childNodes.length !== 0) || won === PLAYER_X || won === PLAYER_O || tour >= 9) {
            return false;
        }

        if (starter === PLAYER_X) {
            tour++;
        }

        // e.innerHTML = `Test ${symbolX}`;
        e.target.innerHTML = PLAYER_X;
        console.log("target : ", e.target);
        // e.target.innerHTML = PLAYER_X;

        player = PLAYER_X;

        console.log("Player : ", player, "Tour : ", tour);

        won = playerTurn(e);

        if (won === PLAYER_X) {
            // animateShip(normandy);
            return true;
        }

        else {
            player = PLAYER_O;
            rulesMessage(won);
            // won = false;
            //Essai ordinateur 
            computerTurn();
        }
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


    //Animation vaisseau
    // normandy.style.animationPlayState = 'running';
    // setTimeout(() => {
    //     normandy.style.animationPlayState = 'paused';
    //     normandy.style.transform = 'translateY(0) scale(1)';
    // }, 4000);
    function getRandomNumber(offset) {
        const nb = Math.floor(Math.random() * offset);
        return nb;
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

    function checkWinner(tableau) {
        const rows = tableau.length;
        const cols = tableau[0].length;

        // Check rows and columns
        for (let i = 0; i < rows; i++) {
            if (checkLine(tableau[i]) || checkLine(tableau.map(row => row[i]))) {
                return tableau[i][i];
            }
        }

        // Check diagonals
        if (checkLine(tableau.map((row, i) => row[i]))) {
            return tableau[0][0];
        }
        if (checkLine(tableau.map((row, i) => row[cols - 1 - i]))) {
            return tableau[0][cols - 1];
        }

        return false;
    }

    function checkLine(line) {
        return line.every(cell => cell === line[0] && cell !== '');
    }


    function playerTurn(e) {

        //Le symbole est placé dans la case cliquée
        e.target.innerText = PLAYER_X;
        // e.target.innerText = "<img src='assets/images/neon_x.webp class='symbol_x' />";

        // e.target.appendChild(symbolX);



        //Création array à partir du tableau de la page
        let tableau = makeArray();
        let filledTabCells = Array.from(cells).map((elem, i) => (elem.childNodes.length > 0 ? i : null)).filter(i => i !== null);

        won = checkWinner(tableau);

        if (won === PLAYER_X) {
            won = updateScore(won);
            // rulesParagraph.innerText = `Le joueur ${won} a gagné la partie !`;
            won = PLAYER_X;
            console.log("WON :", won);
            rulesMessage(won);
            return won;
        }
        else {
            won = false;
            return false;
        }
    }

    function computerTurn() {
        console.log("TOUR DE l'ORDINATEUR");
        if (starter === PLAYER_O) {
            tour++;
        }
        player = PLAYER_O;
        let filledTabCells = Array.from(cells).map((elem, i) => (elem.childNodes.length > 0 ? i : null)).filter(i => i !== null);
        let computerTry = getRandomNumber(9);

        if (filledTabCells.includes(computerTry)) {
            while (filledTabCells.includes(computerTry) && filledTabCells.length < 9) {
                computerTry = getRandomNumber(9);
            }
        }
        rulesMessage(won);

        setTimeout(() => {
            //L'ordinateur joue à la case trouvée aléatoirement
            cells[computerTry].innerText = PLAYER_O;
            // cells[computerTry].appendChild(symbolO);

            let newTableau = makeArray();

            won = checkWinner(newTableau);
            rulesMessage(won);

            //Arret partie si l'ordinateur a gagné
            if (!!won) {
                console.log('Le joueur ', won, ' a gagné.');
                won = updateScore(won);
                player = '';
                return true;

            }
            else if (tour >= 9 && !won) {
                console.log('Match nul');
                won = false;
                rulesMessage(won)
                rulesParagraph.innerText = 'Match nul.';
                return false;
            }
            else if (!won) {
                player = PLAYER_X;
                rulesMessage(won);
            }
        }, 800);

    }

    function rulesMessage(won) {
        //Message règles et informations
        if (tour < 1 && score.playerX === 0 && score.playerO === 0) {
            rulesParagraph.classList.remove('text-white');
        }
        if (tour < 1) {
            starter === PLAYER_X ? rulesParagraph.classList.add('text-green') : rulesParagraph.classList.add('text-red');
            rulesParagraph.innerHTML = `Le joueur <span id="first">${starter}</span> commence`;
        }

        if (tour <= 9 && won === false) {
            if (player === PLAYER_O) {
                rulesParagraph.className = '';
                rulesParagraph.classList.add('text-red');

                rulesParagraph.classList = "text-red";
                rulesParagraph.innerHTML = `<span id='first'>${player}</span> joue...`;
            }
            else {
                rulesParagraph.className = '';
                rulesParagraph.classList.add('text-green');
                rulesParagraph.innerHTML = `A  toi de jouer <span id='first'>${player}</span>`;
            }
        }

        if (won === PLAYER_O || (!won && tour >= 9)) {
            rulesParagraph.className = "text-red";

        }
        else if (won === PLAYER_X) {
            rulesParagraph.className = "text-green";
        }

        !!won ? rulesParagraph.innerText = `Le joueur ${won} a gagné la partie !` : 'Match nul';
    }


    function restartGame() {
        tour = 0;
        won = false;

        starter = getRandomNumber(2);
        starter = starter === 0 ? PLAYER_O : PLAYER_X;
        player = starter === PLAYER_O ? PLAYER_O : PLAYER_X;


        console.log(starter, ' commence le premier (O = Computer, X = Player)');
        //Message règles
        rulesMessage(won);

        cells.forEach((cell, i) => {
            cell.innerText = '';
        })

        if (starter === PLAYER_O) {
            tour++;
            computerTurn();
        }
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
        rulesMessage(won);

        if (starter === PLAYER_O) {
            tour++;
            computerTurn();
        }

        for (let i = 0; i <= cells.length - 1; i++) {
            let cell = cells[i];
            cell.addEventListener('click', play);
        }
    }

    function animateNormandy(ship) {
        ship.style.animationPlayState = 'running';
        setTimeout(() => {
            ship.style.animationPlayState = 'paused';
            ship.style.transform = 'translateY(0) scale(1)';
        }, 4000);
    }

    //Handlers


    btnCommencer.addEventListener('click', (e) => {
        startGame();
    });

    restartButton.addEventListener('click', (e) => {
        restartGame();
    });
}



// function init(e) {
//     tour = 0;
//     if (e.target.id === 'btn-play')
//         score = {
//             playerX: 0,
//             playerO: 0,
//         }
//     let won = false;

//     // Afficher vaisseau et moisonneur flottant
//     //Une fois joueur gagne

//     starter = getRandomNumber(2);
//     starter = starter === 0 ? PLAYER_O : PLAYER_X;

//     cells.forEach((cell, i) => {
//         cell.innerText = '';
//     });


//     // On ajoute des écouteurs d'évènement aux cellules de la grille
//     for (let i = 0; i <= cells.length - 1; i++) {
//         let cell = cells[i];
//         cell.addEventListener('click', play);
//     }

// }

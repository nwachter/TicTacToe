window.onload = () => {

    let container = document.getElementById('container');
    let ticTacToe = document.getElementById('tic-tac-toe');
    const btnUser = document.getElementById('btn-user');
    const btnComputer = document.getElementById('btn-computer');
    const image = document.getElementById('image-ttt');


    function fct(e) {
        if ((e.target.childNodes.length !== 0) || won === 'X' || won === 'O') {
            return false;
        }

        let row1, row2, row3 = '';
        let col1, col2, col3 = '';
        let diag1, diag2 = '';
        tour++;

        e.target.innerText = player;

        let rowTest, rowCells;
        let arr = [];

        let filledCells = Array.from(cells).filter((cell, i) => {
            cell.childNodes.length !== 0;
            console.log('Cell innerText ', i, ' : ', cell.innerText)
        })

        player = player == 'X' ? 'O' : 'X';
        let tableau = [];

        rows.forEach((tabRow, i) => {
            let row = '';
            let rowCells = tabRow.querySelectorAll('td');
            let tableauRow = [];

            rowCells.forEach((cell, j) => {
                tableauRow.push(cell.innerText);
            });

            tableau.push(tableauRow);

        });

        //Tableau
        console.log("Tableau : ", tableau);
        // tableau.forEach((tabRow, i) => {
        //     let row = '';
        //     tabRow.forEach((cell, j) => {

        //         if (cell === 'X' || cell === 'O') {
        //             console.log("Cell impossible undefined : ", cell);
        //             if (i === 0) {
        //                 row1 += cell;
        //                 if (j === 0) {
        //                     col1 += cell;
        //                     diag1 += cell;
        //                 }
        //                 else if (j === 1) {
        //                     col2 += cell;
        //                 }
        //                 else if (j === 2) {
        //                     col3 += cell;
        //                     diag2 += cell;
        //                 }
        //             }
        //             else if (i === 1) {
        //                 if (j === 0) {
        //                     col1 += cell;
        //                 }
        //                 else if (j === 1) {
        //                     col2 += cell;
        //                     diag1 += cell;
        //                     diag2 += cell;
        //                 }
        //                 else if (j === 2) {
        //                     col3 += cell;
        //                 }
        //             }
        //             else if (i === 2) {
        //                 if (j === 0) {
        //                     col1 += cell;
        //                     diag2 += cell;
        //                 }
        //                 else if (j === 1) {
        //                     col2 += cell;

        //                 }
        //                 else if (j === 2) {
        //                     col3 += cell;
        //                     diag1 += cell;
        //                 }
        //             }
        //         }

        //     });

        //     won = (row === 'XXX') ? 'X'
        //         : ((row === 'OOO') ? 'O' : false);

        //     if (i === 0) {
        //         row1 = row;
        //     }
        //     else if (i === 1) {
        //         row2 = row;
        //     }
        //     else if (i === 3) {
        //         row3 = row;
        //     }

        //     row = '';

        //     console.log(`Won : ${won}, col1 : ${col1}, col2 : ${col2}, diag1 : ${diag1}, diag2:  ${diag2} row1 ${row1} `);
        // });


        row1 = tableau[0][0] + tableau[0][1] + tableau[0][2];
        row2 = tableau[1][0] + tableau[1][1] + tableau[1][2];
        row3 = tableau[2][0] + tableau[2][1] + tableau[2][2];

        col1 = tableau[0][0] + tableau[1][0] + tableau[2][0];
        col2 = tableau[0][1] + tableau[1][1] + tableau[2][1];
        col3 = tableau[0][2] + tableau[1][2] + tableau[2][2];

        diag1 = tableau[0][0] + tableau[1][1] + tableau[2][2];
        diag2 = tableau[0][2] + tableau[1][1] + tableau[2][0];

        if ((row1 === 'XXX' || row2 === 'XXX' || row3 === 'XXX' || col1 === 'XXX' || col2 === 'XXX' || diag1 === 'XXX' || diag2 === 'XXX')) {
            won = 'X';
        }
        else if (row1 === 'OOO' || row2 === 'OOO' || row3 === 'OOO' || col1 === 'OOO' || col2 === 'OOO' || diag1 === 'OOO' || diag2 === 'OOO') {
            won = 'O';
        }

        if (tour >= 9 && !won) {
            alert('Match nul');
        }
        if (won === 'X' || won === 'O') {
            victoryMessage.innerText = `Le joueur ${won} a gagné la partie !`;
        }




    }

    btnUser.addEventListener('click', (e) => {

        let
    })



}

// COSTANT ELEMENTS FROM HTML 
// ---------------------------- 
// GLOBAL CONSTANTS I NEED
const main = document.querySelector('main');

const turnIconX = document.getElementsByClassName('x-rect_turn');
const turnIconO = document.querySelector('.o_circle_turn');

const winnerBanner = document.querySelector('.winner');
const announce = document.getElementById('announce');
const bannerHeader = document.getElementById('takesRound');
const grayButton = document.getElementById('quit');
const yellowButton = document.getElementById('next_round');

const x_form_winner = document.getElementsByClassName('x-rect_winner');
const o_form_winner = document.querySelector('.o_circle_winner');

const pieces = document.getElementsByClassName('piece');

const emptyPieces = document.getElementsByClassName('empty');

const tie_score = document.querySelector('.tie_counter');
const x_score = document.querySelector('.x_counter');
const o_score = document.querySelector('.o_counter');
// -------------------------------------------------------------
// GLOBAL VARIABLES FOR TRACK MOVEMENTS
let xTrack = 0;
let oTrack = 0;
let tieTrack = 0;

// სვლები
let move = 0;
let x_moves = [];
let o_moves = [];

//  არჩევანი - 0 თუ აირჩევს x-ს ან სინგლფლეიერს
let vsChoice = localStorage.getItem('vs');
let choice = localStorage.getItem('choice');





// ----------------------------------------
function gameStart(x) {
    localStorage.setItem('vs', x);
    window.location.href = 'game.html';
}
if (document.body.id == "game") {
    counterTexts();
}
const choose = function (x) {
    const chosen = document.getElementsByClassName('choose');
    const x_form = document.getElementsByClassName('x-rect');
    const o_form = document.querySelector('.o_circle');
    chosen[x].style.backgroundColor = '#A8BFC9';
    if (!x) {
        for (i of x_form) {
            i.style.backgroundColor = '#1A2A33';
        }
        chosen[1].style.backgroundColor = '';
        o_form.style.borderColor = '#A8BFC9';
    } else {
        chosen[0].style.backgroundColor = '';
        o_form.style.borderColor = '#1A2A33';
        for (j of x_form) {
            j.style.backgroundColor = '';
        }
    }
    localStorage.setItem('choice', x);
}
function counterTexts() {
    const x_score_text = document.getElementById('x_score_text');
    const o_score_text = document.getElementById('o_score_text');
    // console.log(vsChoice);
    // console.log(choice);
    if (vsChoice == 1) {
        if (choice == 1) {
            x_score_text.textContent = "X (P2)"
            o_score_text.textContent = "O (P1)"
        } else {
            x_score_text.textContent = "X (P1)"
            o_score_text.textContent = "O (P2)"
        }
    } else {
        if (choice == 1) {
            x_score_text.textContent = "X (CPU)"
            o_score_text.textContent = "O (YOU)"
        } else {
            x_score_text.textContent = "X (YOU)"
            o_score_text.textContent = "O (CPU)"
        }
    }
}



// Give pieces eventListeners
for (let piece of pieces) {
    piece.addEventListener("mouseover", event => {
        handleMouseOver(event.target);

    });
    piece.addEventListener("mouseout", event => {
        handleMouseOut(event.target);
    });
}


// ONCLICK FUNCTIONS -------------------

const quit = function () {
    // changeRestartButtonsBack();
    if (grayButton.textContent == "QUIT") {
        window.location.href = 'index.html';
    } else {
        changeBannerToDefault();
        for (let empty of emptyPieces) empty.disabled = false;
    }
}
const nextRound = () => {
    resetBoard();
    changeBannerToDefault();
    if (vsChoice == 0 && choice == 1) {
        cupChoose(emptyPieces);
    }
}
const restartArrow = () => {
    tieAndRestart('RESTART GAME ?');
    changeRestartButtons();
    for (let empty of emptyPieces) empty.disabled = true;
}
// Function for Board Pieces ( Main One )
const forScore = function (button, row, column) {
    const pieceId = Number(button.id);
    let lala;
    if (move % 2 == 0) {
        button.classList.add('x_move');
        x_moves.push({
            id: pieceId,
            type: 'x'
        });
        lala = 0;
    } else {
        button.classList.add("o_move");
        o_moves.push({
            id: pieceId,
            type: 'o'
        });
        lala = 1;
    }
    button.classList.remove('empty');
    move++;
    button.disabled = true;
    let win = (checkWin(pieceId, row, column, (lala == 0) ? x_moves : o_moves));
    if (win) {
        // console.log('amit qna');
        let winner = win[0].type;
        whoTakes(winner)
        updateScores(winner);
        // console.log(win[0].type)
        // console.log("MOIGO");
    } else if (move == 9) {
        tieAndRestart('ROUND TIED');
        updateScores('tie');
    }
    if (vsChoice == 0 && !win) {
        // console.log(vsChoice);
        // const emptyPieces = document.getElementsByClassName('empty');
        // console.log(emptyPieces);
        cupChoose(emptyPieces);
    }
    changeTurnIcon();
}
//  AI 
function cupChoose(array) {
    // console.log(array);
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    let ranId = Number(randomElement.id);
    // console.log(randomElement);
    if (choice == 1) {
        randomElement.classList.add('x_move');
        // console.log(button.classList);
        x_moves.push({
            id: ranId,
            type: 'x'
        });
        // console.log(x_moves);
        // lala = 0;
    } else {
        randomElement.classList.add("o_move");
        // console.log(randomElement.classList);
        o_moves.push({
            id: ranId,
            type: 'o'
        });
        // lala = 1;
        // console.log(o_moves);
    }
    randomElement.classList.remove('empty');
    // console.log(randomElement);
    move++;
    randomElement.disabled = true;
    let row = Number(randomElement.dataset.row)
    let col = ranId % 3;

    // console.log(row, col);

    let win2 = (checkWin(ranId, row, col, (choice == 1) ? x_moves : o_moves));
    if (win2) {
        // console.log('imit qna');
        let winner = win2[0].type;
        whoTakes(winner)
        updateScores(winner);
        // console.log(win[0].type)
        // console.log("MOIGO");
    } else if (move == 9) {
        tieAndRestart('ROUND TIED');
        updateScores('tie');
    }
    // console.log(array);
}

//  HELPFULL FUNCTIONS 
const updateScores = (x) => {
    switch (x) {
        case 'x':
            xTrack++;
            x_score.textContent = xTrack;
            break;
        case 'o':
            oTrack++;
            o_score.textContent = oTrack;
            break;
        default:
            tieTrack++;
            tie_score.textContent = tieTrack;
            break;
    }
    // console.log(emptyPieces);
    for (let empty of emptyPieces) empty.disabled = true;
}

const checkWin = function (m, a, b, which) {
    if (check(a, (+3), (-3), m, which)) return which;
    if (check(b, (+1), (-1), m, which)) return which;
    if (checkDiagonal(m, a, b, which)) return which;
    return false;
}
const checkComponent = function (y, f, which, mult, m, w, t) {
    for (let i = y, z = 1; f ? i > 0 : i < 2; f ? i-- : i++, z++) {
        m = which.find(x => x.id == (t + mult * z));
        if (m) w.push(m);
    }
}
const check = function (dir, i, d, m, which) {
    let winMove = [];
    let ragacMove;
    checkComponent(dir, true, which, d, ragacMove, winMove, m);
    checkComponent(dir, false, which, i, ragacMove, winMove, m);
    if (winMove.length == 2) {
        return true;
    }
    return false;
}

const innerFunction = function (x, which, b, a, c, v) {
    if (b == c && a == v) {
        let ragacMove;
        ragacMove = which.find(y => y.id == x);
        // console.log(ragacMove);
        if (ragacMove) return true;
    }
}

const checkDiagonal = function (m, a, b, which) {
    if (which.find(x => x.id == (4))) {
        // console.log("ipova shuaxazi");
        if (m != 4) {
            if (innerFunction(8, which, b, a, 0, 0)) return true;
            if (innerFunction(2, which, b, a, 0, 2)) return true;
            if (innerFunction(6, which, b, a, 2, 0)) return true;
            if (innerFunction(0, which, b, a, 2, 2)) return true;
        } else {
            let esIyos1 = (which.find(x => x.id == 0) && which.find(x => x.id == 8));
            let esIyos2 = (which.find(x => x.id == 2) && which.find(x => x.id == 6));
            if (esIyos1 || esIyos2) return true;
        }
    }
    return false;
}

const handleMouseOver = x => {
    if (move % 2 == 0) {
        x.classList.add("x_move_hover");
    } else {
        x.classList.add("o_move_hover");
    }
};
const handleMouseOut = x => {
    if (move % 2 == 0) {
        x.classList.remove("x_move_hover");
    } else {
        x.classList.remove("o_move_hover");
    }
}
// ---------------------------------
if (vsChoice == 0 && choice == 1) {
    cupChoose(emptyPieces);
}
// RESTART BUTTON ONCLICK 


const tieAndRestart = function (string) {
    main.classList.add('main_after');
    announce.style.display = 'none';
    winnerBanner.style.display = 'flex';
    bannerHeader.textContent = string;
    bannerHeader.style.color = '#A8BFC9';
    bannerHeader.style.marginLeft = '0px';
}

const changeBannerToDefault = function () {
    winnerBanner.style.display = 'none';
    main.classList.remove('main_after');
    for (i of x_form_winner) {
        i.style.removeProperty('display');
    }
    o_form_winner.style.removeProperty('display');
    announce.style.removeProperty('display');
    bannerHeader.textContent = 'TAKES THE ROUND';
    bannerHeader.style.removeProperty('color');
    bannerHeader.style.marginLeft = '';

    grayButton.textContent = 'QUIT';
    yellowButton.textContent = 'NEXT ROUND';
    grayButton.style.removeProperty("width");
    yellowButton.style.removeProperty("width");
}
const changeRestartButtons = function () {
    grayButton.textContent = 'NO, CANCEL';
    grayButton.style.width = '139px';

    yellowButton.textContent = 'YES, RESTART';
    yellowButton.style.width = '151px';
}
const announceText = function (you) {
    if (vsChoice == 1) {
        if (choice == you) {
            announce.textContent = 'PLAYER 1 WINS!';
        } else {
            announce.textContent = 'PLAYER 2 WINS!';
        }
    } else {
        if (choice == you) {
            announce.textContent = "YOU WON!";
        } else {
            announce.textContent = "OH NO, YOU LOST…";
        }
    }
}
const whoTakes = (player) => {
    winnerBanner.style.display = 'flex';
    if (player == 'x') {
        for (i of x_form_winner) {
            i.style.display = 'block';
            bannerHeader.style.color = '#31C3BD';
            // announce.textContent = 'YOU WON!';
        }
        announceText(0);
    } else {
        o_form_winner.style.display = 'block';
        bannerHeader.style.color = '';
        // announce.textContent = 'OH NO, YOU LOST…';
        announceText(1);
    }
}
const resetBoard = () => {
    for (let x of x_moves) {
        document.getElementById(x.id).classList.value = 'piece empty';
        document.getElementById(x.id).disabled = false;
    }
    for (let o of o_moves) {
        document.getElementById(o.id).classList.value = 'piece empty';
        document.getElementById(o.id).disabled = false;
    }
    move = 0;
    x_moves = [];
    o_moves = [];
    for (let piece of pieces) piece.disabled = false;
    move = 0;
    changeTurnIcon();
}
const changeTurnIcon = () => {
    if (move % 2 == 0) {
        for (let x of turnIconX) {
            x.style.display = '';
        }
        turnIconO.style.display = '';
    } else {
        for (let x of turnIconX) {
            x.style.display = 'none';
        }
        turnIconO.style.display = 'block';
    }
}


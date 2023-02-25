function gameStart() {
    window.location.href = 'game.html';
}
let choice;
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
    choice = x;
}


let move = 0;
const pieces = document.getElementsByClassName('piece');


for (let piece of pieces) {
    piece.addEventListener("mouseover", event => {
        handleMouseOver(event.target);

    });
    piece.addEventListener("mouseout", event => {
        handleMouseOut(event.target);
    });
}

let scores = 0;
let x_moves = [];
let o_moves = [];

const forScore = function (button, row, column) {
    const pieceId = Number(button.id);
    let lala;
    if (move % 2 == 0) {
        button.classList.add("x_move");
        x_moves.push({
            id: pieceId
        });
        lala = 0;
    } else {
        button.classList.add("o_move");
        o_moves.push({
            id: pieceId
        });
        lala = 1;
    }
    move++;

    button.disabled = true;
    if (checkWin(pieceId, row, column, (lala == 0) ? x_moves : o_moves)) {
        console.log("AI AMAN MOIGO");
    };
}

const checkWin = function (m, a, b, which) {
    if (check(a, (+3), (-3), m, which)) return true;
    if (check(b, (+1), (-1), m, which)) return true;
    if (checkDiagonal(m, a, b, which)) return true;
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

const x_form_winner = document.getElementsByClassName('x-rect_winner');
const o_form_winner = document.querySelector('.o_circle_winner');
// RESTART BUTTON ONCLICK 
const restartArrow = function () {
    const main = document.querySelector('main');
    main.classList.add('main_after');
    const winnerBanner = document.querySelector('.winner');
    const announce = document.getElementById('announce');
    announce.style.display = 'none';
    winnerBanner.style.display = 'flex';
    for (i of x_form_winner) {
        i.style.display = 'none';
    }
    o_form_winner.style.display = 'none';
    const bannerHeader = document.getElementById('takesRound');
    bannerHeader.textContent = 'RESTART GAME?';
    bannerHeader.style.color = '#A8BFC9';
    bannerHeader.style.marginLeft = '0px';

    changeRestartButtons();

}
const changeBannerToDefault = function () {
    const winnerBanner = document.querySelector('.winner');
    winnerBanner.style.display = 'none';
    const main = document.querySelector('main');
    main.classList.remove('main_after');
    for (i of x_form_winner) {
        // i.style.display = 'none';
        i.style.removeProperty('display');
    }
    o_form_winner.style.removeProperty('display');
    const announce = document.getElementById('announce');
    announce.style.removeProperty('display');
    const bannerHeader = document.getElementById('takesRound');
    bannerHeader.textContent = 'TAKES THE ROUND';
    bannerHeader.style.removeProperty('color');
    bannerHeader.style.marginLeft = '';
}
const changeRestartButtons = function () {
    const grayButton = document.getElementById('quit');
    const yellowButton = document.getElementById('next_round');
    grayButton.textContent = 'NO, CANCEL';
    grayButton.style.width = '139px';

    yellowButton.textContent = 'YES, RESTART';
    yellowButton.style.width = '151px';
}
const changeRestartButtonsBack = function () {
    const grayButton = document.getElementById('quit');
    const yellowButton = document.getElementById('next_round');
    grayButton.textContent = 'QUIT';
    yellowButton.textContent = 'NEXT ROUND';
    grayButton.style.removeProperty("width");
    yellowButton.style.removeProperty("width");
    changeBannerToDefault();
}
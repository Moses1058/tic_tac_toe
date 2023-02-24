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
    piece.addEventListener('mouseover', function () {
        if (move % 2 == 0) {
            piece.classList.add("x_move_hover");
        } else {
            piece.classList.add("o_move_hover");
        }
    });
    piece.addEventListener('mouseout', function () {
        if (move % 2 == 0) {
            piece.classList.remove("x_move_hover");
        } else {
            piece.classList.remove("o_move_hover");
        }
    });
    piece.addEventListener('click', function () {
        if (move % 2 == 0) {
            piece.classList.add("x_move");
        } else {
            piece.classList.add("o_move");
        }
        move++;
    });
}

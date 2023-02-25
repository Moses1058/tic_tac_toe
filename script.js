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

// const handleMouseOut = function (x) {
//     if (move % 2 == 0) {
//         x.classList.add("x_move_hover");
//     } else {
//         x.classList.add("o_move_hover");
//     }
// }
// const handleMouseOver = function (x) {
//     if (move % 2 == 0) {
//         x.classList.remove("x_move_hover");
//     } else {
//         x.classList.remove("o_move_hover");
//     }
// }

for (let piece of pieces) {
    piece.addEventListener("mouseover", event => {
        handleMouseOver(event.target);

    });
    piece.addEventListener("mouseout", event => {
        handleMouseOut(event.target);
    });
    // piece.addEventListener("click", event => {
    //     const clickedButton = event.target;
    //     if (move % 2 == 0) {
    //         piece.classList.add("x_move");
    //     } else {
    //         piece.classList.add("o_move");
    //     }
    //     move++;
    //     clickedButton.removeEventListener("mouseover", handleMouseOver);
    //     clickedButton.removeEventListener("mouseout", handleMouseOut);
    // });
}


let scores = 0;
let x_moves = [];
let o_moves = [];
const forScore = function (button, a, b) {
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
    // button.removeEventListener("mouseover", handleMouseOver);
    // button.removeEventListener("mouseout", handleMouseOut);
    button.disabled = true;
    // console.log(move);
    // console.log(x_moves, o_moves);

    // const books = [
    //     { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    //     { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    //     { title: '1984', author: 'George Orwell' }
    // ];

    // const book = books.find(book => book.title === 'The Great Gatsby');
    // console.log(book); // { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
    // if (checkWin(pieceId, a, b, (lala == 0) ? x_moves : o_moves)) {
    //     console.log("HAHAHAAA MOVIGEEE")
    // }
    if (checkWin(pieceId, a, b, (lala == 0) ? x_moves : o_moves)) {
        console.log("AI AMAN MOIGO");
    };
    // console.log(x_moves);
}

const checkWin = function (m, a, b, which) {
    // check vertical 
    // console.log(m, a, b, which);
    if (checkVer(m, a, b, which)) return true;
    if (checkHor(m, a, b, which)) return true;
    if (checkDiagonal(m, a, b, which)) return true;
    return false;
    // if (a != 0) {
    //     ragacMove = which.find(x => x.id == (m - 3));
    //     console.log(ragacMove);
    // }
    // if (a != 2) {
    //     ragacMove = which.find(x => x.id == (m + 3));
    //     console.log(ragacMove);
    // }

}

const checkVer = function (m, a, b, which) {
    let winMove = [];
    let ragacMove;
    for (let l = a, z = 1; l > 0; l--, z++) {
        ragacMove = which.find(x => x.id == (m - 3 * z));
        // console.log(ragacMove);
        if (ragacMove) winMove.push(ragacMove);
    }
    for (let g = a, v = 1; g < 2; g++, v++) {
        ragacMove = which.find(x => x.id == (m + 3 * v));
        // console.log(ragacMove);
        if (ragacMove) winMove.push(ragacMove);
    }
    if (winMove.length == 2) {
        return true;
    }
    return false;
}

const checkHor = function (m, a, b, which) {
    let winMove = [];
    let ragacMove;
    for (let l = b, z = 1; l > 0; l--, z++) {
        ragacMove = which.find(x => x.id == (m - 1 * z));
        // console.log(ragacMove);
        if (ragacMove) winMove.push(ragacMove);
    }
    for (let g = b, v = 1; g < 2; g++, v++) {
        ragacMove = which.find(x => x.id == (m + 1 * v));
        // console.log(ragacMove);
        if (ragacMove) winMove.push(ragacMove);
    }
    if (winMove.length == 2) {
        return true;
    }
    return false;
}

const checkDiagonal = function (m, a, b, which) {
    let winMove = [];
    let ragacMove;

    if (which.find(x => x.id == (4))) {
        // console.log("ipova shuaxazi");
        if (m != 4) {
            if (b == 0) {
                if (a == 0) {
                    ragacMove = which.find(x => x.id == 8);
                    // console.log(ragacMove);
                    if (ragacMove) return true;
                }
                if (a == 2) {
                    ragacMove = which.find(x => x.id == 2);
                    // console.log(ragacMove);
                    if (ragacMove) return true;
                }
            }
            if (b == 2) {
                if (a == 0) {
                    ragacMove = which.find(x => x.id == 6);
                    // console.log(ragacMove);
                    if (ragacMove) return true;
                }
                if (a == 2) {
                    ragacMove = which.find(x => x.id == 0);
                    // console.log(ragacMove);
                    if (ragacMove) return true;
                }
            }
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


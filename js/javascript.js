var clickOnCells = document.getElementsByClassName("game-box");
let bgp1 = document.getElementsByClassName("main_content");
bgp1[6].style.backgroundImage = "url('./images/player1.png')";
bgp1[8].style.backgroundImage = "url('./images/player2.png')";

var krestik = `<span class="krestik">✘</span>`;
var krestikLot = `<span class="krestikLot">✘</span>`;
var nolik = `<span class="nolik">O</span>`;
var nolikLot = `<span class="nolikLot">O</span>`;
var lot_result = `Игрок №1 играет за <span id="x"></span> №2 за <span id="o"></span>`;
var lot = "";

var buttonGame = document.querySelector(".lot");
buttonGame.addEventListener('click', function() {

    let rand = Math.floor(Math.random() * 2 + 1);

    if (rand == 1) {
        lot = krestik;
        document.querySelector(".lot_result").innerHTML = lot_result;
        whoPlaysWhat();
    } else if(rand == 2){
        lot = nolik;
        document.querySelector(".lot_result").innerHTML = lot_result;
        whoPlaysWhat();
    };
	this.disabled = true;
    
	startGame();
});


function whoPlaysWhat() {
    if (lot == krestik) {
        let el1 = document.getElementById("luck1p");
        el1.innerHTML = krestikLot;
        document.getElementById("x").innerHTML = krestikLot;
        let el2 = document.getElementById("luck2p");
        el2.innerHTML = nolikLot;
        document.getElementById("o").innerHTML = nolikLot;
    }  else {
        let el1 = document.getElementById("luck1p");
        el1.innerHTML = nolikLot;
        document.getElementById("x").innerHTML = nolikLot;
        let el2 = document.getElementById("luck2p");
        el2.innerHTML = krestikLot;
        document.getElementById("o").innerHTML = krestikLot;
    }
}


function winerKrestik() {
    console.log("Победили крестики");
    popUp();
}

function winerNolik() {
    console.log("Победили нолики");
    popUp();
}

function draw() {
    let draw = document.querySelector(".pop_container");
    draw.className = "pop_container open";
    let titleWin = document.querySelector(".pop_title");
    titleWin.innerHTML = "Ничья!";
};

function randLot() {
    if (lot != krestik) {
        lot = krestik;
    } else {
        lot = nolik;
    }
}

function move() {
	let count = 1;

	return function() {
		return count++;
	}
}

let moves = move();


function startGame() {
    for (let i = 0; i < clickOnCells.length; i++) {
        clickOnCells[i].addEventListener('click', function game(event) {
            if (clickOnCells[i].innerHTML == "") {
                event.target.innerHTML = lot;
            }
            let moveStat = document.querySelector(".Nextmovefor");
            if (lot != krestik) {
                moveStat.innerText = "Ходят крестики"
            } else {
                moveStat.innerText = "Ходят нолики"
            }
            moves;
            if (moves() == 9 ) {
                draw();
            }
            randLot();
            winVerification();
        });
    }
}


function winVerification()  {
    let combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (let i = 0; i < combinations.length; i++) {
        let box = combinations[i];
        if(clickOnCells[box[0]].innerHTML == clickOnCells[box[1]].innerHTML
            && clickOnCells[box[1]].innerHTML == clickOnCells[box[2]].innerHTML
            && clickOnCells[box[0]].innerHTML == krestik) {
                winerKrestik();
            } else if(clickOnCells[box[0]].innerHTML == clickOnCells[box[1]].innerHTML
                && clickOnCells[box[1]].innerHTML == clickOnCells[box[2]].innerHTML
                && clickOnCells[box[0]].innerHTML == nolik){
                    winerNolik();
                }
	    
    // for (let i of combinations) {
    //     console.log(clickOnCells[i[0]].innerHTML && clickOnCells[i[1]].innerHTML && clickOnCells[i[2]].innerHTML == krestik)
    // }
            
    // if (clickOnCells[0].innerHTML && clickOnCells[1].innerHTML && clickOnCells[2].innerHTML == krestik) {
    //     console.log("Победили крестики");
    // }

    // else if(clickOnCells[3].innerHTML && clickOnCells[4].innerHTML && clickOnCells[5].innerHTML == krestik) {
    //     console.log("Победили крестики")
    // }
    
    // for (let i = 0; i < combinations.length; i++) {
    //         if (clickOnCells[combinations[0][0]].innerHTML && clickOnCells[combinations[0][1]].innerHTML && clickOnCells[combinations[0][2]].innerHTML == krestik) {
    //             console.log("Победили крестики")
    //  }

    // if (combinations[i] == krestik) {
    //     console.log(combinations[i]);
    //     winerKrestik();                
    // } else if (combinations[i] == nolik) {
    //     winerNolik();
    // } else if (false) {
    //     draw();
    // }
    }
}

let incont = document.querySelector(".pop_container");

function popUp() {

    incont.className = "pop_container open";

    let titleWin = document.querySelector(".pop_title");

    if (lot != krestik) {
    titleWin.innerHTML = "Победили Крестики!"; 
    } else {
        titleWin.innerHTML = "Победили нолики!"; 
    }
}

let popDown = document.querySelector(".pop_button");
popDown.addEventListener('click', () => {

    incont.className = "pop_container down";

    setTimeout(restart, 200);
})

let restart = function() {

        location.reload();
};

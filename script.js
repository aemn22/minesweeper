// chick if there a win/lose history in the localStorage 

if (localStorage.win) {
    document.querySelector(".win-counter span").innerHTML = localStorage.getItem("win")
} else {
    localStorage.setItem("win", 0)
}
if (localStorage.lose) {
    document.querySelector(".lose-counter span").innerHTML = localStorage.getItem("lose")

} else {
    localStorage.setItem("lose", 0)
}


let allSpans = []
let mines
let minesCount = 10


window.onload = startGame();


function startGame() {
    createElements();
    createRandomsMines(minesCount)
}



// create all span and append them on the board element
function createElements() {
    let board = document.querySelector(".board")
    for (let i = 0; i < 100; i++) {
        let span = document.createElement("span")
        span.setAttribute("data", (i))
        span.setAttribute("class", "clear")
        span.innerHTML = 0
        allSpans.push(span)
        board.appendChild(span)
    }
}


// create random mine with class mine
function createRandomsMines(n) {
    for (let i = 0; i < n; i++) {
        let randomNum = Math.round(Math.random() * 99)
        allSpans[randomNum].setAttribute("class", "mine")
        allSpans[randomNum].innerHTML = ''
        
    }
    // get all mine
    mines = document.querySelectorAll(`.mine`)
}
mines.forEach(mine=>{
    // count the mines on the area
        mineCounter(+mine.getAttribute("data"))
})
 // function for count the mine around of the span
 function mineCounter(index) {
    let left = allSpans[index - 1]
    let right = allSpans[index + 1]
    let topLeft = allSpans[index - 11]
    let topCenter = allSpans[index - 10]
    let topRight = allSpans[index - 9]
    let bottomLeft = allSpans[index + 9]
    let bottomCenter = allSpans[index + 10]
    let bottomRight = allSpans[index + 11]
    let rightSideSpan = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
    let leftSideSpan = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
    if (left != undefined && !left.classList.contains("mine") && !leftSideSpan.includes(index)) {
        left.innerHTML++
    }
    if (right != undefined && !right.classList.contains("mine") && !rightSideSpan.includes(index)) {
        right.innerHTML++
    }
    if (topLeft != undefined && !topLeft.classList.contains("mine") && !leftSideSpan.includes(index)) {
        topLeft.innerHTML++
    }
    if (topCenter != undefined && !topCenter.classList.contains("mine")) {
        topCenter.innerHTML++
    }
    if (topRight != undefined && !topRight.classList.contains("mine") && !rightSideSpan.includes(index)) {
        topRight.innerHTML++
    }
    if (bottomLeft != undefined && !bottomLeft.classList.contains("mine") && !leftSideSpan.includes(index)) {
        bottomLeft.innerHTML++
    }
    if (bottomCenter != undefined && !bottomCenter.classList.contains("mine")) {
        bottomCenter.innerHTML++
    }
    if (bottomRight != undefined && !bottomRight.classList.contains("mine") && !rightSideSpan.includes(index)) {
        bottomRight.innerHTML++
    }
}

// add right click event 
allSpans.forEach(span => {
    span.addEventListener('contextmenu', (event) => {
        span.style = "background-image: url('icon/flag.png');background-size: cover;"
        event.preventDefault()
    })
})

//add click event

document.addEventListener("click", (e) => {
    // add click event for mine span 
    if (e.target.classList.contains("mine")) {
        let mine = 0
        // click all the mines when you lose
        let lose = setInterval(() => {

            //add minesweeper audio
            let loseSound = new Audio("./audio/lose_minesweeper.wav")
            loseSound.play()

            // set the mine icon on the span
            mines[mine].style = "background-image: url('icon/mine.png');background-size: cover;pointer-events: none;"
            if (mine == mines.length - 1) {
                clearInterval(lose)
                document.querySelector(".lose").style = "display:block"
                localStorage.lose++
            }
            mine++
        }, 100)
    }

    //add click event for safe span
    if (e.target.classList.contains("clear")) {
        let clickSound = new Audio("audio/click.wav")
        clickSound.play()
        e.target.style = "background-color:#9a9a9a ;font-size:12px;pointer-events: none;"
        e.target.setAttribute("class", "")
        if (!document.querySelector(".clear")) {
            document.querySelector(".win").style = "display:block"
            localStorage.win++
        }

        if (e.target.innerHTML == "0") {
            e.target.innerHTML = ""
            clickEmptySpan(+e.target.getAttribute("data"))
        }
    }
    
    // add click event for the new game btn
    if (e.target.className === "new-game-btn") {
        window.location.reload()
    }
})



// function for click all the empty span 
function clickEmptySpan(index) {
    let left = allSpans[index - 1]
    let right = allSpans[index + 1]
    let topCenter = allSpans[index - 10]
    let bottomCenter = allSpans[index + 10]
    let leftSideSpan = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
    let rightSideSpan = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
    if (left != undefined && left.classList.contains("clear") && !leftSideSpan.includes(index)) {
        left.click()
    }
    if (right != undefined && right.classList.contains("clear") && !rightSideSpan.includes(index)) {
        right.click()
    }
    if (topCenter != undefined && topCenter.classList.contains("clear")) {
        topCenter.click()
    }
    if (bottomCenter != undefined && bottomCenter.classList.contains("clear")) {
        bottomCenter.click()
    }
}


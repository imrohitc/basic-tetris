document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const width = 10;
    let nextRandom = 0;

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2, width*2+1],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]
    ];

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    //Randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    //Draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
        });
    }

    //Undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
        });
    }

    //Make the tetromino move down every second
    timeID = setInterval(moveDown, 1000);

    //Assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        } else if(e.keyCode === 38) {
            rotate();
        } else if(e.keyCode === 39) {
            moveRight();
        } else if(e.keyCode === 40) {
            moveDown();
        }
    }
    
    document.addEventListener("keyup", control);

    //Move down function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //Freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"));

            //Start a new Tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            
            displayShape();
        }
    }

    //Move the Tetromino left, unless it is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) currentPosition -= 1;

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition += 1;
        }

        draw();
    }

    //Move the Tetromino right, unless it is at the edge or there is a blockage
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);

        if(!isAtRightEdge) currentPosition += 1;

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition -= 1;
        }

        draw();
    }

    //Rotate the Tetromino
    function rotate() {
        undraw();
        currentRotation++;

        if(currentRotation === current.length) { //If the current rotation gets to 4, make it go back to 0
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];

        draw();
    }

    //Show up-next Tetromino in mini-grid
    const displaySquares = document.querySelectorAll(".mini-grid div");
    const displayWidth = 4;
    let displayIndex = 0;

    //The Tetrominoes without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, display*2+1, display*3+1]  //iTetromino
    ]

    //Display the shape in the mini-grid display
    function displayShape() {
        //Remove any trace of a tetromino from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove("tetromino");
        })

        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add("tetromino");
        });
    }
})
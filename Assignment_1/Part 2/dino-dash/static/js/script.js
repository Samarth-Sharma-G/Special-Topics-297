const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');

canvas.width = 800;
canvas.height = 200;

const dino = {
    x: 50,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    jumping: false,
    jumpHeight: 100,
    jumpSpeed: 5
};

const cactus = {
    x: canvas.width,
    y: canvas.height - 40,
    width: 20,
    height: 40,
    speed: 5
};

let score = 0;
let highScore = 0;

const dinoImg = new Image();
dinoImg.src = '/static/images/dino.png';

function jump() {
    if (!dino.jumping) {
        dino.jumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight < dino.jumpHeight && dino.jumping) {
                dino.y -= dino.jumpSpeed;
                jumpHeight += dino.jumpSpeed;
            } else {
                clearInterval(jumpInterval);
                fall();
            }
        }, 20);
    }
}

function fall() {
    const fallInterval = setInterval(() => {
        if (dino.y < canvas.height - dino.height) {
            dino.y += dino.jumpSpeed;
        } else {
            clearInterval(fallInterval);
            dino.jumping = false;
            dino.y = canvas.height - dino.height;
        }
    }, 20);
}

function moveCactus() {
    cactus.x -= cactus.speed;
    if (cactus.x < -cactus.width) {
        cactus.x = canvas.width;
        score++;
        updateScore();
    }
}

function checkCollision() {
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        gameOver();
    }
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function getHighScore() {
    fetch('/get_high_score')
        .then(response => response.json())
        .then(data => {
            highScore = data.high_score;
            highScoreElement.textContent = `High Score: ${highScore}`;
        });
}

function updateHighScore() {
    fetch('/update_high_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: score }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                highScore = data.new_high_score;
                highScoreElement.textContent = `High Score: ${highScore}`;
            }
        });
}

function gameOver() {
    alert(`Game Over! Your score: ${score}`);
    updateHighScore();
    resetGame();
}

function resetGame() {
    score = 0;
    updateScore();
    cactus.x = canvas.width;
    dino.y = canvas.height - dino.height;
    dino.jumping = false;
}

function drawDino() {
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
}

function drawCactus() {
    ctx.fillStyle = 'green';
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawCactus();
    moveCactus();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

getHighScore();

// Wait for the dinosaur image to load before starting the game
dinoImg.onload = function() {
    gameLoop();
};
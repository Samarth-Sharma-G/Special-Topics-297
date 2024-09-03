const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');

let isJumping = false;
let score = 0;

document.addEventListener('keydown', jump);

function jump(event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            if (jumpCount < 15) {
                dino.style.bottom = (parseInt(dino.style.bottom) || 0) + 5 + 'px';
            } else if (jumpCount >= 15 && jumpCount < 30) {
                dino.style.bottom = (parseInt(dino.style.bottom) || 0) - 5 + 'px';
            } else {
                clearInterval(jumpInterval);
                isJumping = false;
                dino.style.bottom = '0px';
            }
            jumpCount++;
        }, 20);
    }
}

function moveCactus() {
    let cactusPosition = 600;
    const moveInterval = setInterval(() => {
        if (cactusPosition < -20) {
            clearInterval(moveInterval);
            cactusPosition = 600;
            moveCactus();
            score++;
            scoreElement.textContent = `Score: ${score}`;
        } else {
            cactusPosition -= 5;
            cactus.style.right = cactusPosition + 'px';
            checkCollision();
        }
    }, 20);
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
    ) {
        alert(`Game Over! Your score: ${score}`);
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        cactus.style.right = '0px';
    }
}

moveCactus();
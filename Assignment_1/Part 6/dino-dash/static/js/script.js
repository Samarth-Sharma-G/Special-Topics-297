// Main Game class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');

        this.canvas.width = 800;
        this.canvas.height = 200;

        this.score = 0;
        this.highScore = 0;
        this.animationId = null;
        this.lastTime = 0;

        this.dino = new Dinosaur(this);
        this.obstacles = new ObstacleManager(this);

        this.setupEventListeners();
        this.getHighScore();
    }

    // Set up event listeners for game controls
    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'ArrowUp') {
                this.dino.jump();
            }
        });
    }

    // Start the game loop
    start() {
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    // Main game loop
    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        if (this.checkCollision()) {
            this.gameOver();
        } else {
            this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    // Update game state
    update(deltaTime) {
        this.dino.update(deltaTime);
        this.obstacles.update(deltaTime);

        const passedObstacles = this.obstacles.getPassedObstacles();
        if (passedObstacles.length > 0) {
            this.score += passedObstacles.length;
            this.updateScore();
        }
    }

    // Render game objects
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.dino.draw(this.ctx);
        this.obstacles.draw(this.ctx);
    }

    // Check for collision between dinosaur and obstacles
    checkCollision() {
        return this.obstacles.checkCollision(this.dino);
    }

    // Update the score display
    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    // Fetch the high score from the server
    getHighScore() {
        fetch('/get_high_score')
            .then(response => response.json())
            .then(data => {
                this.highScore = data.high_score;
                this.highScoreElement.textContent = `High Score: ${this.highScore}`;
            });
    }

    // Update the high score on the server
    updateHighScore() {
        fetch('/update_high_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: this.score }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.highScore = data.new_high_score;
                    this.highScoreElement.textContent = `High Score: ${this.highScore}`;
                }
            });
    }

    // Handle game over state
    gameOver() {
        cancelAnimationFrame(this.animationId);
        alert(`Game Over! Your score: ${this.score}`);
        this.updateHighScore();
        this.resetGame();
    }

    // Reset the game state
    resetGame() {
        this.score = 0;
        this.updateScore();
        this.obstacles.reset();
        this.dino.reset();
        this.start();
    }
}

// Dinosaur class
class Dinosaur {
    constructor(game) {
        this.game = game;
        this.x = 50;
        this.y = this.game.canvas.height - 40;
        this.width = 40;
        this.height = 40;
        this.jumping = false;
        this.yVelocity = 0;
        this.gravity = 0.5;
        this.jumpStrength = -10;

        this.image = new Image();
        this.image.src = '/static/images/dino.png';
    }

    // Handle dinosaur jump
    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.yVelocity = this.jumpStrength;
        }
    }

    // Update dinosaur position
    update(deltaTime) {
        this.yVelocity += this.gravity;
        this.y += this.yVelocity;

        if (this.y > this.game.canvas.height - this.height) {
            this.y = this.game.canvas.height - this.height;
            this.jumping = false;
            this.yVelocity = 0;
        }
    }

    // Draw the dinosaur on the canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Reset dinosaur position
    reset() {
        this.y = this.game.canvas.height - this.height;
        this.jumping = false;
        this.yVelocity = 0;
    }
}

// Obstacle class
class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.y = this.game.canvas.height - 40;
        this.width = 20;
        this.height = 40;
        this.speed = 5;
        this.passed = false;
    }

    // Update obstacle position
    update(deltaTime) {
        this.x -= this.speed * (deltaTime / 16);
    }

    // Draw the obstacle on the canvas
    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Check if the obstacle is off-screen
    isOffScreen() {
        return this.x + this.width < 0;
    }
}

// Obstacle Manager class
class ObstacleManager {
    constructor(game) {
        this.game = game;
        this.obstacles = [];
        this.obstaclePool = [];
        this.spawnTimer = 0;
        this.spawnInterval = 1500; // Milliseconds
        this.passedObstacles = new Set();
    }

    // Update all obstacles
    update(deltaTime) {
        this.spawnTimer += deltaTime;

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnObstacle();
            this.spawnTimer = 0;
        }

        this.obstacles.forEach(obstacle => {
            obstacle.update(deltaTime);
            if (!obstacle.passed && obstacle.x + obstacle.width < this.game.dino.x) {
                obstacle.passed = true;
                this.passedObstacles.add(obstacle);
            }
        });

        // Remove off-screen obstacles and return them to the pool
        this.obstacles = this.obstacles.filter(obstacle => {
            if (obstacle.isOffScreen()) {
                this.obstaclePool.push(obstacle);
                this.passedObstacles.delete(obstacle);
                return false;
            }
            return true;
        });
    }

    // Draw all obstacles
    draw(ctx) {
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
    }

    // Spawn a new obstacle
    spawnObstacle() {
        let obstacle;
        if (this.obstaclePool.length > 0) {
            obstacle = this.obstaclePool.pop();
            obstacle.x = this.game.canvas.width;
            obstacle.passed = false;
        } else {
            obstacle = new Obstacle(this.game, this.game.canvas.width);
        }
        this.obstacles.push(obstacle);
    }

    // Check collision with the dinosaur
    checkCollision(dino) {
        return this.obstacles.some(obstacle => 
            dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y
        );
    }

    // Get passed obstacles and clear the set
    getPassedObstacles() {
        const passed = Array.from(this.passedObstacles);
        this.passedObstacles.clear();
        return passed;
    }

    // Reset all obstacles
    reset() {
        this.obstaclePool.push(...this.obstacles);
        this.obstacles = [];
        this.passedObstacles.clear();
        this.spawnTimer = 0;
    }
}

// Initialize the game when the window loads
window.onload = () => {
    const game = new Game();
    // Wait for the dinosaur image to load before starting the game
    game.dino.image.onload = () => {
        game.start();
    };
};
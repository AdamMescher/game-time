const Snake = require('./Snake.js');
const Apple = require('./Apple.js');

class Game {

  constructor(context, canvas) {
    this.difficulty = false,
    this.speed = 15,
    this.score = 0,
    this.scoreIncrement = 10,
    this.grid = 30,
    this.snake = new Snake(),
    this.apple = new Apple(),
    this.context = context,
    this.canvas = canvas
  }

  run() {
    this.erase();
    this.snake.changeDirection();
    this.difficultyState(this.snake);
    this.snake.draw(this.context);
    this.snake.manageTail();
    this.snake.checkApple(this.apple);
    this.apple.draw(this.context);
    this.snake.checkSelf();
    this.updateScore();
  }

  erase() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  changeDifficulty() {
    this.difficulty = !this.difficulty;
  }

  difficultyState() {
    if (!this.difficulty) {
      if (this.snake.xPosition < 0) {
        this.snake.xPosition = this.grid - 1;
      }
      if (this.snake.xPosition > this.grid - 1) {
        this.snake.xPosition = 0;
      }
      if (this.snake.yPosition < 0) {
        this.snake.yPosition = this.grid - 1;
      }
      if (this.snake.yPosition > this.grid - 1) {
        this.snake.yPosition = 0;
      }
    } else {
      this.speed = 22;
      this.scoreIncrement = 30;
      if (this.snake.xPosition < 0) {
        this.snake.death();
      }
      if (this.snake.xPosition > this.grid - 1) {
        this.snake.death();
      }
      if (this.snake.yPosition < 0) {
        this.snake.death();
      }
      if (this.snake.yPosition > this.grid - 1) {
        this.snake.death();
      }
    }
  }

  updateScore() {
    this.score = ( (this.snake.tail - 4) * this.scoreIncrement);
    return this.score;
  }

}

module.exports = Game;

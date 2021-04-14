let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dirX = 2;
let dirY = -2;

let ballRadius = 10;
let paddleWidth = 75;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let leftPress = false;
let rightPress = false;

const init = () => {
  keyboardListeners();
  setInterval(draw, 10);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball();
  paddle();

  collisionsBall();
  movePaddle();
};

const ball = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const paddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
};

const collisionsBall = () => {
  if (x + dirX > canvas.width - ballRadius || x + dirX < ballRadius) {
    dirX = -dirX;
  }

  if (y + dirY > canvas.height - ballRadius || y + dirY < ballRadius) {
    dirY = -dirY;
  }
  x += dirX;
  y += dirY;
};

const movePaddle = () => {
  if (leftPress && paddleX > 0) {
    paddleX -= 7;
  }
  if (rightPress && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
};

const keyboardListeners = () => {
  document.addEventListener("keydown", keyPushHandler, false);
  document.addEventListener("keyup", keyPullHandler, false);
};

const keyPullHandler = (event) => {
  if (event.keyCode === 37) {
    leftPress = false;
  }
  if (event.keyCode === 39) {
    rightPress = false;
  }
};

const keyPushHandler = (event) => {
  if (event.keyCode === 37) {
    leftPress = true;
  }
  if (event.keyCode === 39) {
    rightPress = true;
  }
};

init();

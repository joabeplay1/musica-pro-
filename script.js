const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const sound = document.getElementById("hitSound");
const statusText = document.getElementById("status");

canvas.width = 900;
canvas.height = 450;

const friction = 0.992;
const balls = [];

let currentPlayer = 1;
let playerGroup = {1: null, 2: null}; // solid / stripe
let gameOver = false;

class Ball {
  constructor(x, y, color, type, number, isCue=false) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = color;
    this.type = type;
    this.number = number;
    this.isCue = isCue;
    this.vx = 0;
    this.vy = 0;
    this.active = true;
  }

  draw() {
    if (!this.active) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();

    if (!this.isCue) {
      ctx.fillStyle = "white";
      ctx.font = "10px Arial";
      ctx.fillText(this.number, this.x-3, this.y+3);
    }
  }

  update() {
    if (!this.active) return;

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= friction;
    this.vy *= friction;

    // parede
    if (this.x < this.radius || this.x > canvas.width - this.radius) {
      this.vx *= -1;
      this.x = Math.max(this.radius, Math.min(canvas.width-this.radius, this.x));
    }
    if (this.y < this.radius || this.y > canvas.height - this.radius) {
      this.vy *= -1;
      this.y = Math.max(this.radius, Math.min(canvas.height-this.radius, this.y));
    }

    if (Math.abs(this.vx) < 0.01) this.vx = 0;
    if (Math.abs(this.vy) < 0.01) this.vy = 0;
  }
}

// buracos
const pockets = [
  {x:0,y:0},{x:450,y:0},{x:900,y:0},
  {x:0,y:450},{x:450,y:450},{x:900,y:450}
];

// criar bolas
const cueBall = new Ball(200,225,"white","cue",0,true);
balls.push(cueBall);

const colors = ["yellow","blue","red","purple","orange","green","brown"];
let n=1;

for(let row=0;row<5;row++){
  for(let i=0;i<=row;i++){
    let x = 600 + row*20;
    let y = 225 - row*10 + i*20;

    let type = n<=7 ? "solid":"stripe";
    let color = n===8 ? "black":colors[n%7];

    balls.push(new Ball(x,y,color,type,n));
    n++;
  }
}

// colisão realista
function collide(b1,b2){
  if(!b1.active || !b2.active) return;

  const dx = b2.x - b1.x;
  const dy = b2.y - b1.y;
  const dist = Math.sqrt(dx*dx+dy*dy);

  if(dist < b1.radius + b2.radius){
    const angle = Math.atan2(dy,dx);

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    let v1 = {
      x: b1.vx*cos + b1.vy*sin,
      y: b1.vy*cos - b1.vx*sin
    };

    let v2 = {
      x: b2.vx*cos + b2.vy*sin,
      y: b2.vy*cos - b2.vx*sin
    };

    // troca velocidades (massa igual)
    let temp = v1.x;
    v1.x = v2.x;
    v2.x = temp;

    b1.vx = v1.x*cos - v1.y*sin;
    b1.vy = v1.y*cos + v1.x*sin;

    b2.vx = v2.x*cos - v2.y*sin;
    b2.vy = v2.y*cos + v2.x*sin;
  }
}

// regras 8-ball
function handlePocket(ball){
  if(!ball.active) return;

  for(let p of pockets){
    let dx = ball.x - p.x;
    let dy = ball.y - p.y;

    if(Math.sqrt(dx*dx+dy*dy) < 18){
      ball.active = false;

      if(ball.isCue){
        statusText.innerText = "❌ Falta!";
        resetCue();
        switchTurn();
      } 
      else if(ball.number === 8){
        if(checkWin()){
          statusText.innerText = `🏆 Jogador ${currentPlayer} venceu!`;
        } else {
          statusText.innerText = "❌ Perdeu! Bola 8 errada";
        }
        gameOver = true;
      } 
      else {
        assignGroup(ball);
      }
    }
  }
}

function assignGroup(ball){
  if(!playerGroup[currentPlayer]){
    playerGroup[currentPlayer] = ball.type;
    playerGroup[otherPlayer()] = ball.type === "solid" ? "stripe":"solid";
  }
}

function checkWin(){
  return balls.filter(b => 
    b.type === playerGroup[currentPlayer] && b.active
  ).length === 0;
}

function otherPlayer(){
  return currentPlayer === 1 ? 2 : 1;
}

function switchTurn(){
  currentPlayer = otherPlayer();
}

// reset branca
function resetCue(){
  setTimeout(()=>{
    cueBall.x=200;
    cueBall.y=225;
    cueBall.active=true;
  },1000);
}

// controle
let aiming=false;
let mouse={x:0,y:0};

canvas.addEventListener("mousedown",()=>aiming=true);

canvas.addEventListener("mouseup",()=>{
  if(gameOver) return;

  aiming=false;

  let dx = cueBall.x - mouse.x;
  let dy = cueBall.y - mouse.y;

  cueBall.vx = dx*0.09;
  cueBall.vy = dy*0.09;

  sound.currentTime=0;
  sound.play();

  switchTurn();
});

canvas.addEventListener("mousemove",e=>{
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// previsão com rebote
function drawPrediction(){
  let dx = mouse.x - cueBall.x;
  let dy = mouse.y - cueBall.y;

  let px = cueBall.x;
  let py = cueBall.y;

  ctx.beginPath();
  ctx.moveTo(px,py);

  for(let i=0;i<3;i++){
    px -= dx;
    py -= dy;

    if(px < 0 || px > canvas.width) dx *= -1;
    if(py < 0 || py > canvas.height) dy *= -1;

    ctx.lineTo(px,py);
  }

  ctx.strokeStyle="rgba(255,255,255,0.3)";
  ctx.stroke();
}

// buracos
function drawPockets(){
  pockets.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,18,0,Math.PI*2);
    ctx.fillStyle="black";
    ctx.fill();
  });
}

// loop
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawPockets();

  balls.forEach(b=>{
    b.update();
    handlePocket(b);
    b.draw();
  });

  for(let i=0;i<balls.length;i++){
    for(let j=i+1;j<balls.length;j++){
      collide(balls[i],balls[j]);
    }
  }

  if(aiming) drawPrediction();

  requestAnimationFrame(animate);
}

animate();

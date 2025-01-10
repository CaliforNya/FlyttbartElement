const ballContainer = document.getElementById("ball-container");
const balls = document.querySelectorAll(".ball");

// console.log(balls);

const ballIcon = document.getElementById("ballicon");

const containerRect = ballContainer.getBoundingClientRect();

const move = 10;

let positionTop = 0;
let positionLeft = 0;

let lastTop = 0;
let lastLeft = 0;

const colors = [
  "#9B5DE5",
  "#FFD6E0",
  "#F15BB5",
  "#FFEF9F",
  "#00BBF9",
  "#00F5D4",
  "#1CE76A",
  "#fe9920",
  "#ef476f",
];

const selectBall = (ball) => {
  const balls = document.querySelectorAll(".ball");
  balls.forEach((selectedBall) => {
    selectedBall.style.border = "none";
    selectedBall.style.boxShadow = "none";
    selectedBall.classList.remove("selected");
  });

  ball.style.border = "#00BBF9 solid 4px";
  ball.style.boxShadow = "0 0 20px 2px #00BBF9";
  ball.classList.add("selected");
  const rect = ball.getBoundingClientRect();
  positionTop = rect.top - containerRect.top;
  positionLeft = rect.left - containerRect.left;
};

const unselectBall = (ball) => {
  ball.style.border = "none";
  ball.style.boxShadow = "none";
  ball.classList.remove("selected");
};

ballIcon.addEventListener("click", () => {
  const newBall = document.createElement("div");
  newBall.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  newBall.classList.add("ball");
  ballContainer.appendChild(newBall);

  newBall.addEventListener("click", () => selectBall(newBall));
  newBall.addEventListener("dblclick", () => unselectBall(newBall));

  document.addEventListener("keydown", (e) => {
    if (newBall.classList.contains("selected")) {
      const ballRect = newBall.getBoundingClientRect();
      const containerRect = ballContainer.getBoundingClientRect();

      let positionTop = ballRect.top - containerRect.top;
      let positionLeft = ballRect.left - containerRect.left;

      let lastTop = positionTop;
      let lastLeft = positionLeft;

      if (e.key === "ArrowUp" && positionTop > 0) positionTop -= move;
      if (
        e.key === "ArrowDown" &&
        positionTop < ballContainer.offsetHeight - newBall.offsetHeight
      )
        positionTop += move;
      if (e.key === "ArrowLeft" && positionLeft > 0) positionLeft -= move;
      if (
        e.key === "ArrowRight" &&
        positionLeft < ballContainer.offsetWidth - newBall.offsetWidth
      )
        positionLeft += move;

      let canMove = true;

      const balls = document.querySelectorAll(".ball");

      balls.forEach((otherBall) => {
        if (otherBall !== newBall && isColliding(newBall, otherBall)) {
          canMove = false;
        }
      });

      if (canMove) {
        newBall.style.position = "absolute";
        newBall.style.top = positionTop + "px";
        newBall.style.left = positionLeft + "px";
      }
    }
  });

  const isColliding = (ballA, ballB) => {
    const rectA = ballA.getBoundingClientRect();
    const rectB = ballB.getBoundingClientRect();

    const centerAX = rectA.left + rectA.width / 2;
    const centerAY = rectA.top + rectA.height / 2;
    const centerBX = rectB.left + rectB.width / 2;
    const centerBY = rectB.top + rectB.height / 2;

    const distance = Math.sqrt(
      Math.pow(centerAX - centerBX, 2) + Math.pow(centerAY - centerBY, 2)
    );

    const radiusA = rectA.width / 2;
    const radiusB = rectB.width / 2;

    return distance < radiusA + radiusB;
  };
});

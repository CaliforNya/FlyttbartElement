const ballContainer = document.getElementById("ball-container");
const balls = document.querySelectorAll(".ball");

// console.log(balls);

const ballIcon = document.getElementById("ballicon");

const containerRect = ballContainer.getBoundingClientRect();

const move = 10;

let positionTop = 0;
let positionLeft = 0;

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
        if (isColliding(newBall, otherBall)) {
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
});

const isColliding = (ballA, ballB) => {
  const rectA = ballA.getBoundingClientRect();
  const rectB = ballB.getBoundingClientRect();

  return !(
    rectA.right < rectB.left ||
    rectA.left > rectB.right ||
    rectA.bottom < rectB.top ||
    rectA.top > rectB.bottom
  );
};

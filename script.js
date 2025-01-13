const ballContainer = document.getElementById("ball-container");
const ballIcon = document.getElementById("ballicon");
const move = 5;

const colors = [
  "#9B5DE5",
  "#Fba0e3",
  "#F15BB5",
  "#fee440",
  "#00BBF9",
  "#00F5D4",
  "#1CE76A",
  "#fe9920",
  "#ef476f",
  "#Fa8072",
  "#4C50A9",
  "#ccbdbd ",
];

// Select ball
const selectBall = (ball) => {
  if (ball.classList.contains("selected")) {
    unselectBall(ball);
    return;
  }

  const balls = document.querySelectorAll(".ball");
  balls.forEach((selectedBall) => {
    selectedBall.style.backgroundColor = selectedBall.dataset.originalColor;
    selectedBall.classList.remove("selected");
  });

  ball.dataset.originalColor =
    ball.dataset.originalColor || ball.style.backgroundColor;
  ball.style.backgroundColor = "red";
  ball.classList.add("selected");
};

// Unselect ball
const unselectBall = (ball) => {
  ball.style.backgroundColor = ball.dataset.originalColor;
  ball.classList.remove("selected");
};

// Ball collision
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

// Ball bounce away
const pushAwayFromCollision = (ball, otherBall) => {
  const ballRect = ball.getBoundingClientRect();
  const otherBallRect = otherBall.getBoundingClientRect();
  const ballCenterX = ballRect.left + ballRect.width / 2;
  const ballCenterY = ballRect.top + ballRect.height / 2;
  const otherBallCenterX = otherBallRect.left + otherBallRect.width / 2;
  const otherBallCenterY = otherBallRect.top + otherBallRect.height / 2;

  const diffX = ballCenterX - otherBallCenterX;
  const diffY = ballCenterY - otherBallCenterY;
  const angle = Math.atan2(diffY, diffX);

  const pushDistance = 1;
  const newTop = parseFloat(ball.style.top) + Math.sin(angle) * pushDistance;
  const newLeft = parseFloat(ball.style.left) + Math.cos(angle) * pushDistance;

  return { top: newTop, left: newLeft };
};

// Moving balls with arrows
const moveBall = (ball, direction) => {
  const ballRect = ball.getBoundingClientRect();
  const containerRect = ballContainer.getBoundingClientRect();

  let newTop = ballRect.top - containerRect.top;
  let newLeft = ballRect.left - containerRect.left;

  if (direction === "up" && newTop > 0) newTop -= move;
  if (
    direction === "down" &&
    newTop < ballContainer.offsetHeight - ball.offsetHeight
  )
    newTop += move;
  if (direction === "left" && newLeft > 0) newLeft -= move;
  if (
    direction === "right" &&
    newLeft < ballContainer.offsetWidth - ball.offsetWidth
  )
    newLeft += move;

  const balls = document.querySelectorAll(".ball");
  balls.forEach((otherBall) => {
    if (otherBall !== ball && isColliding(ball, otherBall)) {
      const newPosition = pushAwayFromCollision(ball, otherBall);
      newTop = newPosition.top;
      newLeft = newPosition.left;
    }
  });

  ball.style.position = "absolute";
  ball.style.top = newTop + "px";
  ball.style.left = newLeft + "px";
};

// New ball production
ballIcon.addEventListener("click", () => {
  const newBall = document.createElement("div");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  newBall.style.backgroundColor = randomColor;
  newBall.dataset.originalColor = randomColor;

  newBall.classList.add("ball");
  ballContainer.appendChild(newBall);

  newBall.style.position = "absolute";

  // Listener for selecting/unselecting balls
  newBall.addEventListener("click", () => selectBall(newBall));
});

const newBall = document.createElement("div");
newBall.style.backgroundColor =
  colors[Math.floor(Math.random() * colors.length)];

newBall.classList.add("ball");
ballContainer.appendChild(newBall);

newBall.style.position = "absolute";

// Listeners for select and unselect a
newBall.addEventListener("click", () => selectBall(newBall));

// Listener for ball remove
document.addEventListener("keydown", (e) => {
  const selectedBall = document.querySelector(".ball.selected");
  if (selectedBall && e.key === "Backspace") {
    selectedBall.remove();
  }
});

// Listener for moveBall
document.addEventListener("keydown", (e) => {
  const selectedBall = document.querySelector(".ball.selected");
  if (selectedBall) {
    if (e.key === "ArrowUp") moveBall(selectedBall, "up");
    if (e.key === "ArrowDown") moveBall(selectedBall, "down");
    if (e.key === "ArrowLeft") moveBall(selectedBall, "left");
    if (e.key === "ArrowRight") moveBall(selectedBall, "right");
  }
});

// // Listener for dblclick move to position with shake on collision

// ballContainer.addEventListener("dblclick", (e) => {
//   const selectedBall = document.querySelector(".ball.selected");
//   if (!selectedBall) return;

//   const containerRect = ballContainer.getBoundingClientRect();
//   const mouseX = e.clientX - containerRect.left;
//   const mouseY = e.clientY - containerRect.top;

//   const initialLeft = selectedBall.style.left;
//   const initialTop = selectedBall.style.top;

//   selectedBall.style.position = "absolute";
//   selectedBall.style.left = `${mouseX - selectedBall.offsetWidth / 2}px`;
//   selectedBall.style.top = `${mouseY - selectedBall.offsetHeight / 2}px`;

//   const balls = document.querySelectorAll(".ball");
//   let collisionDetected = false;

//   balls.forEach((otherBall) => {
//     if (otherBall !== selectedBall && isColliding(selectedBall, otherBall)) {
//       collisionDetected = true;
//     }
//   });

//   if (collisionDetected) {
//     selectedBall.style.left = initialLeft;
//     selectedBall.style.top = initialTop;

//     selectedBall.classList.add("shake");

//     setTimeout(() => {
//       selectedBall.classList.remove("shake");
//     }, 500);
//   }
// });

const modal = document.getElementById("userGuideModal");
const openModalBtn = document.getElementById("openModalBtn");

openModalBtn.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

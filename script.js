const ballContainer = document.getElementById("ball-container");

const balls = document.querySelectorAll(".ball");

balls.forEach((ball) => {
  ball.addEventListener("click", () => {
    selectedBall = ball;
    selectedBall.style.border = "#00BBF9 solid 4px ";
    selectedBall.style.boxShadow = "0 0 20px 2px #00BBF9";
    selectedBall.classList.toggle("selected");
  });

  ball.addEventListener("dblclick", () => {
    selectedBall = ball;
    selectedBall.style.border = "none ";
    selectedBall.style.boxShadow = "none";
    selectedBall.classList.remove("selected");
  });
});

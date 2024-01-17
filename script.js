document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    const startBtn = document.getElementById("startBtn");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const holes = document.querySelectorAll(".hole");

    // Select audio elements for sounds
    const bompSound = document.getElementById("bomp-sound");
    const endSound = document.getElementById("end-sound");
    const highEndSound = document.getElementById("high-end-sound");

    // Game state variables
    let score = 0;
    let time = 30;
    let gameRunning = false;

    // Function to generate random time interval
    function randomTime(min, max) {
        return Math.floor(Math.random() * (max-min+1))+min;
    }

    // Function to display images in hole
    function displayImage() {
        holes.forEach(hole => hole.classList.remove("active"));
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.classList.add("active");

        const time = randomTime(500, 1500);

        setTimeout(() => {
            randomHole.classList.remove("active");
            if (gameRunning) {
                displayImage();
            }
        }, time);
    }

    // Function to start the game
    function startGame() {
        score = 0;
        time = 30;
        updateScore();
        updateTimer();
        gameRunning = true;
        startBtn.disabled = true;
        startBtn.textContent = "Playing...";
        countdown();
        displayImage();
    }

    // Function to update the score display
    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // Function to update the timer display
    function updateTimer() {
        timerDisplay.textContent = `Time left: ${time} seconds`;
    }

    // Function to handle the countdown
    function countdown() {
        const countdownInterval = setInterval(() => {
            time--;
            updateTimer();

            if (time === 0) {
                clearInterval(countdownInterval);
                endGame();
            }
        }, 1000);
    }

    // Function to end the game
    function endGame() {
        gameRunning = false;
        startBtn.disabled = false;
        timerDisplay.textContent = getGameOverMessage();
        startBtn.textContent = "Start Game";
        score > 20 ? highEndSound.play() : endSound.play();
    }

    // Function to get a witty message based on the score
    function getGameOverMessage() {
        if (score <= 5) {
            return "You blinked didn't you?";
        } else if (score <= 10) {
            return "Not bad! Keep practicing!";
        } else if (score <= 20) {
            return "You're getting good at this!";
        } else {
            return "Wow, you're a FaceBomp master!";
        }
    }

    // Event listener for the start button
    startBtn.addEventListener("click", startGame);

    // Event listener for clicking on the images
    holes.forEach (hole => {
        hole.addEventListener("click", () => {
            if (hole.classList.contains("active")) {
                hole.classList.remove("active");
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }

            const image = hole.querySelector("img");
            image.classList.add("clicked");

            setTimeout(() => {
               image.classList.remove("clicked");
            }, 300);

            bompSound.currentTime = 0;
            bompSound.play();
        });
    });
});

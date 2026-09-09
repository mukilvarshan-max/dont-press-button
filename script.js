// ===============================
// DON'T PRESS THE BUTTON
// ===============================

// Elements
const mainButton = document.getElementById("mainButton");
const playArea = document.getElementById("playArea");

const scoreElement = document.getElementById("score");
const bestElement = document.getElementById("best");
const clicksElement = document.getElementById("clicks");

const messageElement = document.getElementById("message");

const resetButton = document.getElementById("resetBtn");
const challengeButton = document.getElementById("challengeBtn");

const themeButton = document.getElementById("themeBtn");

const particlesContainer = document.getElementById("particles");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const playAgain = document.getElementById("playAgain");

const finalScore = document.getElementById("finalScore");
const finalMessage = document.getElementById("finalMessage");


// ===============================
// GAME VARIABLES
// ===============================

let score = 0;
let clicks = 0;

let bestScore = Number(
    localStorage.getItem("dontPressBest") || 0
);

let challengeMode = false;
let challengeClicks = 0;

let gameStarted = false;


// ===============================
// FUNNY MESSAGES
// ===============================

const messages = [
    "You know you want to press it...",
    "I told you NOT to press it.",
    "Seriously?",
    "Again?! 😭",
    "This is getting suspicious...",
    "You have too much free time.",
    "The button is enjoying this.",
    "Please stop.",
    "Okay... one more.",
    "I can't believe you.",
    "WHY?!",
    "You are unstoppable.",
    "The button fears you.",
    "Achievement unlocked: Button Addict.",
    "At this point, it's personal.",
    "Your mouse deserves a break."
];


// ===============================
// INITIAL DISPLAY
// ===============================

bestElement.textContent = bestScore;


// ===============================
// BUTTON CLICK
// ===============================

mainButton.addEventListener("click", function () {

    score++;
    clicks++;

    if (challengeMode) {
        challengeClicks++;
    }

    updateStats();

    showMessage();

    createParticles();

    buttonAnimation();

    // Move button after several clicks
    if (score >= 5) {
        moveButton();
    }

    // Challenge ends after 15 clicks
    if (challengeMode && challengeClicks >= 15) {
        finishChallenge();
    }

});


// ===============================
// UPDATE STATS
// ===============================

function updateStats() {

    scoreElement.textContent = score;

    clicksElement.textContent = clicks;

    if (score > bestScore) {

        bestScore = score;

        bestElement.textContent = bestScore;

        localStorage.setItem(
            "dontPressBest",
            bestScore
        );
    }
}


// ===============================
// RANDOM MESSAGE
// ===============================

function showMessage() {

    const randomIndex =
        Math.floor(
            Math.random() * messages.length
        );

    messageElement.style.opacity = "0";

    setTimeout(() => {

        messageElement.textContent =
            messages[randomIndex];

        messageElement.style.opacity = "1";

    }, 120);

}


// ===============================
// BUTTON ANIMATION
// ===============================

function buttonAnimation() {

    mainButton.classList.remove("shake");

    void mainButton.offsetWidth;

    mainButton.classList.add("shake");
}


// ===============================
// PARTICLE EFFECT
// ===============================

function createParticles() {

    const rect =
        mainButton.getBoundingClientRect();

    const areaRect =
        playArea.getBoundingClientRect();

    const centerX =
        rect.left -
        areaRect.left +
        rect.width / 2;

    const centerY =
        rect.top -
        areaRect.top +
        rect.height / 2;

    for (let i = 0; i < 12; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            60 + Math.random() * 80;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        particle.style.left =
            `${centerX}px`;

        particle.style.top =
            `${centerY}px`;

        particle.style.setProperty(
            "--x",
            `${x}px`
        );

        particle.style.setProperty(
            "--y",
            `${y}px`
        );

        particlesContainer.appendChild(
            particle
        );

        setTimeout(() => {
            particle.remove();
        }, 700);
    }
}


// ===============================
// MOVE BUTTON
// ===============================

function moveButton() {

    const areaWidth =
        playArea.clientWidth;

    const areaHeight =
        playArea.clientHeight;

    const buttonSize =
        mainButton.offsetWidth;

    const padding = 30;

    const maxX =
        areaWidth -
        buttonSize -
        padding;

    const maxY =
        areaHeight -
        buttonSize -
        padding;

    if (maxX <= padding || maxY <= padding) {
        return;
    }

    const randomX =
        padding +
        Math.random() *
        (maxX - padding);

    const randomY =
        90 +
        Math.random() *
        (maxY - 90);

    mainButton.style.position = "absolute";

    mainButton.style.left =
        `${randomX}px`;

    mainButton.style.top =
        `${randomY}px`;
}


// ===============================
// RESET
// ===============================

resetButton.addEventListener(
    "click",
    resetGame
);

function resetGame() {

    score = 0;

    clicks = 0;

    challengeClicks = 0;

    challengeMode = false;

    gameStarted = false;

    scoreElement.textContent = "0";

    clicksElement.textContent = "0";

    messageElement.textContent =
        "You know you want to press it...";

    mainButton.style.position = "relative";

    mainButton.style.left = "auto";

    mainButton.style.top = "auto";

    challengeButton.textContent =
        "⚡ Challenge";
}


// ===============================
// CHALLENGE MODE
// ===============================

challengeButton.addEventListener(
    "click",
    startChallenge
);

function startChallenge() {

    resetGame();

    challengeMode = true;

    gameStarted = true;

    challengeButton.textContent =
        "⚡ 15 clicks!";

    messageElement.textContent =
        "15 clicks. No excuses. GO!";

}


// ===============================
// FINISH CHALLENGE
// ===============================

function finishChallenge() {

    challengeMode = false;

    finalScore.textContent =
        score;

    if (score >= 15) {

        finalMessage.textContent =
            "You pressed it 15 times. The button has officially lost.";

    } else {

        finalMessage.textContent =
            "You somehow survived the challenge.";

    }

    modal.classList.remove("hidden");

    challengeButton.textContent =
        "⚡ Challenge";
}


// ===============================
// CLOSE MODAL
// ===============================

closeModal.addEventListener(
    "click",
    () => {
        modal.classList.add("hidden");
    }
);

playAgain.addEventListener(
    "click",
    () => {

        modal.classList.add("hidden");

        resetGame();

        startChallenge();

    }
);


// ===============================
// CLICK OUTSIDE MODAL
// ===============================

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {
            modal.classList.add("hidden");
        }

    }
);


// ===============================
// DARK / LIGHT MODE
// ===============================

themeButton.addEventListener(
    "click",
    toggleTheme
);

function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeButton.textContent =
        isLight ? "☀️" : "🌙";

    localStorage.setItem(
        "dontPressTheme",
        isLight ? "light" : "dark"
    );
}


// Load saved theme

const savedTheme =
    localStorage.getItem("dontPressTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.textContent = "☀️";

}


// ===============================
// SECRET EASTER EGG
// ===============================

let secretCode = "";

document.addEventListener(
    "keydown",
    function (event) {

        secretCode +=
            event.key.toLowerCase();

        if (secretCode.length > 10) {
            secretCode =
                secretCode.slice(-10);
        }

        // Type "banana"
        if (secretCode.includes("banana")) {

            messageElement.textContent =
                "🍌 BANANA MODE ACTIVATED 🍌";

            document.body.style.transform =
                "rotate(2deg)";

            setTimeout(() => {

                document.body.style.transform =
                    "rotate(0deg)";

            }, 700);

            secretCode = "";
        }

    }
);


// ===============================
// CONSOLE EASTER EGG
// ===============================

console.log(
    "%c👀 You found the developer console!",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Try typing BANANA on the keyboard..."
);
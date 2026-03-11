
function hideAll() {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active-section');
    });
}

function showHome() {
    hideAll();
    document.getElementById('home').classList.add('active-section');
}

function showBMI() {
    hideAll();
    document.getElementById('bmi-section').classList.add('active-section');
}
async function loadQuote() {
    try {
        const response = await fetch("https://dummyjson.com/c/0fdc-635a-430c-ad3c");
        const data = await response.json(); // This is an ARRAY

        // Pick random quote
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        document.getElementById("quote-text").innerText = `"${randomQuote.thought}"`;
    } catch (error) {
        document.getElementById("quote-text").innerText =
            "Stay positive and keep pushing forward!";
        document.getElementById("quote-author").innerText = "";
    }
}
window.onload = loadQuote;

let userScore = 0;
let computerScore = 0;
let gameOver = false;
function showGame() {
    hideAll();
    document.getElementById('game-section').classList.add('active-section');
}

function calculateBMI() {
    let h = document.getElementById('height').value;
    let w = document.getElementById('weight').value;

    if (!h || !w) {
        alert("Enter valid values!");
        return;
    }

    let heightM = h / 100;
    let bmi = w / (heightM * heightM);

    let category, message, className;

    if (bmi < 18.5) {
        category = "Underweight";
        className = "underweight";
        message = "You may need to gain some healthy weight.";
    }
    else if (bmi < 25) {
        category = "Normal";
        className = "normal";
        message = "Great! You have a healthy body weight.";
    }
    else if (bmi < 30) {
        category = "Overweight";
        className = "overweight";
        message = "Consider regular exercise and balanced diet.";
    }
    else {
        category = "Obese";
        className = "obese";
        message = "It’s important to consult a healthcare provider.";
    }
    const card = document.getElementById('bmi-result-card');
    card.style.display = "block";

    document.getElementById('bmi-value').innerText = bmi.toFixed(1);

    const catElement = document.getElementById('bmi-category');
    catElement.innerText = category;
    catElement.className = "bmi-category " + className;

    document.getElementById('bmi-message').innerText = message;
    let percentage = ((bmi - 15) / 25) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100);
    document.getElementById('progress-fill').style.width = percentage + "%";
}

function playGame(userChoice) {
    if (gameOver) return;

    const choices = ["rock", "paper", "scissors"];
    const icons = {
        rock: "✊",
        paper: "✋",
        scissors: "✌️"
    };

    const computerChoice = choices[Math.floor(Math.random() * 3)];

    document.getElementById("user-choice").innerText = icons[userChoice];
    document.getElementById("computer-choice").innerText = icons[computerChoice];

    let result = "";

    if (userChoice === computerChoice) {
        result = "It's a Draw!";
    }
    else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You Win! 🎉";
        userScore++;
    }
    else {
        result = "Computer Wins! 🤖";
        computerScore++;
        const loseSound = document.getElementById("lose-sound");
        loseSound.currentTime = 0;
        loseSound.play();
    }

    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;

    if (userScore === 5 || computerScore === 5) {
        gameOver = true;

        if (userScore === 5) {
            result = "🏆 Congratulations! You Won The Match!";
        } else {
            result = "💀 Computer Won The Match!";
        }

        document.getElementById("reset-btn").style.display = "inline-block";
    }

    document.getElementById("result-text").innerText = result;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    gameOver = false;

    document.getElementById("user-score").innerText = 0;
    document.getElementById("computer-score").innerText = 0;
    document.getElementById("result-text").innerText = "";
    document.getElementById("user-choice").innerText = "-";
    document.getElementById("computer-choice").innerText = "-";
    document.getElementById("reset-btn").style.display = "none";
}
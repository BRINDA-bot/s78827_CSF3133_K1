// Global state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = []; // Stores "Win", "Lose", or "Draw" for each round

// 1. Validate player name and start the game
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + Date();
}

// 2. Generate a random choice for the computer
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// 3. Play one round when the user clicks Rock, Paper, or Scissors
function playRound(playerChoice) {
    // Prevent playing before clicking Start Game
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();

    // Update player and computer images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let roundResult = "";
    let resultElement = document.getElementById("result");

    // Determine the winner using if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultElement.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultElement.style.color = "red";
    }

    // Store result in array and update scoreboard
    results.push(roundResult);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to the history table
    let roundNumber = results.length;
    let newRow = "<tr>" +
        "<td>" + roundNumber + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + roundResult + "</td>" +
        "</tr>";

    document.getElementById("historyBody").innerHTML += newRow;
}

// 4. Calculate total rounds and win percentage using a for loop and Math.round()
function showSummary() {
    if (results.length === 0) {
        alert("No rounds played yet.");
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let totalRounds = results.length;
    let winPercentage = Math.round((winCount / totalRounds) * 100);

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds + " rounds and won " + winPercentage + "%";
}

// 5. Reset scores, history table, arrays, and messages back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}
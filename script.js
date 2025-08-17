// script.js

const gameOutput = document.getElementById("game-output");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-command");

// Initial game state
let gameState = {
    location: "cave entrance",
    inventory: [],
    gameOver: false
};

// Function to display text in the output
function printOutput(text) {
    gameOutput.innerHTML += text + "\n\n";
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

// Game introduction
function startGame() {
    printOutput("You stand at the entrance of a mysterious cave. The air is cold, and a faint glow comes from inside.\n" +
        "Commands: 'enter cave', 'look around', 'inventory', 'quit'");
}
startGame();

// Handle player input
function handleCommand(command) {
    if (gameState.gameOver) {
        printOutput("The game has ended. Refresh the page to restart.");
        return;
    }

    command = command.toLowerCase().trim();

    switch (gameState.location) {
        case "cave entrance":
            if (command === "enter cave") {
                gameState.location = "inside cave";
                printOutput("You step inside the cave. It's dark, but you see a glowing object ahead.\n" +
                    "Commands: 'look around', 'pick up object', 'go back'");
            } else if (command === "look around") {
                printOutput("You see a large dark cave entrance. The forest is behind you.");
            } else if (command === "inventory") {
                printOutput("Inventory: " + (gameState.inventory.length ? gameState.inventory.join(", ") : "empty"));
            } else if (command === "quit") {
                gameState.gameOver = true;
                printOutput("You decided to quit. The cave remains a mystery...");
            } else {
                printOutput("Invalid command. Try again.");
            }
            break;

        case "inside cave":
            if (command === "look around") {
                printOutput("The cave walls glisten with moisture. The glowing object looks like a crystal.");
            } else if (command === "pick up object") {
                if (!gameState.inventory.includes("glowing crystal")) {
                    gameState.inventory.push("glowing crystal");
                    printOutput("You picked up the glowing crystal. It hums with strange energy.");
                } else {
                    printOutput("You already picked up the crystal.");
                }
            } else if (command === "go back") {
                gameState.location = "cave entrance";
                printOutput("You walk back to the cave entrance.");
            } else if (command === "inventory") {
                printOutput("Inventory: " + (gameState.inventory.length ? gameState.inventory.join(", ") : "empty"));
            } else if (command === "quit") {
                gameState.gameOver = true;
                printOutput("You left the cave. Adventure ends here.");
            } else {
                printOutput("Invalid command. Try again.");
            }
            break;
    }
}

// Event listeners
submitButton.addEventListener("click", () => {
    const command = userInput.value;
    if (command) {
        printOutput("> " + command);
        handleCommand(command);
        userInput.value = "";
    }
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submitButton.click();
    }
});

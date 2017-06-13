var totalGold = 30;
var prevGold = 30;

function Gold() {
    this.display = displayGold;
    this.add = addGold;
}

function displayGold() {
    // Clear the gold display before placing it in canvas.
    context.clearRect(0, canvasHeight - 20, 100, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Gold: " + totalGold, 0, canvasHeight - 10);
}

function addGold(amount) {
    prevGold = totalGold;
    totalGold += amount;
}
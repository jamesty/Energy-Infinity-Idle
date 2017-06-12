var totalEnergy = 0;
var prevEnergy = 0;

var energyCellCount = 0;
var energyCellCost = 10;

function displayEnergy() {
    // Clear the energy display before placing it in canvas.
    context.clearRect(100, canvasHeight - 20, 200, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Energy: " + totalEnergy, 100, canvasHeight - 10);
}

function buyEnergyCell() {
    if (totalGold >= energyCellCost) {
        totalGold -= energyCellCost;
        energyCellCount += 1;
        energyCellCost *= 2;
        return true;
    } else {
        displayInformationText("Not enough gold.", "red");
        return false;
    }
}

function placeEnergyCell(x, y) {
    var newEnergyBuilding = new Image();
    newEnergyBuilding.onload = function () {
        context.drawImage(newEnergyBuilding, x, y);
    }
    newEnergyBuilding.src = "images/EnergyBuilding.png";
}

function addEnergy(amp) {
    prevEnergy = totalEnergy + amp;
    totalEnergy += energyCellCount + amp;
}

function sellEnergyCell() {
    energyCellCount -= 1;
    energyCellCost /= 2;
    addGold(energyCellCost);
}

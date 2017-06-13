var totalEnergy = 0;
var prevEnergy = 0;

function displayEnergy() {
    // Clear the energy display before placing it in canvas.
    context.clearRect(100, canvasHeight - 20, 200, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Energy: " + totalEnergy, 100, canvasHeight - 10);
}

function addEnergy(amp) {
    prevEnergy = totalEnergy + amp;
    totalEnergy += energyCellCount + amp;
}

function sellEnergy(amp) {
    if (energySellerCount + amp <= totalEnergy) {
        totalEnergy -= energySellerCount + amp;
        totalGold += energySellerCount + amp;
        displayEnergy();
        displayGold();
    }
}
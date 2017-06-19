var energyRate;
var goldRate;

function displayEnergy() {
    // Clear the energy display before placing it in canvas.
    context.clearRect(100, canvasHeight - 20, 200, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Energy: " + totalEnergy, 100, canvasHeight - 10);
}

function addEnergy(amp) {
    totalEnergy += (energyCellCount + amp) * (energyUpgrades + 1);
	energyRate = (energyCellCount + amp) * (energyUpgrades + 1);
}

function sellEnergy(amp) {
    if (energySellerCount + amp <= totalEnergy) {
        totalEnergy -= (energySellerCount + amp) * (energySellerUpgrades + 1);
        totalGold += (energySellerCount + amp) * (energySellerUpgrades + 1);
		goldRate = (energySellerCount + amp) * (energySellerUpgrades + 1);
        displayEnergy();
        displayGold();
    }
}
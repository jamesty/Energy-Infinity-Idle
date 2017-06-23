var energyRate;
var goldRate;

function displayEnergy() {
    // Clear the energy display before placing it in canvas.
    context.clearRect(100, canvasHeight - 20, 200, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Energy: " + totalEnergy + "/" + (batteryCount * 1000), 100, canvasHeight - 10);
}

function addEnergy(amp) {
	var newEnergy = (energyCellCount + amp) * (energyUpgrades + 1);
	if (totalEnergy + newEnergy >= 1000 * batteryCount) {
		totalEnergy = (1000 * batteryCount) + 1;
	} else {
		totalEnergy += newEnergy;
	}
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
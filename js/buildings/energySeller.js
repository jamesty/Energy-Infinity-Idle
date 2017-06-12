var energySellerCost = 10;
var energySellerCount = 0;

function buyEnergySeller() {
    if (totalGold >= energySellerCost) {
        totalGold -= energySellerCost;
        energySellerCount += 1;
        energySellerCost *= 2;
        return true;
    } else {
        displayInformationText("Not enough gold.", "red");
        return false;
    }
}

function placeEnergySeller(x, y) {
    var newEnergySeller = new Image();
    newEnergySeller.onload = function () {
        context.drawImage(newEnergySeller, x, y);
    }
    newEnergySeller.src = "images/EnergySeller.png";
}

function sellEnergy(amp) {
    if (energySellerCount + amp <= totalEnergy) {
        totalEnergy -= energySellerCount + amp;
        totalGold += energySellerCount + amp;
        displayEnergy();
        displayGold();
    }
}

function sellEnergySeller() {
    energySellerCount -= 1;
    energySellerCost /= 2;
    addGold(energySellerCost);
}
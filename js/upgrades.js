function renderUpgrades() {
    context.clearRect(canvasWidth - 190, 0, 200, 200);
    context.font = "30px arial";
    context.strokeText("Upgrades", canvasWidth - 160, 30);
    var energyUpgrade = new Image();
    energyUpgrade.onload = function () {
        context.drawImage(energyUpgrade, canvasWidth - 180, 70);
    }
    energyUpgrade.src = "images/EnergyBuildingUP.png";
	var energySellerUpgrade = new Image();
    energySellerUpgrade.onload = function () {
        context.drawImage(energySellerUpgrade, canvasWidth - 155, 70);
    }
	energySellerUpgrade.src = "images/EnergySellerUP.png";
}

function upgradeEnergyGenerators() {
    if (research >= energyUpgradeCost) {
        research -= 500;
		energyUpgradeCost *= 2;
        energyUpgrades += 1;
    } else {
        displayInformationText("Not enough research.", "red");
        return false;
    }
}

function upgradeEnergySellers() {
    if (research >= energySellerUpgradeCost) {
        research -= 500;
		energySellerUpgradeCost *= 2;
        energySellerUpgrades += 1;
    } else {
        displayInformationText("Not enough research.", "red");
        return false;
    }
}

function clickedIcon(x, y) {
    var location = {
        top: 70 + canvasRect.top,
        bottom: 70 + 25 + canvasRect.top,
        left: canvasWidth - 180 + canvasRect.left,
        right: canvasWidth - 180 + 25 + canvasRect.left,
    };
    return location;
}

function clickedUpgrade(x, y) {
    var bounds = {
        left: canvasWidth - 190 + canvasRect.left,
        right: canvasWidth - 190 + 180 + canvasRect.left,
        top: canvasHeight - 290 + canvasRect.top,
        bottom: canvasHeight - 290 + 45 + canvasRect.top
    };
    if (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom) {
        return true;
    }
    return false;
}
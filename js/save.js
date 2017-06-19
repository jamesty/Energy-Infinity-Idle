var reset = false;

function saveGame() {
    var buildings = {
        energyUpgrades: energyUpgrades,
		energyUpgradeCost: energyUpgradeCost,
        energyCellCost: energyCellCost,
        energyCellCount: energyCellCount,
        energySellerCost: energySellerCost,
        energySellerCount: energySellerCount,
		energySellerUpgrades: energySellerUpgrades,
		energySellerUpgradeCost: energySellerUpgradeCost,
        labCost: labCost,
        labCount: labCount,
        ampCost: ampCost,
        ampCount: ampCount,
        ampLocations: ampLocations
    };
    var convertedGrid = {}
    for (var x = 0; x < grid.length; x++) {
        convertedGrid[x] = grid[x];
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "save.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("gold=" + totalGold + "&energy=" + totalEnergy +
        "&research=" + research + "&buildings=" + JSON.stringify(buildings) + "&grid=" + JSON.stringify(convertedGrid));
}

function loadGame() {
    totalGold = savedGold;
    totalEnergy = savedEnergy;
    research = savedResearch;
    if (typeof savedBuildings == "string") {
        savedBuildings = JSON.parse(savedBuildings);
    }
    energyUpgrades = savedBuildings.energyUpgrades;
    energyCellCost = savedBuildings.energyCellCost;
    energyCellCount = savedBuildings.energyCellCount;
    energySellerCost = savedBuildings.energySellerCost;
    energySellerCount = savedBuildings.energySellerCount;
    labCost = savedBuildings.labCost;
    labCount = savedBuildings.labCount;
    ampCost = savedBuildings.ampCost;
    ampCount = savedBuildings.ampCount;
    ampLocations = savedBuildings.ampLocations;
	
	// Check if these values have been set on the database
	if (savedBuildings.energyUpgradeCost == null) {
		energyUpgradeCost = 500;
	} else {
		energyUpgradeCost = savedBuildings.energyUpgradeCost;
	}
	if (savedBuildings.energySellerUpgrades == null) {
		energySellerUpgrades = 0;
	} else {
		energySellerUpgrades = savedBuildings.energySellerUpgrades;
	}
	
	if (savedBuildings.energySellerUpgradeCost == null) {
		energySellerUpgradeCost = 500;
	} else {
		energySellerUpgradeCost = savedBuildings.energySellerUpgradeCost;
	}

    if (savedGrid.length == 0) {
        createGrid();
    } else {
        var storedGrid = savedGrid;
        grid = new Array(24);
        for (var x = 0; x < 24; x++) {
            grid[x] = storedGrid[x];
        }
    }
}

function resetGame() {
    reset = true;
    localStorage.clear();
    location.reload();
}

/**
 * Checks if the object is empty.
 */
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
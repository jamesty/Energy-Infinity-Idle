var reset = false;

function saveGame() {
    localStorage.gold = totalGold;
    localStorage.energy = totalEnergy;
    localStorage.research = research;
    localStorage.energyCellCost = energyCellCost;
    localStorage.sellerCost = energySellerCost;
    localStorage.labCost = labCost;
    localStorage.ampCost = ampCost
    localStorage.energyCellCount = energyCellCount;
    localStorage.sellerCount = energySellerCount;
    localStorage.labCount = labCount;
    localStorage.ampCount = ampCount;
    localStorage.ampLoc = JSON.stringify(ampLocations);
    localStorage.grid = JSON.stringify(grid);
}

function loadGame() {
    if (localStorage.gold != null) {
        totalGold = parseInt(localStorage.gold);
    }
    if (localStorage.energy != null) {
        totalEnergy = parseInt(localStorage.energy);
    }
    if (localStorage.research != null) {
        research = parseInt(localStorage.research);
    }
    if (localStorage.ampCost != null) {
        ampCost = parseInt(localStorage.ampCost);
    }
    if (localStorage.energyCellCost != null) {
        energyCellCost = parseInt(localStorage.energyCellCost);
    }
    if (localStorage.sellerCost != null) {
        energySellerCost = parseInt(localStorage.sellerCost);
    }
    if (localStorage.labCost != null) {
        labCost = parseInt(localStorage.labCost);
    }
    if (localStorage.ampCount != null) {
        ampCount = parseInt(localStorage.ampCount);
    }
    if (localStorage.energyCellCount != null) {
        energyCellCount = parseInt(localStorage.energyCellCount);
    }
    if (localStorage.sellerCount != null) {
        energySellerCount = parseInt(localStorage.sellerCount);
    }
    if (localStorage.labCount != null) {
        labCount = parseInt(localStorage.labCount);
    }
    if (localStorage.ampLoc != null) {
        ampLocations = JSON.parse(localStorage.ampLoc);
    }
    if (localStorage.grid != null) {
        var storedGrid = JSON.parse(localStorage.grid);
        grid = new Array(24);
        for (var x = 0; x < storedGrid.length; x++) {
            grid[x] = storedGrid[x];
        }
    }
}

function resetGame() {
    reset = true;
    localStorage.clear();
    location.reload();
}
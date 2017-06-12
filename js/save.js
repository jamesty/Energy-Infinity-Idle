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
    if (localStorage.ampLoc != []) {
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
    location.reload();
    localStorage.energy = 0;
    localStorage.gold = 1000;
    localStorage.research = 0;
    localStorage.energyCellCost = 10;
    localStorage.energySellerCost = 10;
    localStorage.labCost = 50;
    localStorage.ampCost = 500;
    localStorage.energyCellCount = 0;
    localStorage.sellerCount = 0;
    localStorage.labCount = 0;
    localStorage.ampCount = 0;
    localStorage.ampLoc = [];
    grid = new Array(24);
    for (var x = 0; x < grid.length; x++) {
        grid[x] = new Array(23);
        for (var y = 0; y < grid[x].length; y++) {
            grid[x][y] = { building: false };
        }
    }
    localStorage.grid = JSON.stringify(grid);
}
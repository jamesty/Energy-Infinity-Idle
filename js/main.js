var canvas;
var context;
var canvasWidth;
var canvasHeight;
var canvasRect;

var grid;
var cellSizeX = 25;
var cellSizeY = 25;
var cellSelect = false;
var cellSelectX;
var cellSelectY;

var sellBuildingMode = false;
var upgradeBar = false;

/**
 * Initialize canvas and canvas contents.
 */
function init() {
    canvas = document.getElementById("container");
    context = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    canvasRect = canvas.getBoundingClientRect();
    // Check for a saved game and load it if available.
    loadGame();
	displayMessages();
    renderGrid();
    renderBuildings();
    renderBuildBar();
    renderMarket();
    displayGold();
    displayEnergy();
    displayResearch();
    renderInformationBox();
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mousemove", onHover);
    var incrementEnergy = setInterval("gameTick()", 1000);

    // Save the game if the user exits out of the game.
    window.onbeforeunload = function () {
        saveGame();
    }
}

/**
 * Handles all events executed on a game tick.
 */
function gameTick() {
    var amp = amplifyCells();
    addEnergy(amp.energy);
    sellEnergy(amp.seller);
    convertEnergy(amp.lab);
    displayGold();
    displayEnergy();
    displayResearch();
}

/**
 * Initializes the grid object.
 */
function createGrid() {
    // Initialize two-dimensional grid array if it does not exist.
    grid = new Array(24);
	var l = grid.length;
    for (var x = 0; x < l; x++) {
        grid[x] = new Array(23);
        for (var y = 0; y < grid[x].length; y++) {
            grid[x][y] = {building: false, id: 0};
        }
    }
}

/**
 * Render a grid into the canvas.
 */
function renderGrid() {
    for (var x = 0; x <= canvasWidth - 200; x += cellSizeX) {
        context.moveTo(x, 0)
        context.lineTo(x, canvasHeight - 25);
    }

    for (var y = 0; y <= canvasHeight - 25; y += cellSizeY) {
        context.moveTo(0, y);
        context.lineTo(canvasWidth - 200, y);
    }
    context.strokeStyle = "black";
    context.stroke();
}

/**
 * Converts the given ID into the building it represents.
 * @param {any} id The ID number stored on the grid cell.
 */
function IDtoBuilding(id) {
    if (id == 1) {
        return new EnergyCell();
    } else if (id == 2) {
        return new Seller();
    } else if (id == 3) {
        return new Lab();
    } else if (id == 4) {
        return new Amplifier();
    } else if (id == 5) {
		return new Battery();
	} else {
        // Return empty class in case id is not a building.
        return new class {
            place() { }
            buy() { }
            sell() { }
            icon() { }
        };
    }
}

/**
 * Renders all the placed buildings into the grid.
 */
function renderBuildings() {
	var gridl = grid.length;
    for (var x = 0; x < gridl; x++) {
		var gridxl = grid[x].length;
        for (var y = 0; y < gridxl; y++) {
            if (grid[x][y].building) {
                IDtoBuilding(grid[x][y].id).place(x * 25, y * 25);
            }
        }
    }
}

/**
 * Renders the buildings side bar.
 */
function renderBuildBar() {
    context.clearRect(canvasWidth - 190, 0, 200, 200);
    context.font = "30px arial";
    context.strokeText("Buildings", canvasWidth - 160, 30);
    var energyCell = new Image();
    energyCell.onload = function () {
        context.drawImage(energyCell, canvasWidth - 180, 70);
    }
    energyCell.src = "images/EnergyBuilding.png";
    var energySeller = new Image();
    energySeller.onload = function () {
        context.drawImage(energySeller, canvasWidth - 155, 70);
    }
    energySeller.src = "images/EnergySeller.png";
    var lab = new Image();
    lab.onload = function () {
        context.drawImage(lab, canvasWidth - 130, 70);
    }
    lab.src = "images/Lab.png";
    var amp = new Image();
    amp.onload = function () {
        context.drawImage(amp, canvasWidth - 105, 70);
    }
    amp.src = "images/Amp.png";
    var battery = new Image();
    battery.onload = function () {
        context.drawImage(battery, canvasWidth - 80, 70);
    }
    battery.src = "images/Battery.png";
}

/**
 * Renders the tools available on the sidebar.
 */
function renderMarket() {
    context.strokeStyle = "black";
    context.strokeRect(canvasWidth - 190, canvasHeight - 290, 180, 40);
    context.strokeRect(canvasWidth - 190, canvasHeight - 245, 180, 40);
    context.strokeRect(canvasWidth - 190, canvasHeight - 200, 180, 40);
    context.font = "14px serif"
    context.strokeText("Upgrades", canvasWidth - 180, canvasHeight - 270);
    context.strokeText("Sell Buildings", canvasWidth - 180, canvasHeight - 225);
}

/**
 * Handles all the click events in the canvas.
 * @param {any} event The location of the event.
 */
var onClick = function (event) {
    // Get the grid indices from the clicked coordinate.
    var x = Math.floor((event.x - canvasRect.left) / 25);
    var y = Math.floor((event.y - canvasRect.top) / 25);
    var energy = new EnergyCell();
    var seller = new Seller();
    var lab = new Lab();
    var amp = new Amplifier();
	var battery = new Battery();
    // Check if player clicked on grid or other options.
    if (x < grid.length && y < grid[0].length && sellBuildingMode) {
        // Player clicked on grid while in sell building mode
        // Check if the clicked grid contains any building.
        if (grid[x][y].building == true) {
            context.clearRect(1 + x * cellSizeX, 1 + y * cellSizeY, 23, 23);
            IDtoBuilding(grid[x][y].id).sell(x, y);
            grid[x][y].building = false;
        }
    } else if (x < grid.length && y < grid[0].length && !cellSelect && !grid[x][y].building) {
        // Player clicked on grid without nothing selected.
        context.fillStyle = "yellow";
        context.fillRect(1 + x * cellSizeX, 1 + y * cellSizeY, 23, 23);
        cellSelect = true;
        cellSelectX = x;
        cellSelectY = y;
    } else if (x < grid.length && y < grid[0].length && cellSelect && !grid[x][y].building) {
        // Player clicked on grid with another cell already selected.
        context.clearRect(1 + cellSelectX * cellSizeX, 1 + cellSelectY * cellSizeY, 23, 23);
        context.fillStyle = "yellow";
        context.fillRect(1 + x * cellSizeX, 1 + y * cellSizeY, 23, 23);
        cellSelectX = x;
        cellSelectY = y;
    } else if (cellSelect && !upgradeBar) {
        // Player has selected a cell and clicked on building option.
        // Place a building on the selected cell and remove selection.
        if (energy.clicked(event.x, event.y)) {
            if (IDtoBuilding(1).buy()) {
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].id = 1;
                IDtoBuilding(1).place(cellSelectX * 25, cellSelectY * 25);
            }
        } else if (seller.clicked(event.x, event.y)) {
            if (IDtoBuilding(2).buy()) {
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].id = 2;
                IDtoBuilding(2).place(cellSelectX * 25, cellSelectY * 25);
            }
        } else if (lab.clicked(event.x, event.y)) {
            if (IDtoBuilding(3).buy()) {
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].id = 3;
                IDtoBuilding(3).place(cellSelectX * 25, cellSelectY * 25);
            }
        } else if (amp.clicked(event.x, event.y)) {
            if (IDtoBuilding(4).buy()) {
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].id = 4;
                IDtoBuilding(4).place(cellSelectX * 25, cellSelectY * 25);
            }
        } else if (battery.clicked(event.x, event.y)) {
			if (IDtoBuilding(5).buy()) {
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].id = 5;
                IDtoBuilding(5).place(cellSelectX * 25, cellSelectY * 25);
			}
		}
        cellSelect = false;
        context.clearRect(1 + cellSelectX * cellSizeX, 1 + cellSelectY * cellSizeY, 23, 23);
        cellSelectX = null;
        cellSelectY = null;
    } else if (upgradeBar) {
		// User is in upgrade mode.
        if (energy.clicked(event.x, event.y)) {
            upgradeEnergyGenerators();
        } else if (seller.clicked(event.x, event.y)) {
			upgradeEnergySellers();
		}
    }

    // If player clicked sell building mode or player wants to get out of mode.
    var buildingSell = {
        left: canvasWidth - 190 + canvasRect.left,
        top: canvasHeight - 245 + canvasRect.top,
        bottom: canvasHeight - 245 + 40 + canvasRect.top,
        right: canvasWidth - 190 + 180 + canvasRect.left,
    };
    if (event.x >= buildingSell.left && event.y >= buildingSell.top && event.x <= buildingSell.right && event.y <= buildingSell.bottom) {
        if (sellBuildingMode) {
            cellSelect = false;
            sellBuildingMode = false;
            clearInfoBox();
        } else {
            sellBuildingMode = true;
            clearInfoBox();
            displayInformationText("Sell building mode.\nClick any building to sell it.\nClick again to leave mode.", "black");
        }
    }

    // If player clicked on upgrades button.
    if (clickedUpgrade(event.x, event.y)) {
        if (upgradeBar) {
            renderBuildBar();
            upgradeBar = false;
        } else {
            renderUpgrades();
            upgradeBar = true;
        }
    }
}

/**
 * Handles the information being displayed on the information box.
 * @param {any} event
 */
var onHover = function (event) {
    var energy = new EnergyCell();
    var seller = new Seller();
    var lab = new Lab();
    var amp = new Amplifier();
	var battery = new Battery();
    var buildingSell = {
        left: canvasWidth - 190 + canvasRect.left,
        top: canvasHeight - 245 + canvasRect.top,
        bottom: canvasHeight - 245 + 40 + canvasRect.top,
        right: canvasWidth - 190 + 180 + canvasRect.left,
    };
    var energySell = {
        left: canvasWidth - 190 + canvasRect.left,
        top: canvasHeight - 200 + canvasRect.top,
        bottom: canvasHeight - 200 + 40 + canvasRect.top,
        right: canvasWidth - 190 + 180 + canvasRect.left,
    };
    if (sellBuildingMode) {
        // Displayed information is cancelled if player is in sell mode.
    } else if (upgradeBar) {
        // Display different information if player is in upgrade mode.
        if (energy.clicked(event.x, event.y)) {
            displayInformationText("Upgrade Energy Cells\nCost: " + energyUpgradeCost + "r\nCurrent: " + (energyUpgrades + 1)
                + "e/s\nNext: " + (energyUpgrades + 2) + "e/s", "black");
        } else if (seller.clicked(event.x, event.y)) {
			displayInformationText("Upgrade Seller Cells\nCost: " + energySellerUpgradeCost + "r\nCurrent: " + (energySellerUpgrades + 1)
                + "e/s\nNext: " + (energySellerUpgrades + 2) + "e/s", "black");
		} else {
            clearInfoBox();
        }
    } else if (event.x >= buildingSell.left && event.y >= buildingSell.top && event.x <= buildingSell.right && event.y <= buildingSell.bottom) {
        displayInformationText("Sell Buildings", "black");
    } else if (energy.clicked(event.x, event.y)) {
        displayInformationText("Energy Cell\nCost: " + energyCellCost + "g\nProduces: 1e/s\nNo. of Cells: " + energyCellCount +
								"\nCurrent rate: " + energyRate, "black");
    } else if (seller.clicked(event.x, event.y)) {
        displayInformationText("Energy Seller\nCost: " + energySellerCost + "g\nSells: 1e/s\nNo. of Sellers: " + energySellerCount +
								"\nCurrent rate: " + goldRate, "black");
    } else if (lab.clicked(event.x, event.y)) {
        displayInformationText("Research Lab\nCost: " + labCost + "g\nResearches: 1r/s\nNo. of Labs: " + labCount +
								"\nCurrent rate: " + researchRate, "black");
    } else if (amp.clicked(event.x, event.y)) {
        displayInformationText("Amplifier\nCost: " + ampCost + "g\nAmplifies top and bottom \ncell.\nNo. of Amps: " + ampCount, "black");
    } else if (battery.clicked(event.x, event.y)) {
		displayInformationText("Battery\c Cost: " + batteryCost + "g\nIncreases energy capacity\nby 1000.\nNo. of Batteries: " +
								batteryCount, "black");
	} else {
        clearInfoBox();
    }
}
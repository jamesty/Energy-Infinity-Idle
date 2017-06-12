var canvas;
var context;
var canvasWidth;
var canvasHeight;

var grid;
var cellSizeX = 25;
var cellSizeY = 25;
var cellSelect = false;
var cellSelectX;
var cellSelectY;

var sellBuildingMode = false;

/**
 * Initialize canvas and canvas contents.
 */
function init() {
    canvas = document.getElementById("container");
    context = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    // Check for a saved game and load it if available.
    loadGame();
    createGrid();
    renderGrid();
    renderBuildings();
    renderBuildBar();
    renderMarket();
    displayEnergy();
    displayGold();
    displayResearch();
    renderInformationBox();
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mousemove", onHover);
    var incrementEnergy = setInterval("gameTick()", 1000);

    window.onbeforeunload = function () {
        if (typeof (Storage) !== "undefined") {
            saveGame();
        } else {
            alert("This browser does not support local storage.");
        }
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
    if (grid == null) {
        grid = new Array(24);
        for (var x = 0; x < grid.length; x++) {
            grid[x] = new Array(23);
            for (var y = 0; y < grid[x].length; y++) {
                grid[x][y] = {
                    building: false,
                    energy: false,
                    seller: false,
                    lab: false,
                    amp: false
                };
            }
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
 * Renders all the placed buildings into the grid.
 */
function renderBuildings() {
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            if (grid[x][y].energy) {
                placeEnergyCell(x * 25, y * 25);
            } else if (grid[x][y].seller) {
                placeEnergySeller(x * 25, y * 25);
            } else if (grid[x][y].lab) {
                placeLab(x * 25, y * 25);
            } else if (grid[x][y].amp) {
                placeAmp(x * 25, y * 25);
            }
        }
    }
}

/**
 * Renders the buildings side bar.
 */
function renderBuildBar() {
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
    lab.src = "images/lab.png";
    var amp = new Image();
    amp.onload = function () {
        context.drawImage(amp, canvasWidth - 105, 70);
    }
    amp.src = "images/Amp.png";

}

/**
 * Renders the tools available on the sidebar.
 */
function renderMarket() {
    context.strokeStyle = "black";
    context.strokeRect(canvasWidth - 190, canvasHeight - 245, 180, 40);
    context.strokeRect(canvasWidth - 190, canvasHeight - 200, 180, 40);
    context.font = "14px serif"
    context.strokeText("Sell Buildings", canvasWidth - 180, canvasHeight - 225);
}

/**
 * Handles all the click events in the canvas.
 * @param {any} event The location of the event.
 */
var onClick = function (event) {
    var canvasRect = canvas.getBoundingClientRect();
    // Get the grid indices from the clicked coordinate.
    var x = Math.floor((event.x - canvasRect.left) / 25);
    var y = Math.floor((event.y - canvasRect.top) / 25);
    // Check if player clicked on grid or other options.
    if (x < grid.length && y < grid[0].length && sellBuildingMode) {
        // Player clicked on grid while in sell building mode 
        context.clearRect(1 + x * cellSizeX, 1 + y * cellSizeY, 23, 23);
        if (grid[x][y].energy) {
            sellEnergyCell();
            grid[x][y].energy = false;
        } else if (grid[x][y].seller) {
            sellEnergySeller();
            grid[x][y].seller = false;
        } else if (grid[x][y].lab) {
            sellLab();
            grid[x][y].lab = false;
        } else if (grid[x][y].amp) {
            sellAmp(x, y);
            grid[x][y].amp = false;
        }
        grid[x][y].building = false;
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
    } else if (cellSelect) {
        // Player has selected a cell and clicked on building option.
        // Place a building on the selected cell and remove selection.
        var energy = {
            top: 70 + canvasRect.top,
            bottom: 70 + cellSizeY + canvasRect.top,
            left: canvasWidth - 180 + canvasRect.left,
            right: canvasWidth - 180 + cellSizeX + canvasRect.left
        }
        var seller = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 155 + canvasRect.left,
            right: canvasWidth - 155 + 25 + canvasRect.left
        }
        var lab = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 130 + canvasRect.left,
            right: canvasWidth - 130 + 25 + canvasRect.left
        }
        var amp = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 105 + canvasRect.left,
            right: canvasWidth - 105 + cellSizeX + canvasRect.left
        }
        if (event.x>= energy.left && event.x <= energy.right && event.y>= energy.top && event.y <= energy.bottom) {
            if (buyEnergyCell()) {
                placeEnergyCell(cellSelectX * 25, cellSelectY * 25);
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].energy = true;
            }
        } else if (event.x >= seller.left && event.x <= seller.right && event.y >= seller.top && event.y <= seller.bottom) {
            if (buyEnergySeller()) {
                placeEnergySeller(cellSelectX * 25, cellSelectY * 25);
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].seller = true;
            }
        } else if (event.x >= lab.left && event.x <= lab.right && event.y >= lab.top && event.y <= lab.bottom) {
            if (buyLab()) {
                placeLab(cellSelectX * 25, cellSelectY * 25);
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].lab = true;
            }
        } else if (event.x >= amp.left && event.x <= amp.right && event.y >= amp.top && event.y <= amp.bottom) {
            if (buyAmp()) {
                placeAmp(cellSelectX * 25, cellSelectY * 25);
                grid[cellSelectX][cellSelectY].building = true;
                grid[cellSelectX][cellSelectY].amp = true;
            }
        }
        cellSelect = false;
        context.clearRect(1 + cellSelectX * cellSizeX, 1 + cellSelectY * cellSizeY, 23, 23);
        cellSelectX = null;
        cellSelectY = null;
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
}

/**
 * Handles the information being displayed on the information box.
 * @param {any} event
 */
var onHover = function (event) {
    var canvasRect = canvas.getBoundingClientRect();
    var energyTop = 70 + canvasRect.top;
    var energyBottom = 70 + 25 + canvasRect.top;
    var energyLeft = canvasWidth - 180 + canvasRect.left;
    var energyRight = canvasWidth - 180 + 25 + canvasRect.left;
    var energySell = {
        left: canvasWidth - 190 + canvasRect.left,
        top: canvasHeight - 200 + canvasRect.top,
        bottom: canvasHeight - 200 + 40 + canvasRect.top,
        right: canvasWidth - 190 + 180 + canvasRect.left,
    };
    var buildingSell = {
        left: canvasWidth - 190 + canvasRect.left,
        top: canvasHeight - 245 + canvasRect.top,
        bottom: canvasHeight - 245 + 40 + canvasRect.top,
        right: canvasWidth - 190 + 180 + canvasRect.left,
    };
    var seller = {
        top: 70 + canvasRect.top,
        bottom: 70 + 25 + canvasRect.top,
        left: canvasWidth - 155 + canvasRect.left,
        right: canvasWidth - 155 + 25 + canvasRect.left,
    }
    var lab = {
        top: 70 + canvasRect.top,
        bottom: 70 + 25 + canvasRect.top,
        left: canvasWidth - 130 + canvasRect.left,
        right: canvasWidth - 130 + 25 + canvasRect.left,
    }
    var amp = {
        top: 70 + canvasRect.top,
        bottom: 70 + 25 + canvasRect.top,
        left: canvasWidth - 105 + canvasRect.left,
        right: canvasWidth - 105 + cellSizeX + canvasRect.left
    }
    if (sellBuildingMode) {

    } else if (event.x >= buildingSell.left && event.y >= buildingSell.top && event.x <= buildingSell.right && event.y <= buildingSell.bottom) {
        displayInformationText("Sell Buildings", "black");
    } else if (event.x >= energyLeft && event.x <= energyRight && event.y >= energyTop && event.y <= energyBottom) {
        displayInformationText("Energy Cell\nCost: " + energyCellCost + "g\nProduces: 1e/s\nNo. of Cells: " + energyCellCount, "black");
    } else if (event.x >= seller.left && event.x <= seller.right && event.y >= seller.top && event.y <= seller.bottom) {
        displayInformationText("Energy Seller\nCost: " + energySellerCost + "g\nSells: 1e/s\nNo. of Sellers: " + energySellerCount, "black");
    } else if (event.x >= lab.left && event.x <= lab.right && event.y >= lab.top && event.y <= lab.bottom) {
        displayInformationText("Research Lab\nCost: " + labCost + "g\nResearches: 1r/s\nNo. of Labs: " + labCount, "black");
    } else if (event.x >= amp.left && event.x <= amp.right && event.y >= amp.top && event.y <= amp.bottom) {
        displayInformationText("Amplifier\nCost: " + ampCost + "g\nAmplifies top and bottom \ncell.\nNo. of Amps: " + ampCount, "black");
    } else {
        clearInfoBox();
    }
}
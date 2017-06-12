var labCount = 0;
var labCost = 50;

var research = 0;

function buyLab() {
    if (totalGold >= labCost) {
        totalGold -= labCost;
        labCount += 1;
        labCost *= 2;
        return true;
    } else {
        displayInformationText("Not enough gold.", "red");
        return false;
    }
}

function placeLab(x, y) {
    var newLab = new Image();
    newLab.onload = function () {
        context.drawImage(newLab, x, y);
    }
    newLab.src = "images/Lab.png";
}

function convertEnergy(amp) {
    if ((labCount + amp) * 2 <= totalEnergy) {
        research += labCount + amp;
        totalEnergy -= (amp + labCount) * 2;
    }
}

function sellLab() {
    labCount -= 1;
    labCost /= 2;
    addGold(labCost);
}

function displayResearch() {
    // Clear the research display before placing it in canvas.
    context.clearRect(200, canvasHeight - 20, 250, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Research Points: " + research, 200, canvasHeight - 10);
}
class EnergyCell {
    place(x, y) {
        var newEnergyBuilding = new Image();
        newEnergyBuilding.onload = function () {
            context.drawImage(newEnergyBuilding, x, y);
        }
        newEnergyBuilding.src = "images/EnergyBuilding.png";
    }

    buy() {
        if (totalGold >= energyCellCost) {
            totalGold -= energyCellCost;
            energyCellCount += 1;
            energyCellCost *= 2;
            return true;
        } else {
            displayInformationText("Not enough gold.", "red");
            return false;
        }
    }

    sell() {
        energyCellCount -= 1;
        energyCellCost /= 2;
        addGold(energyCellCost);
    }

    icon() {
        var location = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 180 + canvasRect.left,
            right: canvasWidth - 180 + 25 + canvasRect.left,
        };
        return location;
    }

    clicked(x, y) {
        var iconLoc = this.icon();
        if (x >= iconLoc.left && y >= iconLoc.top && x <= iconLoc.right && y <= iconLoc.bottom) {
            return true;
        }
        return false;
    }
}
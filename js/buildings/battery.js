class Battery {
    place(x, y) {
        var newBattery = new Image();
        newBattery.onload = function () {
            context.drawImage(newBattery, x, y);
        }
        newBattery.src = "images/Battery.png";
    }

    buy() {
        if (totalGold >= batteryCost) {
            totalGold -= batteryCost;
            batteryCount += 1;
            batteryCost *= 2;
            return true;
        } else {
            displayInformationText("Not enough gold.", "red");
            return false;
        }
    }

    sell(x, y) {
        batteryCount -= 1;
        batteryCost /= 2;
        addGold(batteryCost);
    }

    icon() {
        var location = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 80 + canvasRect.left,
            right: canvasWidth - 80 + cellSizeX + canvasRect.left
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
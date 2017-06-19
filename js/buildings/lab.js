class Lab {
    place(x, y) {
        var newLab = new Image();
        newLab.onload = function () {
            context.drawImage(newLab, x, y);
        }
        newLab.src = "images/Lab.png";
    }

    buy() {
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

    sell() {
        labCount -= 1;
        labCost /= 2;
        addGold(labCost);
    }

    icon() {
        var location = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 130 + canvasRect.left,
            right: canvasWidth - 130 + 25 + canvasRect.left
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
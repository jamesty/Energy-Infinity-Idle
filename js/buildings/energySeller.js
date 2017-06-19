class Seller {
    place(x, y) {
        var newEnergySeller = new Image();
        newEnergySeller.onload = function () {
            context.drawImage(newEnergySeller, x, y);
        }
        newEnergySeller.src = "images/EnergySeller.png";
    }

    buy() {
        if (totalGold >= energySellerCost) {
            totalGold -= energySellerCost;
            energySellerCount += 1;
            energySellerCost *= 2;
            return true;
        } else {
            displayInformationText("Not enough gold.", "red");
            return false;
        }
    }

    sell() {
        energySellerCount -= 1;
        energySellerCost /= 2;
        addGold(energySellerCost);
    }

    icon() {
        var location = {
            top: 70 + canvasRect.top,
            bottom: 70 + 25 + canvasRect.top,
            left: canvasWidth - 155 + canvasRect.left,
            right: canvasWidth - 155 + 25 + canvasRect.left,
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
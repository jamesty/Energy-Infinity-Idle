function renderInformationBox() {
    context.strokeStyle = "black";
    context.strokeRect(canvasWidth - 190, canvasHeight - 150, 180, 140);
}

function clearInfoBox() {
    context.clearRect(canvasWidth - 190, canvasHeight - 150, 180, 140);
}

function displayInformationText(text, color) {
    clearInfoBox();
    var textArray = text.split("\n");
    var y = canvasHeight - 130;
    context.font = "14px arial";
    context.fillStyle = color;
    for (var i = 0; i < textArray.length; i++) {
        context.fillText(textArray[i], canvasWidth - 180, y);
        y += 14;
    }
}
var researchRate;

function convertEnergy(amp) {
    if ((labCount + amp) * 2 <= totalEnergy) {
        research += labCount + amp;
        totalEnergy -= (amp + labCount) * 2;
    }
	researchRate = labCount + amp;
}

function displayResearch() {
    // Clear the research display before placing it in canvas.
    context.clearRect(200, canvasHeight - 20, 250, 20);
    context.font = "14px arial";
    context.fillStyle = "black";
    context.fillText("Research Points: " + research, 200, canvasHeight - 10);
}
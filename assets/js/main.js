var totalScore = 0;

function clearAll() {
    clearAuto();
    clearTele();
    clearEnd();
    updateScores();
}

////////////////////////////////
//AUTONOMOUS
////////////////////////////////
var stones = 0;
var skystones = 0;
var placed = 0;
var foundation = false;
var parking = 0;
var autoScore = 0;

//Update Scores
function updateScores() {
    document.getElementById("auto").innerHTML = autoScore;
    document.getElementById("auto2").innerHTML = autoScore;
    document.getElementById("tele").innerHTML = teleScore;
    document.getElementById("tele2").innerHTML = teleScore;
    document.getElementById("end").innerHTML = endScore;
    document.getElementById("end2").innerHTML = endScore;

    totalScore = (autoScore + teleScore + endScore);
    document.getElementById("totalScore").innerHTML = totalScore;
}

//Skystones
function addSkystone() {
    if(skystones < 2 && stones < (6 - skystones)) {
        document.getElementById("skystoneCount").innerHTML = ++skystones;

        autoScore += 10;
        updateScores();
    }
}

function subtractSkystone() {
    if(skystones > 0) {
        document.getElementById("skystoneCount").innerHTML = --skystones;

        autoScore -= 10;
        updateScores();

        if(placed > (stones + skystones)) {
            subtractPlaced();
        }
    }
}

//Regular Stones
function addStone() {
    if(stones < (6 - skystones)) {
        document.getElementById("stoneCount").innerHTML = ++stones;

        autoScore += 2;
        updateScores();
    }
}

function subtractStone() {
    if(stones > 0) {
        document.getElementById("stoneCount").innerHTML = --stones;

        autoScore -= 2;
        updateScores();

        if(placed > stones) {
            subtractPlaced();
        }
    }
}

//Placing
function addPlaced() {
    if(placed < (stones + skystones)) {
        document.getElementById("placedCount").innerHTML = ++placed;

        autoScore += 4;
        updateScores();
    } else if (placed == (stones + skystones)) {
        addStone();
        addPlaced();
    }
}

function subtractPlaced() {
    if(placed > 0) {
        document.getElementById("placedCount").innerHTML = --placed;

        autoScore -= 4;
        updateScores();
    }
}

//Foundation
function foundationYes() {
    if(!foundation) {
        foundation = true;
        document.getElementById("foundationYes").style.backgroundColor = "gray";
        document.getElementById("foundationNo").style.backgroundColor = "white";

        autoScore += 10;
        updateScores();
    }
}

function foundationNo() {
    if(foundation) {
        foundation = false;
        document.getElementById("foundationYes").style.backgroundColor = "white";
        document.getElementById("foundationNo").style.backgroundColor = "gray";

        autoScore -= 10;
        updateScores();
    }
}

//Parking
function parkingZero() {
    if(parking != 0) {
        document.getElementById("parkingZero").style.backgroundColor = "gray";
        document.getElementById("parkingOne").style.backgroundColor = "white";
        document.getElementById("parkingTwo").style.backgroundColor = "white";

        if(parking == 1) {
            autoScore -= 5;
        } else if (parking == 2) {
            autoScore -= 10;
        }
        updateScores();

        parking = 0;
    }
}

function parkingOne() {
    if(parking != 1) {
        document.getElementById("parkingZero").style.backgroundColor = "white";
        document.getElementById("parkingOne").style.backgroundColor = "gray";
        document.getElementById("parkingTwo").style.backgroundColor = "white";

        if(parking == 0) {
            autoScore += 5;
        } else if (parking == 2) {
            autoScore -= 5;
        }
        updateScores();

        parking = 1;
    }
}

function parkingTwo() {
    if(parking != 2) {
        document.getElementById("parkingZero").style.backgroundColor = "white";
        document.getElementById("parkingOne").style.backgroundColor = "white";
        document.getElementById("parkingTwo").style.backgroundColor = "gray";

        if(parking == 0) {
            autoScore += 10;
        } else if (parking == 1) {
            autoScore += 5;
        }
        updateScores();

        parking = 2;
    }
}

//Clear Auto
function clearAuto() {
    stones = 0;
    skystones = 0;
    placed = 0;

    document.getElementById("skystoneCount").innerHTML = skystones;
    document.getElementById("stoneCount").innerHTML = stones;
    document.getElementById("placedCount").innerHTML = placed;

    foundationNo();
    parkingZero();

    autoScore = 0;
    updateScores();
}

////////////////////////////////
//TELE-OP
////////////////////////////////
var teleStonesDelivered = 0;
var teleStonesPlaced = 0;
var teleLevel = 0;
var teleScore = 0;

//TeleOp Stones Delivered
function addDelivered() {
    document.getElementById("deliveredCount").innerHTML = ++teleStonesDelivered;
    document.getElementById("tele").innerHTML = ++teleScore;
    updateScores();
}

function subtractDelivered() {
    if(teleStonesDelivered > 0) {
        document.getElementById("deliveredCount").innerHTML = --teleStonesDelivered;
        document.getElementById("tele").innerHTML = --teleScore;
        updateScores();
    }
}

//TeleOp Stones Placed
function addTelePlaced() {
    document.getElementById("telePlacedCount").innerHTML = ++teleStonesPlaced;
    document.getElementById("tele").innerHTML = ++teleScore;
    updateScores();
}

function subtractTelePlaced() {
    if(teleStonesPlaced > 0) {
        document.getElementById("telePlacedCount").innerHTML = --teleStonesPlaced;
        document.getElementById("tele").innerHTML = --teleScore;
        updateScores();
    }
}

//TeleOp Skyscraper Height (Level)
function addLevel() {
    if(teleLevel < teleStonesPlaced) {
        document.getElementById("teleLevelCount").innerHTML = ++teleLevel;
    
        teleScore += 2;
        updateScores();
    }
}

function subtractLevel() {
    if(teleLevel > 0) {
        document.getElementById("teleLevelCount").innerHTML = --teleLevel;
    
        teleScore -= 2;
        updateScores();
    }
}

//Clear Tele-Op
function clearTele() {
    teleStonesDelivered = 0;
    teleStonesPlaced = 0;
    teleLevel = 0;
    teleScore = 0;

    document.getElementById("deliveredCount").innerHTML = teleStonesDelivered;
    document.getElementById("telePlacedCount").innerHTML = teleStonesPlaced;
    document.getElementById("teleLevelCount").innerHTML = teleLevel;

    updateScores();
}

////////////////////////////////
//END GAME
////////////////////////////////
var capstone = 0;
var capstoneOne = 0;
var capstoneTwo = 0;
var foundationMoved = false;
var parkedEnd = 0;
var endScore = 0;

//Capstones
function capZero() {
    if(capstone != 0) {
        document.getElementById("capstoneZero").style.backgroundColor = "gray";
        document.getElementById("capstoneOne").style.backgroundColor = "white";
        document.getElementById("capstoneTwo").style.backgroundColor = "white";

        if(capstone == 1) {
            endScore -= 5;
        } else if (capstone == 2) {
            endScore -= 10;
        }
        updateScores();

        capstone = 0;
    }
}

function capOne() {
    if(capstone != 1) {
        document.getElementById("capstoneZero").style.backgroundColor = "white";
        document.getElementById("capstoneOne").style.backgroundColor = "gray";
        document.getElementById("capstoneTwo").style.backgroundColor = "white";

        if(capstone == 0) {
            endScore += 5;
        } else if (capstone == 2) {
            endScore -= 5;
        }
        updateScores();

        capstone = 1;
    }
}

function capTwo() {
    if(capstone != 2) {
        document.getElementById("capstoneZero").style.backgroundColor = "white";
        document.getElementById("capstoneOne").style.backgroundColor = "white";
        document.getElementById("capstoneTwo").style.backgroundColor = "gray";

        if(capstone == 0) {
            endScore += 10;
        } else if (capstone == 1) {
            endScore += 5;
        }
        updateScores();

        capstone = 2;
    }
}

//Cap 1 Level
function addCapOne() {
    if(capstoneOne < teleLevel && (capstone == 1 || capstone == 2)) {
        document.getElementById("capOne").innerHTML = ++capstoneOne;
        document.getElementById("end").innerHTML = ++endScore;
        updateScores();
    }
}

function subtractCapOne() {
    if(capstoneOne > 0 && (capstone == 1 || capstone == 2)) {
        document.getElementById("capOne").innerHTML = --capstoneOne;
        document.getElementById("end").innerHTML = --endScore;
        updateScores();
    }
}

//Cap 2 Level
function addCapTwo() {
    if(capstoneTwo < teleLevel && capstone == 2) {
        document.getElementById("capTwo").innerHTML = ++capstoneTwo;
        document.getElementById("end").innerHTML = ++endScore;
        updateScores();
    }
}

function subtractCapTwo() {
    if(capstoneTwo > 0 && capstone == 2) {
        document.getElementById("capTwo").innerHTML = --capstoneTwo;
        document.getElementById("end").innerHTML = --endScore;
        updateScores();
    }
}

//Foundation
function foundationMovedYes() {
    if(!foundationMoved) {
        foundationMoved = true;
        document.getElementById("foundationMovedYes").style.backgroundColor = "gray";
        document.getElementById("foundationMovedNo").style.backgroundColor = "white";

        endScore += 15;
        updateScores();
    }
}

function foundationMovedNo() {
    if(foundationMoved) {
        foundationMoved = false;
        document.getElementById("foundationMovedYes").style.backgroundColor = "white";
        document.getElementById("foundationMovedNo").style.backgroundColor = "gray";

        endScore -= 15;
        updateScores();
    }
}

//Parking
function parkZero() {
    if(parkedEnd != 0) {
        document.getElementById("parkZero").style.backgroundColor = "gray";
        document.getElementById("parkOne").style.backgroundColor = "white";
        document.getElementById("parkTwo").style.backgroundColor = "white";

        if(parkedEnd == 1) {
            endScore -= 5;
        } else if (parkedEnd == 2) {
            endScore -= 10;
        }
        updateScores();

        parkedEnd = 0;
    }
}

function parkOne() {
    if(parkedEnd != 1) {
        document.getElementById("parkZero").style.backgroundColor = "white";
        document.getElementById("parkOne").style.backgroundColor = "gray";
        document.getElementById("parkTwo").style.backgroundColor = "white";

        if(parkedEnd == 0) {
            endScore += 5;
        } else if (parkedEnd == 2) {
            endScore -= 5;
        }
        updateScores();

        parkedEnd = 1;
    }
}

function parkTwo() {
    if(parkedEnd != 2) {
        document.getElementById("parkZero").style.backgroundColor = "white";
        document.getElementById("parkOne").style.backgroundColor = "white";
        document.getElementById("parkTwo").style.backgroundColor = "gray";

        if(parkedEnd == 0) {
            endScore += 10;
        } else if (parkedEnd == 1) {
            endScore += 5;
        }
        updateScores();

        parkedEnd = 2;
    }
}

//Clear End Game
function clearEnd() {
    capstoneOne = 0;
    capstoneTwo = 0;
    
    capZero();
    parkZero();

    endScore = 0;
    updateScores();
}
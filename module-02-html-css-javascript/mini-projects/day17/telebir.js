
function normalEarnRule(amount) {
    return Math.floor(amount / 10);
}

function holidayEarnRule(amount) {
    return normalEarnRule(amount) * 2;
}

function createLoyalty(earnRule) {

    let points = 0;


    function earn(amount) {

        const newPoints = earnRule(amount);

        points += newPoints;

        return newPoints;
    }


    function redeem(amount) {

        if (amount > points) {
            return false;
        }

        points -= amount;

        return true;
    }


    function balance() {
        return points;
    }


    function setEarnRule(newRule) {
        earnRule = newRule;
    }


    return {
        earn,
        redeem,
        balance,
        setEarnRule
    };
}


// Start with normal rule
const loyalty = createLoyalty(normalEarnRule);


const balanceDisplay = document.querySelector("#balance");

const earnAmountInput = document.querySelector("#earnAmount");

const redeemAmountInput = document.querySelector("#redeemAmount");

const earnButton = document.querySelector("#earnBtn");

const redeemButton = document.querySelector("#redeemBtn");

const ruleSelect = document.querySelector("#ruleSelect");

const message = document.querySelector("#message");


// ==========================================
// 5. UPDATE BALANCE ON SCREEN
// ==========================================

function updateBalance() {

    balanceDisplay.textContent = loyalty.balance();

}


// ==========================================
// 6. SHOW MESSAGE
// ==========================================

function showMessage(text) {

    message.textContent = text;

}



earnButton.addEventListener("click", function () {

    const amount = Number(earnAmountInput.value);


    // Check input
    if (amount <= 0 || isNaN(amount)) {

        showMessage("Please enter a valid amount.");

        return;
    }


    // Earn points
    const earnedPoints = loyalty.earn(amount);


    // Update screen
    updateBalance();


    // Show result
    showMessage(
        `You earned ${earnedPoints} points!`
    );


    // Clear input
    earnAmountInput.value = "";

});



redeemButton.addEventListener("click", function () {

    const amount = Number(redeemAmountInput.value);


    // Check input
    if (amount <= 0 || isNaN(amount)) {

        showMessage("Please enter a valid number of points.");

        return;
    }


    // Try to redeem
    const success = loyalty.redeem(amount);


    // If successful
    if (success) {

        updateBalance();

        showMessage(
            `You redeemed ${amount} points!`
        );

    }

    // If not enough points
    else {

        showMessage(
            "You don't have enough points."
        );

    }


    // Clear input
    redeemAmountInput.value = "";

});

ruleSelect.addEventListener("change", function () {

    const selectedRule = ruleSelect.value;


    if (selectedRule === "normal") {

        loyalty.setEarnRule(normalEarnRule);

        showMessage(
            "Normal rule selected: 1 point per 10 ETB."
        );

    }


    else if (selectedRule === "holiday") {

        loyalty.setEarnRule(holidayEarnRule);

        showMessage(
            "Holiday rule selected: Double points!"
        );

    }

});


updateBalance();
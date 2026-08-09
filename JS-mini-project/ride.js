sumDistance = (...distances) => {
    totalDistance = 0;
    for(let distance of distances) {
        totalDistance += distance;
    };
    return totalDistance;
}

const calculateBaseFare = (totalDistance, ratePerKm = 15) => {
    return totalDistance * ratePerKm;
};


const formatCurrency = (amount) => {
    return `ETB${amount.toFixed(2)}`
};


// part two higher order function
const makeSurgeMultiplier = (surgeRate) => {
    return function(baseFare) {
        return baseFare * surgeRate;
    }
};


// part 3 closures


const makeDriverTracker = () => {
    tripsCompleted = 0;;
    return {
        recordTrip(){
            tripsCompleted++;
        },
        getTrips(){
            return tripsCompleted;
        }
    }
};

// part 4 putting all together


const generateReceipt = (
    distancesArray,
    surgeFunction,
    driverTracker,
    onReceiptReady
) => {

    // 1. Increment driver's trip count
    driverTracker.recordTrip();

    // 2. Calculate total distance
    const totalDistance = sumDistance(...distancesArray);

    // 3. Calculate base fare
    const baseFare = calculateBaseFare(totalDistance);

    // 4. Apply surge function
    const actualFare = surgeFunction(baseFare);

    // 5. Format final fare
    const formattedFare = formatCurrency(actualFare);

    // 6. Create receipt
    const receipt = `Trip #${driverTracker.getTrips()}: Total Fare is ${formattedFare}.`;

    onReceiptReady(receipt);
};


const distances = [30, 20, 10];

const surgeFunction = makeSurgeMultiplier(1.5);

const driverTracker = makeDriverTracker();

const onReceiptReady = (receipt) => {
    console.log(receipt);
};

generateReceipt(
    distances,
    surgeFunction,
    driverTracker,
    onReceiptReady
); 
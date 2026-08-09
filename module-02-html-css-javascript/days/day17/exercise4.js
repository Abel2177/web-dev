const applyToAll = (list, func) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        result.push(func(list[i]));
    }
    return result;
};
const prices = [100, 250, 400, 80];
const addVAT = price => price * 1.15;

const pricesWithVAT = applyToAll(prices, addVAT);
console.log(pricesWithVAT);
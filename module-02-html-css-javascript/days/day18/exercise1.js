const prices = [1000, 2000, 3000, 4000];

let vat = prices.map(p => p * 0.15);
const underThosund = vat.filter(p => p  < 100);

const total = underThosund.reduce((sum, p) => sum + p, 0);


 
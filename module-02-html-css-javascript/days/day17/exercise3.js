
const discountBy = (rate) => {
    return function(price) {
        return price - (price * rate);
    };
};


const memberPrice = discountBy(0.10);  
const salePrice   = discountBy(0.30);  


console.log("Member Price:", memberPrice(1000)); 
console.log("Sale Price:", salePrice(1000));     

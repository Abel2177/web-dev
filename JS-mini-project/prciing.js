const VAT_RATE = 0.15


export const withVat = (price) =>{
    return price *( 1+ VAT_RATE)
}


export const format = (amount) =>{
    return `ETB ${amount.toFixed(2)}`
}
export const calculateItemTotal = (price,qty) => {
 return withVat(price)* qty
}
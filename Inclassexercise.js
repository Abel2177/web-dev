const bill = '500';
const billNum = Number(bill);

if (billNum >= 300){
    tip = billNum * 0.1
}
else{
    tip = billNum * 0.05
}
var total = billNum + tip
var fee = 0;
const method = 'cbe birr'
// switch (method) {
//     case 'telebirr':
//         fee = total * 0.05
//         break;
//     case 'cbe birr':
//         fee = total * 0.01 
//         break;
//     default:
//         fee =  total * 0.02  

// }
if (method === 'telebirr'){
    fee = total * 0.05
}
else if (method === 'cbe birr'){
    fee = total * 0.01 
} else {
    fee =  total * 0.02  
}
const totalWithFee = billNum + tip + fee;

const name = ['John', 'Jane', 'Jack', 'Jill', 'Jerry'];
for (let i = 0; i < name.length; i++){
    const amount =  totalWithFee / name.length;
    console.log(`name: ${name[i]}, amount: ${amount}`);
}



console.log(` fee: ${fee}`);
console.log(` total with fee: ${totalWithFee}`);
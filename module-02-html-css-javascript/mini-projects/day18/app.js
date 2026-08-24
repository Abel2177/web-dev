import { transactions } from "./telebirr-transaction.js";

import {
  totalByType,
  createReceipts,
  correctTransaction
} from "./report.js";


// Calculate totals
const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");


// Create receipt list
const receipts = createReceipts(transactions);


// Correct one transaction
const correctedTransaction = correctTransaction(
  transactions[0],
  300
);


// Print report
console.log("===== TELEBIRR TRANSACTION REPORT =====");

console.log(`Total Credits: ETB ${totalCredits}`);
console.log(`Total Debits: ETB ${totalDebits}`);

console.log("\nReceipts:");

receipts.forEach(receipt => {
  console.log(receipt);
});

console.log("\nCorrected Transaction:");
console.log(correctedTransaction);

console.log("\nOriginal Transaction:");
console.log(transactions[0]);
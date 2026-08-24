// Calculate total credit or debit
export const totalByType = (txns, type) => {
  return txns
    .filter(transaction => transaction.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);
};


// Create formatted receipts
export const createReceipts = (txns) => {
  return txns.map(({ customer, amount }) => {
    return `${customer} paid ETB ${amount}`;
  });
};


// Create a corrected copy of a transaction
export const correctTransaction = (transaction, newAmount) => {
  return {
    ...transaction,
    amount: newAmount
  };
};
import axios from "./AxiosConfig";

async function getTransactions(userId) {
  try {
    const response = await axios.get(`Transactions/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Transactions error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function postTransactions(transactionDetails) {
  try {
    const response = await axios.post(`Transactions`, {
      Amount: transactionDetails.amount,
      Type: transactionDetails.type,
      Category: transactionDetails.category,
      Description: transactionDetails.description,
      Date: transactionDetails.date,
      AccountId: transactionDetails.accountId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Post transaction error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateTransaction(transactionId, transactionData) {
  try {
    const response = await axios.put(
      `Transactions/${transactionId}`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Update transaction error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteTransaction(transactionId) {
  try {
    const response = await axios.delete(`Transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Transactions error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export {
  getTransactions,
  postTransactions,
  updateTransaction,
  deleteTransaction,
};

import axios from './AxiosConfig';

async function getDashboardSummary(userId) {
  try {
    const response = await axios.get(`Dashboard`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Dashboard summary error:', error.response ? error.response.data : error.message);
    throw error;
  }
}
async function getAccounts(userId) {
  try {
    const response = await axios.get(`Accounts/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Accounts error:', error.response ? error.response.data : error.message);
    throw error;
  }
}
async function postAccount(userId, accountDetails) {
  try {
    const response = await axios.post(`Accounts/${userId}`, {
      Name: accountDetails.name,
      Type: accountDetails.type,
      Balance: accountDetails.balance,
    });
    return response.data;
  } catch (error) {
    console.error('Post account error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function updateAccount(accountId, accountData) {
  try {
    const response = await axios.put(`Accounts/${accountId}`, accountData);
    return response.data;
  } catch (error) {
    console.error('Update account error:', error.response ? error.response.data : error.message);
    throw error;
  }
}
async function deleteAccount(accountId) {
  try {
    const response = await axios.delete(`Accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Accounts error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export { getDashboardSummary, getAccounts, postAccount, updateAccount, deleteAccount };
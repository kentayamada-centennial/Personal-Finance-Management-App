import axios from './AxiosConfig';

async function getDashboardSummary(userId) {
  try {
    const response = await axios.get(`dashboard`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Dashboard summary error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export { getDashboardSummary };
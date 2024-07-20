import axios from './AxiosConfig';

async function registerUser(userData) {
  try {
    const response = await axios.post('users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function loginUser(loginData) {
  try {
    const response = await axios.post('users/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export { registerUser, loginUser };
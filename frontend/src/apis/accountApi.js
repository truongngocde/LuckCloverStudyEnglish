import axios from 'axios';

const URL = 'http://localhost:8080/apis/accounts';


const accountApi = {
  postRegisterAccount: (email, name, password) => {
    return axios.post(`${URL}/register`, { email, name, password });
  },

  postLogin: (email, password) => {
    return axios.post(`${URL}/login`, { email, password });
  },

  postLoginWithGoogle: (access_token) => {
    return axios.post(`${URL}/login-gg`, { access_token });
  },

  postLoginWithFacebook: (access_token) => {
    return axios.post(`${URL}/login-fb`, { access_token });
  },

  postLogout: () => {
    return axios.post(`${URL}/logout`);
  },

  postResetPassword: (email, password, verifyCode) => {
    return axios.post(`${URL}/reset-password`, {
      email,
      password,
      verifyCode,
    });
  },

  putToggleWordFavorite: (username, word, isAdd) => {
    return axios.put(`${URL}/toggle-favorite`, { username, word, isAdd });
  },

  putUpdateUserCoin: (newCoin) => {
    return axios.put(`${URL}/update-coin`, { newCoin });
  },

  putUpdateAvt: (avtSrc = '') => {
    return axios.put(`${URL}/update-avt`, { avtSrc });
  },

  putUpdateProfile: (name = '', username = '') => {
    return axios.put(`${URL}/update-profile`, { name, username });
  },

  getUserInfo: () => {
    return axios.get(`${URL}/user-info`);
  },

  getSendVerifyCode: (email) => {
    return axios.get(`${URL}/send-verify-code`, {
      params: { email },
    });
  },

  getUserProfile: () => {
    return axios.get(`${URL}/user-profile`);
  },
};

export default accountApi;

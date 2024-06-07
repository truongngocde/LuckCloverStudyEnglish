import axiosClient from './axiosClient';

const URL = 'http://localhost:8080/apis/accounts';

const accountApi = {
  postRegisterAccount: (email, name, password) => {
    return axiosClient.post(`${URL}/register`, { email, name, password });
  },

  postLogin: async (email, password) => {
    try {
      const response = await axiosClient.post(`${URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // postLoginWithGoogle: async (access_token) => {
  //   try {
  //     const response = await axiosClient.post(`${URL}/login-gg`, { access_token });
  //     if (response.data.token) {
  //       localStorage.setItem('authToken', response.data.token);
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error('Google login error:', error);
  //     throw error;
  //   }
  // },

  // postLoginWithFacebook: async (access_token) => {
  //   try {
  //     const response = await axiosClient.post(`${URL}/login-fb`, { access_token });
  //     if (response.data.token) {
  //       localStorage.setItem('authToken', response.data.token);
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error('Facebook login error:', error);
  //     throw error;
  //   }
  // },

  postLogout: () => {
    localStorage.removeItem('authToken');
    return axiosClient.post(`${URL}/logout`);
  },

  postResetPassword: (email, password, verifyCode) => {
    return axiosClient.post(`${URL}/reset-password`, {
      email,
      password,
      verifyCode,
    });
  },

  putToggleWordFavorite: (username, word, isAdd) => {
    return axiosClient.put(`${URL}/toggle-favorite`, { username, word, isAdd });
  },

  putUpdateUserCoin: (newCoin) => {
    return axiosClient.put(`${URL}/update-coin`, { newCoin });
  },

  putUpdateAvt: (avtSrc = '') => {
    return axiosClient.put(`${URL}/update-avt`, { avtSrc });
  },

  putUpdateProfile: (name = '', username = '') => {
    return axiosClient.put(`${URL}/update-profile`, { name, username });
  },

  getUserInfo: () => {
    return axiosClient.get(`${URL}/user-info`);
  },

  getSendVerifyCode: (email) => {
    return axiosClient.get(`${URL}/send-verify-code`, {
      params: { email },
    });
  },

  getUserProfile: () => {
    return axiosClient.get(`${URL}/user-profile`);
  },
};

export default accountApi;

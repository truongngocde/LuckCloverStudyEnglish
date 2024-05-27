import accountApi from '../../apis/accountApi';
import { ROUTES, UX } from '../../constants';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../redux/slices/messageSlice';
import Register from './index';

function RegisterData() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (account) => {
    try {
      setLoading(true);
      const { email, password, name } = account;
      const apiRes = await accountApi.postRegisterAccount(
        email.toLowerCase(),
        name,
        password,
      );

      if (apiRes?.status === 200) {
        const message = 'Đăng ký thành công';
        dispatch(setMessage({ message, type: 'success' }));
        setTimeout(() => {
          setLoading(false);
          navigation(ROUTES.LOGIN);
        }, UX.DELAY_TIME);
      }
    } catch (error) {
      const message = error.response?.data?.message || ' thất bại, thử lại !';
      dispatch(setMessage({ message, type: 'error' }));
      setLoading(false);
    }
  };

  return <Register onRegister={handleRegister} loading={loading} />;
}

export default RegisterData;

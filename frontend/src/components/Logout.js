import accountApi from '../apis/accountApi';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../redux/slices/messageSlice';
import GlobalLoading from './UI/GlobalLoading';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!isAuth) {
      navigate(`/`); 
      return;
    }

    (async function () {
      try {
        const apiRes = await accountApi.postLogout();
        if (apiRes.status === 200) {
          dispatch(
            setMessage({ type: 'success', message: 'Đăng xuất thành công' }),
          );
          window.location.href = window.location.pathname; // cập nhật lại trang hiện tại
        }
      } catch (error) {
        dispatch(
          setMessage({ type: 'error', message: 'Đăng xuất thất bại, thử lại' }),
        );
        navigate('/'); // quay lại trang trước đó nếu có lỗi
      }
    })();

    return () => {};
  }, []);

  return <>{isAuth && <GlobalLoading title="Đang đang xuất ..." />}</>;
}

export default Logout;

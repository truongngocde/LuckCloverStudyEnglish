import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import LockIcon from '@mui/icons-material/Lock';
import LoopIcon from '@mui/icons-material/Loop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import SocialNetworkLogin from 'components/Login/SocialNetwork';
import InputCustom from '../UI/InputCustom';
import { formStyle } from '../UI/style';
import { MAX, ROUTES } from '../../constants';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Nhập email')
    .email('Email không hợp lệ')
    .max(MAX.EMAIL_LEN, `Email tối đa ${MAX.EMAIL_LEN}`),
  password: yup
    .string()
    .trim()
    .required('Nhập mật khẩu')
    .max(MAX.PASSWORD_LEN, `Mật khẩu tối đa ${MAX.PASSWORD_LEN}`),
});

function LoginLocalForm(props) {
  const { onLogin, loading } = props;
  const classes = makeStyles(formStyle)();
  const [visiblePw, setVisiblePw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form
      className={`${classes.root} flex-col`}
      onSubmit={handleSubmit(onLogin)}
      autoComplete="off">
      <div className="flex-col">
        <h1 className={`${classes.title} t-center`}>Đăng nhập</h1>
        <div className="t-center mt-5">
          <LockIcon className={classes.labelIcon} />
        </div>
      </div>

      <div className="flex-col">
        <InputCustom
          label="Email"
          size="small"
          placeholder="Nhập email"
          error={Boolean(errors.email)}
          inputProps={{
            name: 'email',
            maxLength: MAX.EMAIL_LEN,
            autoFocus: true,
            ...register('email'),
          }}
        />
        {errors.email && <p className="text-error">{errors.email?.message}</p>}
      </div>

      <div className="flex-col">
        <InputCustom
          label="Mật khẩu"
          size="small"
          placeholder="Nhập mật khẩu"
          error={Boolean(errors.password)}
          inputProps={{
            name: 'password',
            maxLength: MAX.PASSWORD_LEN,
            type: visiblePw ? 'text' : 'password',
            ...register('password'),
          }}
          endAdornment={
            visiblePw ? (
              <VisibilityIcon
                className={`${classes.icon} ${classes.visiblePw}`}
                onClick={() => setVisiblePw(false)}
              />
            ) : (
              <VisibilityOffIcon
                className={classes.icon}
                onClick={() => setVisiblePw(true)}
              />
            )
          }
        />
        {errors.password && (
          <p className="text-error">{errors.password?.message}</p>
        )}
      </div>

      <Link className={classes.forgotPw} to={ROUTES.FORGOT_PASSWORD}>
        Quên mật khẩu ?
      </Link>

      <Button
        className="_btn _btn-primary"
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        endIcon={loading && <LoopIcon className="ani-spin" />}
        size="large">
        Đăng nhập
      </Button>

      <div className="or-option w-100 t-center">HOẶC</div>

      {props.children}
    </form>
  );
}

function Login(props) {
  return (
    <LoginLocalForm {...props}>
      {/* <SocialNetworkLogin /> */}
    </LoginLocalForm>
  );
}

Login.propTypes = {
  loading: PropTypes.bool,
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  loading: false,
  onLogin: function () {},
};

export default Login;

import axios from 'axios';
import {API_URL} from '@env';

export const Login = (data) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: `${API_URL}/api/auth/login`,
      data: {
        username: data.username,
        password: data.password,
      },
    }),
  };
};

export const Register = (data) => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: `${API_URL}/api/auth/register`,
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: 2,
      },
    }),
  };
};

export const Activation = (data) => {
  return {
    type: 'ACTIVATION',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/activation',
      data: {
        email: data.email,
        code: data.code,
      },
    }),
  };
};

export const Logout = () => {
  return {
    type: 'LOGOUT',
  };
};

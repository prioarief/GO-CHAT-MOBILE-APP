import axios from 'axios';
import {API_APP_URL} from '@env';

export const Login = (data) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: `${API_APP_URL}/api/auth/login`,
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
      url: `${API_APP_URL}/api/auth/register`,
      data: {
        username: data.username,
        password: data.password,
        name: data.name,
      },
    }),
  };
};

export const editProfile = (token, data) => {
  return {
    type: 'EDIT',
    payload: axios({
      method: 'PUT',
      url: `${API_APP_URL}/api/auth/profile`,
      headers: {
        Authorization: token,
      },
      data: data,
    }),
  };
};

export const Logout = () => {
  return {
    type: 'LOGOUT',
  };
};

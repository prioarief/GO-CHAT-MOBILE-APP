import axios from 'axios';
import {API_URL} from '@env';

export const getContact = (token) => {
  return {
    type: 'CONTACT',
    payload: axios({
      method: 'GET',
      url: `${API_URL}/api/auth/contact`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const addContact = (token, id) => {
  return {
    type: 'ADD',
    payload: axios({
      method: 'PUT',
      url: `${API_URL}/api/auth/contact/${id}`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

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

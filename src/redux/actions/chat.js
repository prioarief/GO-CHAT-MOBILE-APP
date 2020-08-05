import axios from 'axios';
import {API_URL} from '@env';

export const getMyChat = (token) => {
  return {
    type: 'MYCHAT',
    payload: axios({
      method: 'GET',
      url: `${API_URL}/api/message`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getMessage = (token, id) => {
  return {
    type: 'CHAT',
    payload: axios({
      method: 'GET',
      url: `${API_URL}/api/message/${id}`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const sendMessage = (token, id, data) => {
  return {
    type: 'SEND',
    payload: axios({
      method: 'POST',
      url: `${API_URL}/api/message/send-message/${id}`,
      data: {
        message: data,
      },
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const updateMessage = (token, id, data) => {
  return {
    type: 'UPDATE',
    payload: axios({
      method: 'PUT',
      url: `${API_URL}/api/message/${id}`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

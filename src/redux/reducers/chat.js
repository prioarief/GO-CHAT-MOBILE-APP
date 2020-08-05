const initialState = {
  data: {},
  chat: [],
  errorMessage: null,
  isLoading: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'MYCHAT_PENDING': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'MYCHAT_REJECTED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'MYCHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
      };
    }
    case 'CHAT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CHAT_REJECTED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        chat: action.payload.data.data,
      };
    }
    case 'SEND_PENDING': {
      return {
        ...state,
        // isLoading: true,
      };
    }
    case 'SEND_REJECTED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'SEND_FULFILLED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'UPDATE_PENDING': {
      return {
        ...state,
        // isLoading: true,
      };
    }
    case 'UPDATE_REJECTED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'UPDATE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default chat;

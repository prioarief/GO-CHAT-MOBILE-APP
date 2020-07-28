const inialState = {
  data: {},
  errorMessage: null,
  isLoading: false,
};

const auth = (state = inialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.response.data.data,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data[0],
      };
    }

    case 'REGISTER_PENDING': {
      return {
        ...state,
        data: {},
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        data: {},
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.data,
      };
    }
    case 'EDIT_PENDING': {
      return {
        ...state,
        data: {},
      };
    }
    case 'EDIT_REJECTED': {
      return {
        ...state,
        data: {},
      };
    }
    case 'EDIT_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.data,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        data: {},
      };
    }

    default: {
      return state;
    }
  }
};

export default auth;

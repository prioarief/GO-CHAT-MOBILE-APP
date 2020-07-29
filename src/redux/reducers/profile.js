const initialState = {
  data: {},
  errorMessage: null,
  isLoading: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CONTACT_REJECTED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'CONTACT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
      };
    }
    case 'ADD_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'ADD_REJECTED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'ADD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default profile;

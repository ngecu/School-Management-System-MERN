import {
    CREATE_ACCOUNTANT_REQUEST,
    CREATE_ACCOUNTANT_SUCCESS,
    CREATE_ACCOUNTANT_FAILURE,
  } from '../constants/accountantConstants';

export  const accountantCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ACCOUNTANT_REQUEST:
        return {
          loading: true,
        };
  
      case CREATE_ACCOUNTANT_SUCCESS:
        return {
          loading: false,
          success: true,
          accountant: action.payload,
        };
  
      case CREATE_ACCOUNTANT_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
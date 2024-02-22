import {
    CREATE_ACCOUNTANT_REQUEST,
    CREATE_ACCOUNTANT_SUCCESS,
    CREATE_ACCOUNTANT_FAILURE,
    ACCOUNTANT_LIST_REQUEST,
    ACCOUNTANT_LIST_SUCCESS,
    ACCOUNTANT_LIST_FAIL,
    ACCOUNTANT_LIST_RESET,
    ACCOUNTANT_DELETE_REQUEST,
    ACCOUNTANT_DELETE_SUCCESS,
    ACCOUNTANT_DELETE_FAIL,
    ACCOUNTANT_DETAILS_REQUEST,
    ACCOUNTANT_DETAILS_SUCCESS,
    ACCOUNTANT_DETAILS_FAIL,
    ACCOUNTANT_DETAILS_RESET,
    ACCOUNTANT_UPDATE_REQUEST,
    ACCOUNTANT_UPDATE_SUCCESS,
    ACCOUNTANT_UPDATE_FAIL,
    ACCOUNTANT_UPDATE_RESET,
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
  
  
  export const accountantListReducer = (state = { accountants: [] }, action) => {
    switch (action.type) {
      case ACCOUNTANT_LIST_REQUEST:
        return { loading: true };
      case ACCOUNTANT_LIST_SUCCESS:
        return { loading: false, accountants: action.payload };
      case ACCOUNTANT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNTANT_LIST_RESET:
        return { accountants: [] };
      default:
        return state;
    }
  };
  
  export const accountantDetailsReducer = (state = { accountant: {} }, action) => {
    switch (action.type) {
      case ACCOUNTANT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case ACCOUNTANT_DETAILS_SUCCESS:
        return { loading: false, accountant: action.payload };
      case ACCOUNTANT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNTANT_DETAILS_RESET:
        return { accountant: {} };
      default:
        return state;
    }
  };
  
  export const accountantUpdateReducer = (state = { accountant: {} }, action) => {
    switch (action.type) {
      case ACCOUNTANT_UPDATE_REQUEST:
        return { loading: true };
      case ACCOUNTANT_UPDATE_SUCCESS:
        return { loading: false, success: true, accountant: action.payload };
      case ACCOUNTANT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNTANT_UPDATE_RESET:
        return { accountant: {} };
      default:
        return state;
    }
  };
  
  export const accountantDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ACCOUNTANT_DELETE_REQUEST:
        return { loading: true };
      case ACCOUNTANT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ACCOUNTANT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
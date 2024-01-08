// feeReducers.js
import {
    CREATE_FEES_REQUEST,
    CREATE_FEES_SUCCESS,
    CREATE_FEES_FAIL,
    GET_ALL_FEES_REQUEST,
    GET_ALL_FEES_SUCCESS,
    GET_ALL_FEES_FAIL,
    GET_FEES_BY_STUDENT_REQUEST,
    GET_FEES_BY_STUDENT_SUCCESS,
    GET_FEES_BY_STUDENT_FAIL,
    MARK_FEES_AS_PAID_REQUEST,
    MARK_FEES_AS_PAID_SUCCESS,
    MARK_FEES_AS_PAID_FAIL,
  } from '../constants/feeConstants';
  
  export const createFeesReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_FEES_REQUEST:
        return { loading: true };
      case CREATE_FEES_SUCCESS:
        return { loading: false, success: true };
      case CREATE_FEES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllFeesReducer = (state = { fees: [] }, action) => {
    switch (action.type) {
      case GET_ALL_FEES_REQUEST:
        return { loading: true, fees: [] };
      case GET_ALL_FEES_SUCCESS:
        return { loading: false, fees: action.payload };
      case GET_ALL_FEES_FAIL:
        return { loading: false, error: action.payload, fees: [] };
      default:
        return state;
    }
  };
  
  export const getFeesByStudentReducer = (state = { fees: [] }, action) => {
    switch (action.type) {
      case GET_FEES_BY_STUDENT_REQUEST:
        return { loading: true, fees: [] };
      case GET_FEES_BY_STUDENT_SUCCESS:
        return { loading: false, fees: action.payload.data };
      case GET_FEES_BY_STUDENT_FAIL:
        return { loading: false, error: action.payload, fees: [] };
      default:
        return state;
    }
  };
  
  export const markFeesAsPaidReducer = (state = {}, action) => {
    switch (action.type) {
      case MARK_FEES_AS_PAID_REQUEST:
        return { loading: true };
      case MARK_FEES_AS_PAID_SUCCESS:
        return { loading: false, success: true };
      case MARK_FEES_AS_PAID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
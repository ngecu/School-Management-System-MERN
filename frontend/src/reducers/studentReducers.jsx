import {
    STUDENT_CREATE_REQUEST,
    STUDENT_CREATE_SUCCESS,
    STUDENT_CREATE_FAIL,
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    STUDENT_LIST_RESET,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,
    STUDENT_DETAILS_RESET,
    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_UPDATE_RESET,
    STUDENT_DELETE_REQUEST,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL,
  } from '../constants/studentConstants';
  
  export const studentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case STUDENT_CREATE_REQUEST:
        return { loading: true };
      case STUDENT_CREATE_SUCCESS:
        return { loading: false, success: true, student: action.payload };
      case STUDENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const studentListReducer = (state = { students: [] }, action) => {
    switch (action.type) {
      case STUDENT_LIST_REQUEST:
        return { loading: true };
      case STUDENT_LIST_SUCCESS:
        return { loading: false, students: action.payload };
      case STUDENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case STUDENT_LIST_RESET:
        return { students: [] };
      default:
        return state;
    }
  };
  
  export const studentDetailsReducer = (state = { student: {} }, action) => {
    switch (action.type) {
      case STUDENT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case STUDENT_DETAILS_SUCCESS:
        return { loading: false, student: action.payload };
      case STUDENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case STUDENT_DETAILS_RESET:
        return { student: {} };
      default:
        return state;
    }
  };
  
  export const studentUpdateReducer = (state = { student: {} }, action) => {
    switch (action.type) {
      case STUDENT_UPDATE_REQUEST:
        return { loading: true };
      case STUDENT_UPDATE_SUCCESS:
        return { loading: false, success: true, student: action.payload };
      case STUDENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case STUDENT_UPDATE_RESET:
        return { student: {} };
      default:
        return state;
    }
  };
  
  export const studentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case STUDENT_DELETE_REQUEST:
        return { loading: true };
      case STUDENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case STUDENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
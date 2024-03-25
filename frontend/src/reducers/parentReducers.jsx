import {
    // Parent Create Constants
    PARENT_CREATE_REQUEST,
    PARENT_CREATE_SUCCESS,
    PARENT_CREATE_FAIL,
  
    // Parent List Constants
    PARENT_LIST_REQUEST,
    PARENT_LIST_SUCCESS,
    PARENT_LIST_FAIL,
    PARENT_LIST_RESET,
  
    // Parent Details Constants
    PARENT_DETAILS_REQUEST,
    PARENT_DETAILS_SUCCESS,
    PARENT_DETAILS_FAIL,
    PARENT_DETAILS_RESET,
  
    // Parent Update Constants
    PARENT_UPDATE_REQUEST,
    PARENT_UPDATE_SUCCESS,
    PARENT_UPDATE_FAIL,
    PARENT_UPDATE_RESET,
  
    // Parent Delete Constants
    PARENT_DELETE_REQUEST,
    PARENT_DELETE_SUCCESS,
    PARENT_DELETE_FAIL,
    PARENT_STUDENT_LIST_REQUEST,
    PARENT_STUDENT_LIST_RESET,
    PARENT_STUDENT_LIST_FAIL,
    PARENT_STUDENT_LIST_SUCCESS,
  } from '../constants/parentConstants';
  
  export const parentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PARENT_CREATE_REQUEST:
        return { loading: true };
      case PARENT_CREATE_SUCCESS:
        return { loading: false, success: true, parent: action.payload };
      case PARENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const parentListReducer = (state = { parents: [] }, action) => {
    switch (action.type) {
      case PARENT_LIST_REQUEST:
        return { loading: true, parents: [] };
      case PARENT_LIST_SUCCESS:
        return { loading: false, parents: action.payload };
      case PARENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PARENT_LIST_RESET:
        return { parents: [] };
      default:
        return state;
    }
  };

  export const parentStudentListReducer = (state = { students: [] }, action) => {
    switch (action.type) {
      case PARENT_STUDENT_LIST_REQUEST:
        return { loading: true, students: [] };
      case PARENT_STUDENT_LIST_SUCCESS:
        return { loading: false, students: action.payload };
      case PARENT_STUDENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PARENT_STUDENT_LIST_RESET:
        return { students: [] };
      default:
        return state;
    }
  };
  
  export const parentDetailsReducer = (state = { parent: {} }, action) => {
    switch (action.type) {
      case PARENT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case PARENT_DETAILS_SUCCESS:
        return { loading: false, parent: action.payload };
      case PARENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case PARENT_DETAILS_RESET:
        return { parent: {} };
      default:
        return state;
    }
  };
  
  export const parentUpdateReducer = (state = { parent: {} }, action) => {
    switch (action.type) {
      case PARENT_UPDATE_REQUEST:
        return { loading: true };
      case PARENT_UPDATE_SUCCESS:
        return { loading: false, success: true, parent: action.payload };
      case PARENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PARENT_UPDATE_RESET:
        return { parent: {} };
      default:
        return state;
    }
  };
  
  export const parentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PARENT_DELETE_REQUEST:
        return { loading: true };
      case PARENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PARENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
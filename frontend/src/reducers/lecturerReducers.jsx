// Import your lecturer action constants
import {
    LECTURER_CREATE_REQUEST,
    LECTURER_CREATE_SUCCESS,
    LECTURER_CREATE_FAIL,
    LECTURER_LIST_REQUEST,
    LECTURER_LIST_SUCCESS,
    LECTURER_LIST_FAIL,
    LECTURER_LIST_RESET,
    LECTURER_DETAILS_REQUEST,
    LECTURER_DETAILS_SUCCESS,
    LECTURER_DETAILS_FAIL,
    LECTURER_DETAILS_RESET,
    LECTURER_UPDATE_REQUEST,
    LECTURER_UPDATE_SUCCESS,
    LECTURER_UPDATE_FAIL,
    LECTURER_UPDATE_RESET,
    LECTURER_DELETE_REQUEST,
    LECTURER_DELETE_SUCCESS,
    LECTURER_DELETE_FAIL,
  } from '../constants/lecturerConstants';
  
  // Lecturer Create Reducer
  export const lecturerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case LECTURER_CREATE_REQUEST:
        return { loading: true };
      case LECTURER_CREATE_SUCCESS:
        return { loading: false, success: true, lecturer: action.payload };
      case LECTURER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Lecturer List Reducer
  export const lecturerListReducer = (state = { lecturers: [] }, action) => {
    switch (action.type) {
      case LECTURER_LIST_REQUEST:
        return { loading: true, lecturers: [] };
      case LECTURER_LIST_SUCCESS:
        return { loading: false, lecturers: action.payload };
      case LECTURER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case LECTURER_LIST_RESET:
        return { lecturers: [] };
      default:
        return state;
    }
  };
  
  // Lecturer Details Reducer
  export const lecturerDetailsReducer = (state = { lecturer: {} }, action) => {
    switch (action.type) {
      case LECTURER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case LECTURER_DETAILS_SUCCESS:
        return { loading: false, lecturer: action.payload };
      case LECTURER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case LECTURER_DETAILS_RESET:
        return { lecturer: {} };
      default:
        return state;
    }
  };
  
  // Lecturer Update Reducer
  export const lecturerUpdateReducer = (state = { lecturer: {} }, action) => {
    switch (action.type) {
      case LECTURER_UPDATE_REQUEST:
        return { loading: true };
      case LECTURER_UPDATE_SUCCESS:
        return { loading: false, success: true, lecturer: action.payload };
      case LECTURER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case LECTURER_UPDATE_RESET:
        return { lecturer: {} };
      default:
        return state;
    }
  };
  
  // Lecturer Delete Reducer
  export const lecturerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case LECTURER_DELETE_REQUEST:
        return { loading: true };
      case LECTURER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case LECTURER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
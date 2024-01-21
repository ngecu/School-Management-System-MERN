// examReducer.js

import {
    EXAM_CREATE_REQUEST,
    EXAM_CREATE_SUCCESS,
    EXAM_CREATE_FAIL,
    GET_ALL_EXAMS_REQUEST,
    GET_ALL_EXAMS_SUCCESS,
    GET_ALL_EXAMS_FAIL,
  } from '../constants/examConstants';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const examCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case EXAM_CREATE_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case EXAM_CREATE_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case EXAM_CREATE_FAIL:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const getAllExamsReducer = (state = { exams: [] }, action) => {
    switch (action.type) {
      case GET_ALL_EXAMS_REQUEST:
        return { loading: true, exams: [] };
      case GET_ALL_EXAMS_SUCCESS:
        return { loading: false, exams: action.payload };
      case GET_ALL_EXAMS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
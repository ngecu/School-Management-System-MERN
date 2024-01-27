// examResultReducer.js

import {
    EXAM_RESULT_CREATE_REQUEST,
    EXAM_RESULT_CREATE_SUCCESS,
    EXAM_RESULT_CREATE_FAIL,
    GET_ALL_EXAM_RESULTS_REQUEST,
    GET_ALL_EXAM_RESULTS_SUCCESS,
    GET_ALL_EXAM_RESULTS_FAIL,
    GET_EXAM_RESULT_DETAILS_REQUEST,
    GET_EXAM_RESULT_DETAILS_SUCCESS,
    GET_EXAM_RESULT_DETAILS_FAIL,
    EXAM_RESULT_UPDATE_REQUEST,
    EXAM_RESULT_UPDATE_SUCCESS,
    EXAM_RESULT_UPDATE_FAIL,
    EXAM_RESULT_DELETE_REQUEST,
    EXAM_RESULT_DELETE_SUCCESS,
    EXAM_RESULT_DELETE_FAIL,
  } from '../constants/examResultConstants';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const examResultCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case EXAM_RESULT_CREATE_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case EXAM_RESULT_CREATE_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case EXAM_RESULT_CREATE_FAIL:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllExamResultsReducer = (state = { examResults: [] }, action) => {
    switch (action.type) {
      case GET_ALL_EXAM_RESULTS_REQUEST:
        return { loading: true, examResults: [] };
      case GET_ALL_EXAM_RESULTS_SUCCESS:
        return { loading: false, examResults: action.payload };
      case GET_ALL_EXAM_RESULTS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getExamResultDetailsReducer = (state = { examResult: {} }, action) => {
    switch (action.type) {
      case GET_EXAM_RESULT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case GET_EXAM_RESULT_DETAILS_SUCCESS:
        return { loading: false, examResult: action.payload };
      case GET_EXAM_RESULT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const examResultUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
      case EXAM_RESULT_UPDATE_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case EXAM_RESULT_UPDATE_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case EXAM_RESULT_UPDATE_FAIL:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const examResultDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
      case EXAM_RESULT_DELETE_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case EXAM_RESULT_DELETE_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case EXAM_RESULT_DELETE_FAIL:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
// assignmentReducers.js

import {
    ASSIGNMENT_CREATE_REQUEST,
    ASSIGNMENT_CREATE_SUCCESS,
    ASSIGNMENT_CREATE_FAIL,
    ASSIGNMENT_LIST_REQUEST,
    ASSIGNMENT_LIST_SUCCESS,
    ASSIGNMENT_LIST_FAIL,
    ASSIGNMENT_DETAILS_REQUEST,
    ASSIGNMENT_DETAILS_SUCCESS,
    ASSIGNMENT_DETAILS_FAIL,
    SUBMISSION_CREATE_REQUEST,
    SUBMISSION_CREATE_SUCCESS,
    SUBMISSION_CREATE_FAIL,
    SUBMISSION_LIST_REQUEST,
    SUBMISSION_LIST_SUCCESS,
    SUBMISSION_LIST_FAIL,
    SUBMISSION_DETAILS_REQUEST,
    SUBMISSION_DETAILS_SUCCESS,
    SUBMISSION_DETAILS_FAIL,
  } from '../constants/assignmentConstants';
  
  export const assignmentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ASSIGNMENT_CREATE_REQUEST:
        return { loading: true };
      case ASSIGNMENT_CREATE_SUCCESS:
        return { loading: false, success: true, assignment: action.payload };
      case ASSIGNMENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const assignmentListReducer = (state = { assignments: [] }, action) => {
    switch (action.type) {
      case ASSIGNMENT_LIST_REQUEST:
        return { loading: true, assignments: [] };
      case ASSIGNMENT_LIST_SUCCESS:
        return { loading: false, assignments: action.payload };
      case ASSIGNMENT_LIST_FAIL:
        return { loading: false, error: action.payload, assignments: [] };
      default:
        return state;
    }
  };
  
  export const assignmentDetailsReducer = (state = { assignment: {} }, action) => {
    switch (action.type) {
      case ASSIGNMENT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case ASSIGNMENT_DETAILS_SUCCESS:
        return { loading: false, assignment: action.payload };
      case ASSIGNMENT_DETAILS_FAIL:
        return { loading: false, error: action.payload, assignment: {} };
      default:
        return state;
    }
  };
  
  export const submissionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBMISSION_CREATE_REQUEST:
        return { loading: true };
      case SUBMISSION_CREATE_SUCCESS:
        return { loading: false, success: true, submission: action.payload };
      case SUBMISSION_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const submissionListReducer = (state = { submissions: [] }, action) => {
    switch (action.type) {
      case SUBMISSION_LIST_REQUEST:
        return { loading: true, submissions: [] };
      case SUBMISSION_LIST_SUCCESS:
        return { loading: false, submissions: action.payload };
      case SUBMISSION_LIST_FAIL:
        return { loading: false, error: action.payload, submissions: [] };
      default:
        return state;
    }
  };
  
  export const submissionDetailsReducer = (state = { submission: {} }, action) => {
    switch (action.type) {
      case SUBMISSION_DETAILS_REQUEST:
        return { loading: true, ...state };
      case SUBMISSION_DETAILS_SUCCESS:
        return { loading: false, submission: action.payload };
      case SUBMISSION_DETAILS_FAIL:
        return { loading: false, error: action.payload, submission: {} };
      default:
        return state;
    }
  };
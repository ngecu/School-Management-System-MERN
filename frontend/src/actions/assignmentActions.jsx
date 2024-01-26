// assignmentActions.js

import axios from 'axios';
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

const base_url = `http://localhost:5000/api/assignments`; // Update with your API URL

// Action creators for assignment
export const createAssignment = (assignmentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASSIGNMENT_CREATE_REQUEST });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Configure headers with authorization token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API request to create assignment
    const { data } = await axios.post(base_url, assignmentData, config);

    dispatch({
      type: ASSIGNMENT_CREATE_SUCCESS,
      payload: data.data,
    });

    // Redirect or handle success as needed
    // document.location.href = '/assignments'; // Example redirect

  } catch (error) {
    dispatch({
      type: ASSIGNMENT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listAssignments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ASSIGNMENT_LIST_REQUEST });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Configure headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API request to get list of assignments
    const { data } = await axios.get(base_url, config);

    dispatch({
      type: ASSIGNMENT_LIST_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: ASSIGNMENT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAssignmentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASSIGNMENT_DETAILS_REQUEST });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Configure headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API request to get assignment details by ID
    const { data } = await axios.get(`${base_url}/${id}`, config);

    dispatch({
      type: ASSIGNMENT_DETAILS_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: ASSIGNMENT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action creators for submission
export const createSubmission = (submissionData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBMISSION_CREATE_REQUEST });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Configure headers with authorization token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API request to create submission
    const { data } = await axios.post(`http://localhost:5000/api/submissions`, submissionData, config); // Update with your API URL

    dispatch({
      type: SUBMISSION_CREATE_SUCCESS,
      payload: data.data,
    });

    // Redirect or handle success as needed
    // document.location.href = '/submissions'; // Example redirect

  } catch (error) {
    dispatch({
      type: SUBMISSION_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listSubmissions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBMISSION_LIST_REQUEST });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Configure headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API request to get list of submissions
    const { data } = await axios.get(`http://localhost:5000/api/submissions`, config); // Update with your API URL

    dispatch({
      type: SUBMISSION_LIST_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: SUBMISSION_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getSubmissionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBMISSION_DETAILS_REQUEST });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Configure headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API request to get submission details by ID
    const { data } = await axios.get(`http://localhost:5000/api/submissions/${id}`, config); // Update with your API URL

    dispatch({
      type: SUBMISSION_DETAILS_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: SUBMISSION_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

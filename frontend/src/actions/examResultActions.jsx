import axios from 'axios';
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

const base_url = `http://localhost:5000/api/exam-results`;

export const createExamResult = (examResultData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_RESULT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${base_url}`, examResultData, config);

    dispatch({
      type: EXAM_RESULT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_RESULT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllExamResults = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_EXAM_RESULTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${base_url}`, config);

    dispatch({
      type: GET_ALL_EXAM_RESULTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EXAM_RESULTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExamResultDetails = (examResultId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EXAM_RESULT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${base_url}/${examResultId}`, config);

    dispatch({
      type: GET_EXAM_RESULT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXAM_RESULT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateExamResult = (examResultId, examResultData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_RESULT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${base_url}/${examResultId}`, examResultData, config);

    dispatch({
      type: EXAM_RESULT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_RESULT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExamResult = (examResultId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_RESULT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${base_url}/${examResultId}`, config);

    dispatch({
      type: EXAM_RESULT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EXAM_RESULT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
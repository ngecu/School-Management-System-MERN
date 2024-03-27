// examActions.js

import axios from 'axios';
import {
  EXAM_CREATE_REQUEST,
  EXAM_CREATE_SUCCESS,
  EXAM_CREATE_FAIL,
  GET_ALL_EXAMS_REQUEST,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_FAIL,
  EXAM_UPDATE_REQUEST,
  EXAM_UPDATE_SUCCESS,
  EXAM_UPDATE_FAIL,
  EXAM_DELETE_REQUEST,
  EXAM_DELETE_SUCCESS,
  EXAM_DELETE_FAIL,
  EXAM_DETAILS_REQUEST,
  EXAM_DETAILS_SUCCESS,
  EXAM_DETAILS_FAIL,
} from '../constants/examConstants';

const base_url = `http://localhost:5000/api/exams`;

export const createExam = (examData) => async (dispatch,getState) => {
  try {
    dispatch({ type: EXAM_CREATE_REQUEST });

    
    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
    const { data } = await axios.post(`${base_url}`, examData,config);

    dispatch({
      type: EXAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAllExams = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ALL_EXAMS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // Fetch exams from the API
      const { data } = await axios.get(`${base_url}`,config);
  
      dispatch({
        type: GET_ALL_EXAMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_EXAMS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  export const getExamDetails = (examId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXAM_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${base_url}/${examId}`, config);
  
      dispatch({
        type: EXAM_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXAM_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const updateExam = (examId, examData) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXAM_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`${base_url}/${examId}`, examData, config);
  
      dispatch({
        type: EXAM_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXAM_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const deleteExam = (examId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXAM_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`${base_url}/${examId}`, config);
  
      dispatch({
        type: EXAM_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: EXAM_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
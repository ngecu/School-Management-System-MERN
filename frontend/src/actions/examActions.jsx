// examActions.js

import axios from 'axios';
import {
  EXAM_CREATE_REQUEST,
  EXAM_CREATE_SUCCESS,
  EXAM_CREATE_FAIL,
  GET_ALL_EXAMS_REQUEST,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_FAIL,
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
    // Assuming you have a backend API endpoint for creating exams
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
  
      // Fetch exams from the API
      const { data } = await axios.get(`${base_url}`);
  
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
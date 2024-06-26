import axios from 'axios';
import {
  CREATE_FEES_REQUEST,
  CREATE_FEES_SUCCESS,
  CREATE_FEES_FAIL,
  GET_ALL_FEES_REQUEST,
  GET_ALL_FEES_SUCCESS,
  GET_ALL_FEES_FAIL,
  GET_FEES_BY_STUDENT_REQUEST,
  GET_FEES_BY_STUDENT_SUCCESS,
  GET_FEES_BY_STUDENT_FAIL,
  MARK_FEES_AS_PAID_REQUEST,
  MARK_FEES_AS_PAID_SUCCESS,
  MARK_FEES_AS_PAID_FAIL,
} from '../constants/feeConstants';

const BASE_URL = `http://localhost:5000/api/schoolfees`; 

export const createFees = () => async (dispatch,getState) => {
  try {
    dispatch({ type: CREATE_FEES_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
    const response = await axios.post(`${BASE_URL}/fees/create`,config);
    
    dispatch({ type: CREATE_FEES_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_FEES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const AllFees = () => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_ALL_FEES_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
    const {data} = await axios.get(`${BASE_URL}/`,config);
    
    dispatch({ 
        type: GET_ALL_FEES_SUCCESS, 
        payload:data 
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FEES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getFeesByStudent = (studentId) => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_FEES_BY_STUDENT_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const response = await axios.get(`${BASE_URL}/student/${studentId}`,config);
    
    dispatch({ type: GET_FEES_BY_STUDENT_SUCCESS, payload: response });
  } catch (error) {
    dispatch({
      type: GET_FEES_BY_STUDENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const markFeesAsPaid = (studentId) => async (dispatch,getState) => {
  try {
    dispatch({ type: MARK_FEES_AS_PAID_REQUEST });

    const response = await axios.put(`${BASE_URL}/fees/student/${studentId}`);
    
    dispatch({ type: MARK_FEES_AS_PAID_SUCCESS });
  } catch (error) {
    dispatch({
      type: MARK_FEES_AS_PAID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

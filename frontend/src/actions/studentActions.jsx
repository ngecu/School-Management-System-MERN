import axios from 'axios';

import {
    STUDENT_CREATE_REQUEST,
    STUDENT_CREATE_SUCCESS,
    STUDENT_CREATE_FAIL,
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,
} from '../constants/studentConstants';

const base_url = `http://localhost:5000/api/students`;


export const createStudent = (studentData) => async (dispatch, getState) => {
    try {
      dispatch({ type: STUDENT_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(base_url, studentData, config);
  
      dispatch({
        type: STUDENT_CREATE_SUCCESS,
        payload: data.data,
      });
      document.location.href = '/allStudents'

    } catch (error) {
      dispatch({
        type: STUDENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listStudents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(base_url, config);

    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data.data,
    });
    console.log("data is ",data.data);
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${base_url}/${id}`, config);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudent = (id, updatedStudentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${base_url}/${id}`, updatedStudentData, config);

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: data.data,
    });

    // Optionally, you can redirect or dispatch other actions after a successful update

  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete Student
export const deleteStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${base_url}/${id}`, config);

    dispatch({
      type: STUDENT_DELETE_SUCCESS,
    });

    // Optionally, you can dispatch other actions or update the state after successful deletion

  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
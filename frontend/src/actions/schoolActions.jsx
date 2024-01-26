import axios from 'axios';

import {
  SCHOOL_LIST_REQUEST,
  SCHOOL_LIST_SUCCESS,
  SCHOOL_LIST_FAIL,
  SCHOOL_DETAILS_REQUEST,
  SCHOOL_DETAILS_SUCCESS,
  SCHOOL_DETAILS_FAIL,
  SCHOOL_CREATE_REQUEST,
  SCHOOL_CREATE_SUCCESS,
  SCHOOL_CREATE_FAIL,
  SCHOOL_UPDATE_REQUEST,
} from '../constants/schoolConstants';

const base_url = `http://localhost:5000/api/schools`;

export const listSchools = () => async (dispatch,getState) => {
  try {
    dispatch({ type: SCHOOL_LIST_REQUEST });


    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };


    const { data } = await axios.get(`${base_url}/`,config);
    console.log("data us ",data);

    dispatch({
      type: SCHOOL_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSchoolDetails = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: SCHOOL_DETAILS_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const { data } = await axios.get(`${base_url}/${id}`,config);


    dispatch({
      type: SCHOOL_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSchool = (schoolData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCHOOL_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(base_url, schoolData, config);

    dispatch({
      type: SCHOOL_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSchool = (id, schoolData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCHOOL_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${base_url}/${id}`, schoolData, config);

    dispatch({
      type: SCHOOL_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSchool = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCHOOL_DELETE_REQUEST });

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
      type: SCHOOL_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

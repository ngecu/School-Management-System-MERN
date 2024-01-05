import axios from 'axios';

import {
  SCHOOL_LIST_REQUEST,
  SCHOOL_LIST_SUCCESS,
  SCHOOL_LIST_FAIL,
  SCHOOL_DETAILS_REQUEST,
  SCHOOL_DETAILS_SUCCESS,
  SCHOOL_DETAILS_FAIL,
} from '../constants/schoolConstants';

const base_url = 'http://localhost:5000/api/schools';

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
      payload: data,
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

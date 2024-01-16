// conversationActions.js

import axios from 'axios';
import {
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  GET_ALL_CONVERSATIONS_REQUEST,
  GET_ALL_CONVERSATIONS_SUCCESS,
  GET_ALL_CONVERSATIONS_FAIL,
} from '../constants/conversationConstant';
import { GET_USER_CONVERSATIONS_FAIL, GET_USER_CONVERSATIONS_REQUEST, GET_USER_CONVERSATIONS_SUCCESS } from '../constants/conversationConstant';

const base_url = 'http://localhost:5000/api/conversation/';


// Action to create a conversation
export const createConversation = (name, groupMembers) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CONVERSATION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${base_url}`,
      { name, group_members: groupMembers },
      config
    );

    dispatch({
      type: CREATE_CONVERSATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CONVERSATION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action to get all conversations
export const getAllConversations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CONVERSATIONS_REQUEST });

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
      type: GET_ALL_CONVERSATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CONVERSATIONS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserConversations = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USER_CONVERSATIONS_REQUEST });
  
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
        type: GET_USER_CONVERSATIONS_SUCCESS,
        payload: data.conversations,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_CONVERSATIONS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
// reducers/conversationReducers.js

import {
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAIL,
    GET_ALL_CONVERSATIONS_REQUEST,
    GET_ALL_CONVERSATIONS_SUCCESS,
    GET_ALL_CONVERSATIONS_FAIL,
    GET_USER_CONVERSATIONS_REQUEST,
    GET_USER_CONVERSATIONS_SUCCESS,
    GET_USER_CONVERSATIONS_FAIL,
  } from '../constants/conversationConstant';
  

  
  // Reducer for creating a conversation
  export const createConversationReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CONVERSATION_REQUEST:
        return {
          loading: true,
        };
      case CREATE_CONVERSATION_SUCCESS:
        return {
          loading: false,
          success: true,
          conversation: action.payload.conversation,
        };
      case CREATE_CONVERSATION_FAIL:
        return {
          loading: false,
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  // Reducer for getting all conversations
  export const getAllConversationsReducer = (state = { conversations: [] }, action) => {
    switch (action.type) {
      case GET_ALL_CONVERSATIONS_REQUEST:
        return { loading: true, conversations: [] };
      case GET_ALL_CONVERSATIONS_SUCCESS:
        return { loading: false, conversations: action.payload.conversations };
      case GET_ALL_CONVERSATIONS_FAIL:
        return { loading: false, error: action.payload, conversations: [] };
      default:
        return state;
    }
  };
  
  // Reducer for getting user conversations
  export const getUserConversationsReducer = (state = { userConversations: [] }, action) => {
    switch (action.type) {
      case GET_USER_CONVERSATIONS_REQUEST:
        return { loading: true, userConversations: [] };
      case GET_USER_CONVERSATIONS_SUCCESS:
        return { loading: false, userConversations: action.payload };
      case GET_USER_CONVERSATIONS_FAIL:
        return { loading: false, error: action.payload, userConversations: [] };
      default:
        return state;
    }
  };
  
import {
    CHAT_FETCH_MESSAGES_REQUEST,
    CHAT_FETCH_MESSAGES_SUCCESS,
    CHAT_FETCH_MESSAGES_FAILURE,
    CHAT_SEND_MESSAGE_REQUEST,
    CHAT_SEND_MESSAGE_SUCCESS,
    CHAT_SEND_MESSAGE_FAILURE,
 
    CHAT_DELETE_MESSAGE_SUCCESS,
    CHAT_EDIT_MESSAGE_SUCCESS,
    CHAT_LEAVE_CONVERSATION_SUCCESS,
    CHAT_JOIN_CONVERSATION_SUCCESS,
  } from '../constants/chatConstants';
  
  // Chat Fetch Messages Reducer
export const chatFetchMessagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
      case CHAT_FETCH_MESSAGES_REQUEST:
        return { ...state, loading: true, messages: [] };
      case CHAT_FETCH_MESSAGES_SUCCESS:
        return { loading: false, messages: action.payload };
      case CHAT_FETCH_MESSAGES_FAILURE:
        return { loading: false, error: action.payload, messages: [] };
      default:
        return state;
    }
  };
  
  // Chat Send Message Reducer
  export const chatSendMessageReducer = (state = {}, action) => {
    switch (action.type) {
      case CHAT_SEND_MESSAGE_REQUEST:
        return { loading: true };
      case CHAT_SEND_MESSAGE_SUCCESS:
        return { loading: false, success: true };
      case CHAT_SEND_MESSAGE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Chat Active Conversation Reducer
  export const chatActiveConversationReducer = (state = null, action) => {
    switch (action.type) {
      case CHAT_JOIN_CONVERSATION_SUCCESS: // Fix the action type
        return action.payload.userId;
      case CHAT_LEAVE_CONVERSATION_SUCCESS: // Fix the action type
        return null;
      default:
        return state;
    }
  };
  
  // Chat Edit and Delete Message Reducer
  export const chatEditDeleteMessageReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
      case CHAT_EDIT_MESSAGE_SUCCESS: // Fix the action type
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.id === action.payload.messageId
              ? { ...message, text: action.payload.updatedMessage }
              : message
          ),
        };
      case CHAT_DELETE_MESSAGE_SUCCESS: // Fix the action type
        return {
          ...state,
          messages: state.messages.filter(
            (message) => message.id !== action.payload.messageId
          ),
        };
      default:
        return state;
    }
  };
  
  
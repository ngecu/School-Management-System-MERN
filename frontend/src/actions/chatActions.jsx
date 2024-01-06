// chatActions.js
import axios from 'axios';
import {
  CHAT_FETCH_MESSAGES_REQUEST,
  CHAT_FETCH_MESSAGES_SUCCESS,
  CHAT_FETCH_MESSAGES_FAILURE,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAILURE,

} from '../constants/chatConstants';

// Action creators
const base_url = 'http://localhost:5000/api/message';

// Fetch messages
export const fetchMessages = (conversationId) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_FETCH_MESSAGES_REQUEST });

    // Perform the API call to fetch messages based on conversationId
    const { data } = await axios.get(`${base_url}/${conversationId}`);

    dispatch({
      type: CHAT_FETCH_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_FETCH_MESSAGES_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Send message
export const sendMessageChat = (conversationId, message) => async (dispatch,getState) => {
    try {
      console.log("sending message ", conversationId, message);
      dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

  
      // Perform the API call to send a message
      const response = await axios.post(`${base_url}/`, { content: message, chatId: conversationId, user_id: userInfo._id });
  
      dispatch({ type: CHAT_SEND_MESSAGE_SUCCESS, payload: { success: true } });
  
      // Fetch updated messages after sending a message
      dispatch(fetchMessages(conversationId));
  
      return { success: true }; // Return success status
    } catch (error) {
      dispatch({
        type: CHAT_SEND_MESSAGE_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
  
      return { success: false }; // Return failure status
    }
  };



// Edit or delete message
export const editDeleteMessage = (conversationId, messageId, newMessage) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_DELETE_MESSAGE_REQUEST });

    // Perform the API call to edit or delete a message
    await axios.put(`/api/chat/${conversationId}/messages/${messageId}`, { newMessage });

    dispatch({
      type: CHAT_DELETE_MESSAGE_SUCCESS,
      payload: messageId,  // You can adjust the payload based on your needs
    });

    // Fetch updated messages after editing or deleting a message
    dispatch(fetchMessages(conversationId));
  } catch (error) {
    dispatch({
      type: CHAT_DELETE_MESSAGE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

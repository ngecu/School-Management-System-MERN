import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import './ChatScreen.css'
import { listUsers, logout } from '../actions/userActions'
import Sidebar from '../components/Sidebar'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { listStudents } from '../actions/studentActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchMessages, sendMessageChat } from '../actions/chatActions'
import {  Drawer, Modal } from 'antd';
import { createConversation, getUserConversations } from '../actions/conversationActions'

const ChatScreen = ({ location, history }) => {
  
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [client, setClient] = useState(null);
  const [conversationName, setConversationName] = useState(null);

  const [welcomeScreen,setWelcomeScreen] = useState(true)
  const [chatId, setChatId] = useState(null);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listUsers());
    dispatch(getUserConversations())
  }, [dispatch]);




const userList = useSelector((state) => state.userList);
const { loading: userListLoading, error: userListError, users } = userList;

const userConversationR = useSelector((state) => state.userConversationR);
let { loading, error, userConversations } = userConversationR;


const chatMessagesData = useSelector((state) => state.chatMessages);
const { loading: chatMessagesLoading, error: chatMessagesError, messages: chatMessages } = chatMessagesData;

const userLogin = useSelector((state) => state.userLogin);
const { loading: loginLoading, error: loginError, userInfo } = userLogin;
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  // Check if user conversations load successfully
  if (!loading && !error && userConversations) {
    // Update the local conversations state with the loaded data
    setConversations(userConversations);
  }
}, [loading, error, userConversations]);

  const showModal = () => {
    console.log("i am opening");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const newClient = new W3CWebSocket("ws://localhost:5000");
  
    newClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };
  
    newClient.onmessage = (message) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const newMessage = event.target.result;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };
  
      reader.readAsText(message.data);
    };
  
    newClient.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  
    setClient(newClient);
  
    return () => {
      if (newClient) {
        newClient.close();
      }
    };
  }, [setMessages]);
  
  

  useEffect(() => {
    // Check if the URL has a chat ID
    const extractedChatId = location.pathname.split('/')[2];
    setChatId(extractedChatId);
    setWelcomeScreen(false);
    // Fetch other data or perform actions based on the chatId if needed
    // ... rest of your code
  }, [location.pathname]);

  

  const sendMessage = () => {

    const chatId = localStorage.getItem('currentConversationId');
    console.log(chatId);
  
    // Check if chatId is available
    if (!chatId) {
      console.error('No chatId found in localStorage');
      return;
    }
    
    dispatch(sendMessageChat(chatId, inputMessage)).then((response) => {
      if (response.success) {
        // Handle success, you may redirect the user or show a success message
        console.log("responseis ",response);
      
        if (client && client.readyState === WebSocket.OPEN && inputMessage.trim() !== "") {
          client.send(inputMessage);
          setInputMessage("");
        }

      } else {
        // Handle failure, show an error message
        
       console.log(response);
      }
    });
  
  
  };

  const generateRandomName = () => {
    // Implement your logic to generate a random name here
    // For simplicity, let's use a basic example
    const randomNames = ["Conversation 1", "Random Chat", "Chat Room A", "Meeting Room"];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
  
    return randomNames[randomIndex];
  };

  const addConversation = (conversationId, conversationName,receiver) => {
    // Check if the conversation already exists in the conversations array
    const existingConversation = conversations.find((conv) => conv.id === conversationId);
  
    if (!existingConversation) {
      
      // If it doesn't exist, push the new conversation to the array
      const updatedConversations = [...conversations];
      const groupMembers = [
        {
        user:userInfo
      },

      {
        user:receiver
      },
    
    ]
      updatedConversations.push({ id: conversationId, name: conversationName,group_members:groupMembers });
      console.log("updated conversation is ",updatedConversations);

      setConversations(updatedConversations);

      // Dispatch an action to update the conversations in the Redux store
    }

    handleCancel()
  };
  

  useEffect(() => {
    if (!chatMessagesLoading && !chatMessagesError && chatMessages) {
      // Format sent_datetime to readable date time
      const formattedMessages = chatMessages.map((message) => ({
        ...message,
        sent_datetime: new Date(message.sent_datetime).toLocaleString(),
      }));

      setMessages(formattedMessages);
    }
  }, [chatMessages, chatMessagesLoading, chatMessagesError]);

  const loadConversationChat = (conversationId,person_to)=>{
    console.log("person is ", person_to[0]._id);
    
    localStorage.setItem('currentConversationId', person_to[0]._id);
    dispatch(fetchMessages(conversationId._id))
  }

  return (

    <div class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">

      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
       
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
          </li>
        
        </ul>
    
        
        <ul class="navbar-nav ml-auto">
    
    
          
         
          <li class="nav-item">
            <a class="nav-link" data-widget="navbar-search" href="#" role="button">
              <i class="fas fa-search"></i>
            </a>
            <div class="navbar-search-block">
              <form class="form-inline">
                <div class="input-group input-group-sm">
                  <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
                  <div class="input-group-append">
                    <button class="btn btn-navbar" type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                    <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
    
         
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-comments"></i>
              <span class="badge badge-danger navbar-badge">3</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" class="dropdown-item">
              
                <div class="media">
                  <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle"/>
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      Brad Diesel
                      <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                    </h3>
                    <p class="text-sm">Call me whenever you can...</p>
                    <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>
           
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
               
                <div class="media">
                  <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      John Pierce
                      <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                    </h3>
                    <p class="text-sm">I got your message bro</p>
                    <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>
              
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
               
                <div class="media">
                  <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      Nora Silvester
                      <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                    </h3>
                    <p class="text-sm">The subject goes here</p>
                    <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>
                
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>
         
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-bell"></i>
              <span class="badge badge-warning navbar-badge">15</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span class="dropdown-item dropdown-header">15 Notifications</span>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="fas fa-envelope mr-2"></i> 4 new messages
                <span class="float-right text-muted text-sm">3 mins</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="fas fa-users mr-2"></i> 8 friend requests
                <span class="float-right text-muted text-sm">12 hours</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> 3 new reports
                <span class="float-right text-muted text-sm">2 days</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" onClick={logoutHandler} role="button">
              <i class="fas fa-th-large"></i>
              <i class="fas fa-right-from-bracket"></i>
            </a>
          </li>
        </ul>
      </nav>
      
            <Sidebar />
            <div class="content-wrapper">
    
            <section class="content">
          <div class="container-fluid">
    
          <div className="row rounded-lg overflow-hidden shadow">
    
    <div className="col-5 px-0">
      <div className="bg-white">

        <div className="bg-gray px-4 py-2 bg-light">
          
          <Button type="primary" className='w-100' onClick={showModal}>
            New Chat
      </Button>

      <Modal title="New Chat" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {!userListLoading && users && users.map((student, index) => (
        <>
         { student._id !== userInfo._id && (
    <div onClick={() => addConversation(student._id, student.firstName,student)} className="list-group-item list-group-item-action active text-white rounded-0 mb-2">
        <div className="media">
            <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle" />
            <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">{student.firstName}</h6>
                </div>

            </div>
        </div>
    </div>
         )}
         </>
))}
      </Modal>
        </div>

        <div className="bg-gray px-4 py-2 bg-light">
        <div class="form-group">

    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User"/>
  </div>
          
        </div>

        {conversations && conversations.map((conversation) => {
          // console.log("convo is ",conversation);

  const isGroupChat = conversation.group_members.length > 2;

  const otherMembers = conversation.group_members
  .filter(member => {
    if (member.user) {
      // console.log("member is ", member);
      return member.user._id.toString() !== userInfo._id.toString();
    }
    return false;
  })
  .map(member => member.user.firstName)
  .join(', ');


  const displayName = isGroupChat ? conversation.name : otherMembers;
  

  const to_conv = conversation.group_members
    .filter(member => {
      if (member.user) {
        // console.log("member is ", member.user);
        return member.user._id.toString() !== userInfo._id.toString();
      }
      return false;
    })
    .map(member => member.user);
  
  // console.log("conversations ", to_conv);

  

  return (
    <div
      key={conversation._id}
      onClick={()=>loadConversationChat(conversation,to_conv)}
      className="list-group-item list-group-item-action active text-white rounded-0 mb-2"
    >
      <div className="media">
        <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle" />
        <div className="media-body ml-4">
        <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">{displayName}</h6>
                </div>
        </div>
      </div>
    </div>
  );
})}


      </div>
    </div>
   
    <div className="col-7 px-0">
      <div className="px-4 py-5 chat-box bg-white">
      {welcomeScreen && 
      <img className='w-100' src="https://res.cloudinary.com/smartsupp/image/upload/w_1200,h_680,c_fill,q_auto,f_auto/v0/upload/mig_gy5unxi4_smartsupp-mobile-app-cover2x.png" alt="" />
      }

      {!welcomeScreen && <>
        {messages.map((message, index) => {
  console.log(message);
  console.log(userInfo);
  let isSender = false;

  if (userInfo._id && message.from && message.from._id) {
    isSender = message.from._id === userInfo._id;
  }

  return (
    <p key={index}>
      <div className={`media w-50 ${isSender ? 'ml-auto' : ''} mb-3`}>
        <img
          src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
          alt="user"
          width="50"
          className="rounded-circle"
        />
        <div className="media-body ml-3">
          <div className={`bg-${isSender ? 'light' : 'primary'} rounded py-2 px-3 mb-2`}>
            <p className={`text-small mb-0 text-${isSender ? 'muted' : 'white'}`}>
              {message.message_text}
            </p>
          </div>
          <p className="small text-muted">{message.sent_datetime}</p>
        </div>
      </div>
    </p>
  );
})}


      </>}
      </div>

     
      <div className="bg-light">
        <div className="input-group">
          <input type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 py-4 bg-light"/>
          <div className="input-group-append">
            <button id="button-addon2" onClick={sendMessage} className="btn btn-link"> <i className="fa fa-paper-plane"></i></button>
          </div>
        </div>
      </div>

    </div>
  </div>
    
            
            </div>
    
            </section>
            </div>
           
    
    
    </div>


    
        </div>

  )
}

export default ChatScreen

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import './ChatScreen.css'
import { logout } from '../actions/userActions'
import Sidebar from '../components/Sidebar'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const ChatScreen = ({ location, history }) => {
  
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  const logoutHandler = () => {
    dispatch(logout());
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

    setClient(newClient);

    newClient.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

    return () => {
      if (newClient) {
        newClient.close();
      }
    };
  }, []);

  

  const sendMessage = () => {
    if (client && client.readyState === WebSocket.OPEN && inputMessage.trim() !== "") {
        client.send(inputMessage);
        setInputMessage("");
      }
  };


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
          <p className="h5 mb-0 py-1">Recent</p>
        </div>

        <div className="messages-box">
          <div className="list-group rounded-0">
            <a className="list-group-item list-group-item-action active text-white rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">25 Dec</small>
                  </div>
                  <p className="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">14 Dec</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur. incididunt ut labore.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">9 Nov</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">18 Oct</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">17 Oct</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">2 Sep</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">30 Aug</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a>

            <a href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div className="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
                <div className="media-body ml-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">21 Aug</small>
                  </div>
                  <p className="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
   
    <div className="col-7 px-0">
      <div className="px-4 py-5 chat-box bg-white">
       
        <div className="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
          <div className="media-body ml-3">
            <div className="bg-light rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-muted">Test which is a new approach all solutions</p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>


        <div className="media w-50 ml-auto mb-3">
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-white">Test which is a new approach to have all solutions</p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>

      
        <div className="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
          <div className="media-body ml-3">
            <div className="bg-light rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-muted">Test, which is a new approach to have</p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>


        <div className="media w-50 ml-auto mb-3">
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-white">Apollo University, Delhi, India Test</p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>

       
        <div className="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle"/>
          <div className="media-body ml-3">
            <div className="bg-light rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-muted">Test, which is a new approach</p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>

      
       

        {messages.map((message, index) => (
          <p key={index}>
             <div className="media w-50 ml-auto mb-3">
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-white">{message}</p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>
          </p>
        ))}


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

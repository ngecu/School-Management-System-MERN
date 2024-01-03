
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Row, Col, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Search, AccountCircle, ShoppingCart, ArrowRight  } from '@material-ui/icons';
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  
  const [open, setOpen] = useState(false);
  const [placement] = useState('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Nav className="mr-auto">
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={showDrawer} />
            </Nav>

            <LinkContainer to="/">
            <Navbar.Brand>
 <img height={40} src="https://raw.githubusercontent.com/ngecu/PHP-School-Management-System/main/img/logo/attnlg.jpg" alt="" className="rounded" />
  SCH MGT SYS
</Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse id="basic-navbar-nav">
              <Route render={({ history }) => <SearchBox history={history} />} />
              <Nav className="ml-auto">
              {!userInfo && (
                <>
                <LinkContainer to="/">
                  <Nav.Link>
                    <div className="icon-text-wrapper">
                      <AccountCircle />
                      <span>Login</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                  <Nav.Link>
                    <div className="icon-text-wrapper">
                      <AccountCircle />
                      <span>prm</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>


                <LinkContainer to="/register">
                  <Nav.Link>
                    <div className="icon-text-wrapper">
                      <AccountCircle />
                      <span>lm</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>

                
                <LinkContainer to="/register">
                  <Nav.Link>
                    <div className="icon-text-wrapper">
                      <AccountCircle />
                      <span>sm</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>


                <LinkContainer to="/register">
                  <Nav.Link>
                    <div className="icon-text-wrapper">
                      <AccountCircle />
                      <span>pm</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>
                </>
              )}
                

                {userInfo && userInfo.isAdmin && (
                 <NavDropdown title={<>
                 
                 
                  
                  <div className="icon-text-wrapper">
                      <AccountCircle />
                      <span> {userInfo.firstName}</span>
                    </div>

                   </>} id='username'>
                 <LinkContainer to='/profile'>
                   <NavDropdown.Item>Profile</NavDropdown.Item>
                 </LinkContainer>
                 <NavDropdown.Item onClick={logoutHandler}>
                   Logout
                 </NavDropdown.Item>
               </NavDropdown>
              )}
 
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="bg-dark form-small-device">
          <Container className="py-2">
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Container>
        </div>
      </header>

      <Drawer
        extra={<i onClick={onClose} className="fas fa-circle-xmark"></i>}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="bg-dark text-light text-white p-2">
          <div data-letters="SN"> School Name</div>
          <p>CONTACT US: 123-456-7890</p>
        </div>
        {/* Additional School-related Links and Information can be added here */}
      </Drawer>
    </>
  );
};

export default Header;

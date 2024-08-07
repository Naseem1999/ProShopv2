import React from 'react'
import {Nav,Navbar,Container,Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart,FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import SearchBox from './SearchBox'


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [LogoutApiCall]=useLogoutMutation();



  const logoutHandler=async()=>{
    try{
      await LogoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')
    }catch(err){
      console.log("error")
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark"  expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >
          <img src={logo} alt="Proshop" />
          ProShop
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle arial-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <SearchBox/>
               <LinkContainer to='/cart'>
                <Nav.Link ><FaShoppingCart/> cart
                {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
               
                  <Nav.Link ><FaUser/> Sign in</Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin &&(
                  <NavDropdown title='admin' id='adminmenu'>
                    <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
    </header>
  )
}

export default Header
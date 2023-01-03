import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from './screens/ProductScreen';
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
import { CartScreen } from './screens/CartScreen';
import { SigninScreen } from './screens/SigninScreen';
import { ShippingAddressScreen } from './screens/ShippingAddressScreen';
import { SignupScreen } from './screens/SignupScreen';
import { PaymentMethodScreen } from './screens/PaymentMethodScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';

function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    try {
      ctxDispatch({ type: 'USER_LOGOUT' });
      localStorage.removeItem('userInfo');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container className='mt-3'>
              <LinkContainer to="/">
                <Navbar.Brand>Title</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to="/cart" className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderHistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link className='dropdown-item' to="#signout" onClick={signoutHandler}>Sign Out</Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">Sign In</Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mb-4'>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All Right Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
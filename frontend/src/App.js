import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from './screens/ProductScreen';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';

function App() {

  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
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
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
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
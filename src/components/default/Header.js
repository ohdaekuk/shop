import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          <Nav.Link
            onClick={() => {
              navigate('/');
            }}
          >
            막둥이네
          </Nav.Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate('/cart');
            }}
          >
            Cart
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate('/event');
            }}
          >
            Event
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

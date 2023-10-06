import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';

function Header() {
  let getUserName = useQuery(['getUserName'], () =>
    axios.get(`https://codingapple1.github.io/userdata.json`).then((a) => {
      return a.data;
    }),
  );

  // 1

  const savePerson = useMutation(
    () => axios.get('https://codingapple1.github.io/userdata.json'),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log('onSuccess');
      },
      onError: (error) => {
        // 요청에 에러가 발생된 경우
        console.log('onError');
      },
      onSettled: () => {
        // 요청이 성공하든, 에러가 발생되든 실행하고 싶은 경우
        console.log('onSettled');
      },
    },
  );

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
        <Nav className="ms-auto">
          {getUserName.isLoading ? (
            '로딩중'
          ) : (
            <div>
              <b>{getUserName.data.name}</b>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

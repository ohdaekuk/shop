import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import axios from 'axios';

import data from './api/data';

import Home from './components/Home';

import Detail from './components/Detail';
import Event from './components/Event';
import About from './components/About';
import Cart from './components/Cart';

function App() {
  const navigate = useNavigate();

  const [shoes, setShoes] = useState(data);

  const addData = (data) => {
    const copy = [...shoes, ...data];
    setShoes(copy);
  };

  return (
    <div className="App">
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
                navigate('/');
              }}
            >
              Home
            </Nav.Link>

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

      <Routes>
        {shoes ? (
          <Route
            path="/"
            element={
              <Home shoes={shoes} navigate={navigate} addData={addData} />
            }
          />
        ) : null}

        <Route path="*" element={<div>404 ERROR</div>} />

        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="/about" element={<About />}>
          {/* 어디에 보여줄지 정해야함 => Oulet 사용해야함 */}
          <Route path="member" element={<div> 멤버임 </div>} />
          <Route path="location" element={<div> 위치정보임 </div>} />
        </Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;

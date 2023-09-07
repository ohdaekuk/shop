import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import axios from 'axios';

import data from './api/data';

import Card from './components/Card';
import Detail from './components/Detail';
import Event from './components/Event';
import About from './components/About';
import Cart from './components/Cart';

function App() {
  const navigate = useNavigate();

  const [shoes, setShoes] = useState(data);

  const [showButton, setShowButton] = useState(true);
  const [apiCount, setApiCount] = useState(2);
  const [apiLoading, setApiLoading] = useState(false);

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
            <Nav.Link>Product</Nav.Link>
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
              <>
                <div className="main-bg" />
                <div className="container">
                  {apiLoading ? (
                    <div className="loading-box">
                      <b>막둥이 귀엽다</b>
                    </div>
                  ) : null}
                  <div className="row">
                    {shoes.map((item, index) => (
                      <Card
                        navigate={navigate}
                        item={shoes[index]}
                        index={index}
                        key={item.title}
                      />
                    ))}
                  </div>
                </div>
                {showButton ? (
                  <button
                    onClick={async () => {
                      setApiLoading(true);
                      await axios
                        .get(
                          `https://codingapple1.github.io/shop/data${apiCount}.json`,
                        )
                        .then((res) => {
                          setApiCount(apiCount + 1);
                          addData(res.data);
                          setApiLoading(false);
                        })
                        .catch((e) => {
                          setShowButton(!showButton);
                          alert('데이터 없음');
                          setApiCount(2);
                          setApiLoading(false);
                        });
                    }}
                  >
                    버튼
                  </button>
                ) : null}
              </>
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

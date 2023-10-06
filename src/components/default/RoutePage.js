import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from '../Home';
import Detail from '../Detail';
import Event from '../Event';
import About from '../About';
import Cart from '../Cart';

import data from '../../api/data';

function RoutePage() {
  const [shoes, setShoes] = useState(data);

  const navigate = useNavigate();

  const addData = (data) => {
    const copy = [...shoes, ...data];
    setShoes(copy);
  };

  return (
    <Routes>
      {shoes ? (
        <Route
          path="/"
          element={<Home shoes={shoes} navigate={navigate} addData={addData} />}
        />
      ) : null}

      <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
      <Route path="/about" element={<About />}>
        {/* 어디에 보여줄지 정해야함 => Oulet 사용해야함 */}
        <Route path="member" element={<div> 멤버임 </div>} />
        <Route path="location" element={<div> 위치정보임 </div>} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/event" element={<Event />}>
        <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
        <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
      </Route>
      <Route path="*" element={<div>404 ERROR</div>} />
    </Routes>
  );
}

export default RoutePage;

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { addContent } from '../store/cartSlice';

// import styled from "styled-components";

// const YellowBtn = styled.button`
//   background: ${({ bg }) => bg};
//   color: baclk;
//   padding: 10px;
// `;

// useEffect(() => {}); 재렌더링마다 코드 실행
// useEffect(() => {}, []); mount시 코드 실행
// useEffect(() => {
//   return () => {
// unmount시 코드 실행
// };
// }, []);
// useEffect(()=>{},[변수]) 특정 변수 변경시에 코드 실행

function Detail({ shoes }) {
  // 특정 DOM 요소에 접근할 때 사용 => useRef()
  const inputRef = useRef(null);

  const { id } = useParams(); // router params

  const dispatch = useDispatch();

  const [warn, setWarn] = useState(true);
  const [input, setInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const [detailFade, setDetailFade] = useState('');

  let findItem = shoes.find((a) => a.id === Number(id));

  const setStorage = useCallback(() => {
    let localWatched = JSON.parse(localStorage.getItem('watched'));

    if (localWatched) {
      // findIndex를 이용한 중복 제거

      // const index = localWatched.findIndex((item) => item === findItem.id);

      // if (index === -1) {
      //   localWatched.push(findItem.id);
      // }

      // =======================================================================

      // Set을 이용한 중복 제거

      localWatched.push(findItem.id);

      localWatched = new Set(localWatched);
      localWatched = Array.from(localWatched);

      localStorage.setItem('watched', JSON.stringify(localWatched));
    } else {
      localStorage.setItem('watched', JSON.stringify([]));
      localWatched = JSON.parse(localStorage.getItem('watched'));

      localWatched.push(findItem.id);
      localStorage.setItem('watched', JSON.stringify(localWatched));
    }
  }, [findItem.id]);

  const enterCheck = (event, item, type) => {
    if (event.key === 'Enter' && type === 'input') {
      if (input !== '') {
        dispatch(
          addContent({
            id: item.id,
            title: item.title,
            count: Number(input),
          }),
        );
        alert('장바구니에 추가되었습니다.');
      } else {
        alert('수량을 입력해주세요');
      }
    } else if (type === 'button') {
      if (input !== '') {
        dispatch(
          addContent({
            id: item.id,
            title: item.title,
            count: Number(input),
          }),
        );
        alert('장바구니에 추가되었습니다.');
      } else {
        alert('수량을 입력해주세요');
      }
    }
  };

  useEffect(() => {
    setDetailFade('detailEnd');
    inputRef.current.focus();

    let timer = setTimeout(() => {
      setWarn(false);
    }, 2000);

    setStorage();

    return () => {
      clearTimeout(timer);
    };
  }, [setStorage]);

  useEffect(() => {
    if (isNaN(input) === true) {
      alert('숫자만');
      setInput('');
    }
  }, [input]);

  return (
    <div className={`container detailStart ${detailFade}`}>
      {warn === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              Number(id) + 1
            }.jpg`}
            alt=""
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input
            placeholder="수량 입력"
            ref={inputRef}
            style={{ marginTop: '30px' }}
            value={input}
            onChange={(e) => {
              setInput(e.target.value.trim());
            }}
            onKeyDown={(e) => {
              enterCheck(e, findItem, 'input');
            }}
          />
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}원</p>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              enterCheck(e, findItem, 'button');
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTabIndex(0);
            }}
            eventKey="link0"
          >
            피츄
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTabIndex(1);
            }}
            eventKey="link1"
          >
            피카츄
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTabIndex(2);
            }}
            eventKey="link2"
          >
            라이츄
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabIndex={tabIndex} />
    </div>
  );
}

function TabContent({ tabIndex }) {
  const [fade, setFade] = useState('');

  useEffect(() => {
    let fadeTimer = setTimeout(() => {
      setFade('end');
    }, 50);

    return () => {
      setFade('');
      clearTimeout(fadeTimer);
    };
  }, [tabIndex]);

  return (
    <div className={`start ${fade}`}>
      {[<div>피츄</div>, <div>피카츄</div>, <div>라이츄</div>][tabIndex]}
    </div>
  );
}

export default Detail;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

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
  const { id } = useParams(); // router params

  const [warn, setWarn] = useState(true);
  const [input, setInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const [detailFade, setDetailFade] = useState('');

  let findItem = shoes.find((a) => a.id === Number(id));

  useEffect(() => {
    setDetailFade('detailEnd');
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setWarn(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
            style={{ marginTop: '30px' }}
            value={input}
            onChange={(e) => {
              setInput(e.target.value.trim());
            }}
          />
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}원</p>
          <button className="btn btn-danger">주문하기</button>
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

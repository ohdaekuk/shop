import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import Card from './Card';
import RecentView from './RecentView';

function Home({ shoes, navigate, addData }) {
  const [showButton, setShowButton] = useState(true);
  const [apiCount, setApiCount] = useState(2);
  const [apiLoading, setApiLoading] = useState(false);
  const [recentId, setRecentId] = useState([]);

  const checkRecentId = useCallback(() => {
    if (!recentId) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, [recentId]);

  useEffect(() => {
    setRecentId(JSON.parse(localStorage.getItem('watched')));
  }, []);

  useEffect(() => {
    checkRecentId();
  }, [checkRecentId]);

  return (
    <>
      <div className="main-bg" />

      {recentId ? <RecentView navigate={navigate} recentId={recentId} /> : null}

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
              .get(`https://codingapple1.github.io/shop/data${apiCount}.json`)
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
  );
}

export default Home;

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemInfo } from '../store/cartSlice';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const RecentList = styled.span`
  margin-right: 4px;
`;

function RecentView({ navigate, recentId }) {
  const { recentProductInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getInfo = useCallback(() => {
    if (recentId.length > 0) {
      dispatch(getItemInfo(recentId));
    }
  }, [recentId, dispatch]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <div>
      {recentProductInfo.length > 0 ? (
        <div>
          <RecentList>최근 목록 ={'>'}</RecentList>

          {recentProductInfo.map((item, index) => (
            <Nav.Link
              key={index}
              style={{ display: 'inline-block' }}
              onClick={() => {
                navigate(`detail/${item.id}`);
              }}
            >
              <b>{recentProductInfo[index].name}</b>
              <RecentList>
                {index !== recentProductInfo.length - 1 ? ',' : null}
              </RecentList>
            </Nav.Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default RecentView;

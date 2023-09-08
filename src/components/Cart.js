import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addAge, updateName } from '../store/userSlice';
import { updateCount, removeContent, removeContents } from '../store/cartSlice';

function Cart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [deleteIndex, setDeleteIndex] = useState([]);
  const selectBox = document.getElementsByName('cartCheckbox');

  const checked = (value, checked) => {
    const index = deleteIndex.findIndex((item) => item === value);

    if (checked && index === -1) {
      const copy = [...deleteIndex];
      copy.push(value);
      setDeleteIndex(copy);
    } else {
      const copy = [...deleteIndex];
      copy.splice(index, 1);
      setDeleteIndex(copy);
    }
  };

  useEffect(() => {
    console.log(deleteIndex);
  }, [deleteIndex]);

  return (
    <div>
      <h5>
        {state.user.age}살 {state.user.name}의 장바구니
      </h5>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => {
          dispatch(addAge());
        }}
      >
        나이먹기
      </button>
      <div className="main-bg" />
      <Table>
        <thead>
          <tr>
            <th>고유번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>추가하기</th>
            <th>삭제하기</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {state.cart
            ? state.cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <b>{item.name}</b>
                    </td>
                    <td>{item.count}</td>

                    <td>
                      <button
                        onClick={() => {
                          // setModify(true);
                          // setModalData(item);
                          dispatch(updateName());
                          dispatch(updateCount(item.id));
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          dispatch(removeContent(index));
                        }}
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <input
                        name="cartCheckbox"
                        type="checkbox"
                        value={item.id}
                        onClick={(e) => {
                          if (e.target.checked) {
                            checked(e.target.value, true);
                          } else {
                            checked(e.target.value, false);
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <button
        onClick={() => {
          dispatch(removeContents(deleteIndex));
          selectBox.forEach((box) => {
            box.checked = false;
          });
        }}
      >
        선택 삭제
      </button>
    </div>
  );
}

export default Cart;

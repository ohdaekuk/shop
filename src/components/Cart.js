import { useState } from 'react';
import { Table, Modal, Button, InputGroup, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {
  const tableData = useSelector((state) => state.cartData);

  const [modify, setModify] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <div>
      <div className="main-bg" />
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.name}</b>
                </td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      setModify(true);
                      setModalData(item);
                    }}
                  >
                    수정
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <CartModal modalData={modalData} setModify={setModify} show={modify} />
    </div>
  );
}

function CartModal({ modalData, setModify, show }) {
  const closeModal = () => setModify(false);

  return (
    <div>
      {modalData ? (
        <div>
          <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="name"
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="count"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={closeModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;

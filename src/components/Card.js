import { Nav, Row, Col } from "react-bootstrap";

function Card({ navigate, data }) {
  return (
    <Row>
      {data.map((item, index) => {
        return (
          <Col key={index}>
            <Nav.Link>
              <img
                src={`https://codingapple1.github.io/shop/shoes${
                  index + 1
                }.jpg`}
                alt=""
                width="80%"
                onClick={() => {
                  navigate(`detail/${index}`);
                }}
              />
            </Nav.Link>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}원</p>
          </Col>
        );
      })}
    </Row>
  );
}

export default Card;

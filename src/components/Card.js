import { Nav } from "react-bootstrap";

function Card({ navigate, item, index }) {
  return (
    <div className="col-md-4">
      <Nav.Link
        onClick={() => {
          navigate(`detail/${item.id}`);
        }}
      >
        <img
          src={`https://codingapple1.github.io/shop/shoes${index + 1}.jpg`}
          alt=""
          width="80%"
        />

        <h5>{item.title}</h5>
        <p>{item.content}</p>
        <p>{item.price}원</p>
      </Nav.Link>
    </div>
  );
}

export default Card;

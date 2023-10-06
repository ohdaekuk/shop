import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const CardImage = styled.img`
  width: 80%;
`;

function Card({ navigate, item, index }) {
  return (
    <div className="col-md-4">
      <Nav.Link
        onClick={() => {
          navigate(`detail/${item.id}`);
        }}
      >
        <CardImage
          src={`https://codingapple1.github.io/shop/shoes${index + 1}.jpg`}
          alt=""
        />

        <h5>{item.title}</h5>
        <p>{item.content}</p>
        <p>{item.price}원</p>
      </Nav.Link>
    </div>
  );
}

export default Card;

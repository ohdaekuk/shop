import { Outlet } from "react-router-dom";

function Event() {
  return (
    <div>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default Event;

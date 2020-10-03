import React from "react";
import SubmitLink from "../components/SubmitLink";
import CardList from "../components/CardList";
import OrderList from "../components/OrderList";
import PageBar from "../components/PageBar";
const List = () => {
  return (
    <div className="list-container">
      <SubmitLink />
      <hr style={{ backgroundColor: "#ded6d6", border: "1px solid #ded6d6", borderRadius: "7px 7px 7px 7px", height: "1px" }} />
      <OrderList/>
      <CardList />
      <PageBar/>
    </div>
  );
};

export default List;

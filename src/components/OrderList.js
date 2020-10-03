import React from "react";
import { Store } from "../state/Provider";
import Action from "../state";
import { useSelector } from "react-redux";

const OrderList = () => {
  const sortOrder = useSelector((state) => state.default.sort_order);

  const handleSortOrder = (value) => {
    Store.dispatch(Action.update("sort_order", value));
  };
  return (
    <select value={sortOrder} onChange={(e) => handleSortOrder(e.target.value)}>
      <option value="last_added">Last Added</option>
      <option value="first_added">First Added</option>
      <option value="most_voted">Most Voted</option>
      <option value="least_voted">Least Voted</option>
    </select>
  );
};

export default OrderList;

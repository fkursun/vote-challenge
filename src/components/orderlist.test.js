import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OrderList from "./OrderList";
import { Provider, Store } from "../state/Provider";
import Action from "../state";

let dom;
beforeEach(() => {
  Store.dispatch(Action.update("sort_order", "last_added"));
  dom = render(
    <Provider>
      <OrderList />
    </Provider>
  );
});

test("just renders a select element", () => {
  expect(dom.container.querySelectorAll("select").length).toEqual(1);
});

test("it will set to sort by on initial render", () => {
  expect(dom.container.querySelectorAll("select")[0].value).toBe("last_added");
});

test("it will set to sort by first_added when sort_order equals to first_added", () => {
  const select = dom.container.querySelectorAll("select")[0];
  fireEvent.change(select, { target: { value: "first_added" } });
  expect(select.value).toBe("first_added");
});

test("it will set to sort by most_voted when sort_order equals to most_voted", () => {
  const select = dom.container.querySelectorAll("select")[0];
  fireEvent.change(select, { target: { value: "most_voted" } });
  expect(select.value).toBe("most_voted");
});

test("it will set to sort by least_voted when sort_order equals to least_voted", () => {
  const select = dom.container.querySelectorAll("select")[0];
  fireEvent.change(select, { target: { value: "least_voted" } });
  expect(select.value).toBe("least_voted");
});

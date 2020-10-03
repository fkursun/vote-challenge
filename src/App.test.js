import React from "react";
import { render, fireEvent, screen, queryByAttribute } from "@testing-library/react";
import App from "./App";
import { Provider, Store } from "./state/Provider";
import Action from "./state";

let dom;
const card = {
  vote: 0,
  title: "Hacker News",
  timestamp: 15389312,
  link: "https://www.google.com",
  id: 0,
};
beforeEach(() => {
  dom = render(
    <Provider>
      <App />
    </Provider>
  );
});

afterEach(() => {
  Store.dispatch(Action.update("cards", []));
});

test("renders list page on initial render", () => {
  expect(dom.container.getElementsByClassName("list-container").length).toEqual(1);
});

test("initializes local storage with an empty array", () => {
  expect(localStorage.getItem("cards")).toBe("[]");
});

test("renders list page on initial render in order to welcome user with listing page", () => {
  expect(dom.container.getElementsByClassName("list-container").length).toEqual(1);
});

test("should not render modal on initial render", () => {
  expect(dom.container.getElementsByClassName("modal").length).toEqual(0);
});

test("should render modal with given card info when remove button is clicked", () => {
  Store.dispatch(Action.update("cards", [card]));
  const getById = queryByAttribute.bind(null, "id");
  const container = screen.getByTestId("card-container");
  fireEvent.mouseOver(container);
  const removeButton = getById(dom.container, "remove-button");
  fireEvent.click(removeButton);
  expect(dom.container.getElementsByClassName("modal").length).toEqual(1);
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import List from "./List";
import { Provider, Store } from "../state/Provider";
import Action from "../state";

let dom;
const card = {
  vote: 0,
  title: "Hacker News",
  timestamp: 15389312,
  link: "https://www.google.com",
  id: 0,
};
// initially there are five cards, so we will expect to see 1 page
const cards = [card, { ...card, id: 1, title: "Test" }, { ...card, id: 2, title: "random" }, { ...card, id: 3, title: "ufo" }, { ...card, id: 4, title: "u" }];
let currentPage = 0;
beforeEach(() => {
  Store.dispatch(Action.update("cards", cards));
  Store.dispatch(Action.update("threshold", currentPage));
  Store.dispatch(Action.update("sort_order", "last_added"));
  dom = render(
    <Provider>
      <List />
    </Provider>
  );
});

afterEach(() => {
  Store.dispatch(Action.update("cards", cards));
});

test("renders submit new link button", () => {
  const submit = dom.container.getElementsByClassName("submit-wrapper")[0];
  expect(submit).toBeInTheDocument();
});

test("renders order list select", () => {
  const selectList = dom.container.querySelectorAll("select");
  expect(selectList.length).toEqual(1);
});

test("renders divider hr between submit link and card list", () => {
  const divider = dom.container.querySelectorAll("hr");
  expect(divider.length).toEqual(1);
});

test("renders card list", () => {
  const cardList = dom.container.getElementsByClassName("card-list-container")[0];
  expect(cardList).toBeInTheDocument();
});

test("renders card list", () => {
  const pageBar = dom.container.getElementsByClassName("page-bar-container")[0];
  expect(pageBar).toBeInTheDocument();
});

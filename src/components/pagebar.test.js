import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PageBar from "./PageBar";
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
let currentPage = 0
beforeEach(() => {
  Store.dispatch(Action.update("cards", cards));
  Store.dispatch(Action.update("threshold", currentPage));
  dom = render(
    <Provider>
      <PageBar />
    </Provider>
  );
});

afterEach(() => {
  Store.dispatch(Action.update("cards", cards))
})

test("renders just 1 as page number", () => {
  // there are two extra spans. One for left arrow, one for right arrow.
  expect(dom.container.querySelectorAll("span").length).toEqual(3);
});

test("page number count should be 2 when we add one more card", () => {
  // there are two extra spans. One for left arrow, one for right arrow.
  Store.dispatch(Action.update("cards", [...cards, { id: 5, title: "random card name" }]));
  expect(dom.container.querySelectorAll("span").length).toEqual(4);
});

test("current page should have border", () => {
  const page = dom.getByText(String(currentPage + 1));
  expect(page).toHaveStyle("border: 1px solid #707070")
});

test("second page should not have border", () => {
  Store.dispatch(Action.update("cards", [...cards, { id: 5, title: "random card name" }]));
  const page = dom.getByText(String(currentPage + 2));
  expect(page).not.toHaveStyle("border: 1px solid #707070");
});

test("second page should have border after clicking to it", () => {
  Store.dispatch(Action.update("cards", [...cards, { id: 5, title: "random card name" }]));
  const page = dom.getByText(String(currentPage + 2));
  fireEvent.click(page);
  expect(page).toHaveStyle("border: 1px solid #707070");
});

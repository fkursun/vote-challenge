import React from "react";
import { render, fireEvent } from "@testing-library/react";
import New from "./new";
import { Provider, Store } from "../state/Provider";
import Action from "../state";

const card = {
  id: 0,
  title: "Hacker News",
  timestamp: 1672839,
  vote: 0,
};
let dom;
beforeEach(() => {
  Store.dispatch(Action.update("cards", [card]));
  dom = render(
    <Provider>
      <New />
    </Provider>
  );
});

test("renders return button", () => {
  const title = dom.getByText(/Return to List/i);
  expect(title).toBeInTheDocument();
});

test("renders add new title", () => {
  const title = dom.getByText(/Add new/i);
  expect(title).toBeInTheDocument();
});

test("renders two input", () => {
  expect(dom.container.querySelectorAll("input").length).toEqual(2);
});

test("renders a button", () => {
  expect(dom.container.querySelectorAll("button").length).toEqual(1);
});

test("updates name input when type", () => {
  const name = dom.getByPlaceholderText("Name");
  fireEvent.change(name, { target: { value: "furkan" } });
  expect(name.value).toEqual("furkan");
});

test("updates link input when type", () => {
  const link = "https://google.com";
  const urlInput = dom.getByPlaceholderText(/https/);
  fireEvent.change(urlInput, { target: { value: link } });
  expect(urlInput.value).toEqual(link);
});

test("adds card and saves into localStorage when button is clicked", () => {
  const nameInput = dom.getByPlaceholderText("Name");
  const urlInput = dom.getByPlaceholderText(/https/);
  const addButton = dom.getByText("ADD");
  fireEvent.change(nameInput, { target: { value: "game name will be here" } });
  fireEvent.change(urlInput, { target: { value: "https://gameURL.com" } });
  fireEvent.click(addButton);
  const cardsStorage = JSON.parse(localStorage.getItem("cards"));
  expect(cardsStorage.length).toBe(2);
});

test("does not add card if name and/or link is empty when button is clicked", () => {
  const addButton = dom.getByText("ADD");
  fireEvent.click(addButton);
  const cardsStorage = JSON.parse(localStorage.getItem("cards"));
  expect(cardsStorage.length).toBe(1);
});

import React from "react";
import { render } from "@testing-library/react";
import AddNew from "./AddNew";
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
beforeEach(() => {
  Store.dispatch(Action.update("cards", cards));
  dom = render(
    <Provider>
      <AddNew />
    </Provider>
  );
});

afterEach(() => {
  Store.dispatch(Action.update("cards", cards));
});

test("renders link adding page", () => {
  const pageBar = dom.container.getElementsByClassName("addnew-wrapper")[0];
  expect(pageBar).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import Modal from "./modal";
import { Provider, Store } from "../state/Provider";
import Action from "../state";

const card = {
  id: 0,
  title: "Hacker News",
};
let dom;
beforeEach(() => {
  Store.dispatch(Action.update("active_card", card));
  Store.dispatch(Action.update("cards", [{ ...card, timestamp: 1672839, vote: 0 }]));
  Store.dispatch(Action.update("threshold", 0));
  dom = render(
    <Provider>
      <Modal />
    </Provider>
  );
});

test("receives title from redux store", () => {
  const title = dom.getByText("Hacker News");
  expect(title).toBeInTheDocument();
});

test("renders remove link text ", () => {
  const title = dom.getByText("Remove Link");
  expect(title).toBeInTheDocument();
});

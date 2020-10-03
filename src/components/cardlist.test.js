import React from "react";
import { render, fireEvent, screen, queryByAttribute } from "@testing-library/react";
import CardList from "./cardlist";
import { Provider, Store } from "../state/Provider";
import Action from "../state";

const card = {
  id: 0,
  vote: 0,
  title: "Hacker News",
  link: "https://www.asd.com",
  timestamp: 1601712691184,
};
let dom;
beforeEach(() => {
  Store.dispatch(Action.update("cards", [{ id: 0, title: "Hacker News", vote: 0, link: "https://www.asd.com" }]));
  Store.dispatch(Action.update("sort_order", "last_added"));
  Store.dispatch(Action.update("threshold", 0));
  dom = render(
    <Provider>
      <CardList />
    </Provider>
  );
});

test("updates redux store and renders a card", () => {
  const linkElement = dom.getByText("Hacker News");
  expect(linkElement).toBeInTheDocument();
});

test("clicks up vote and increases the vote point by 1", () => {
  const getById = queryByAttribute.bind(null, "id");
  const upVote = getById(dom.container, "upvote");
  expect(dom.getByText("0")).toBeInTheDocument();
  fireEvent.click(upVote);
  expect(dom.getByText("1")).toBeInTheDocument();
});

test("clicks down vote and decreases the vote point by 1", () => {
  const getById = queryByAttribute.bind(null, "id");
  const downVote = getById(dom.container, "downvote");
  expect(dom.getByText("0")).toBeInTheDocument();
  fireEvent.click(downVote);
  expect(dom.getByText("-1")).toBeInTheDocument();
});

// test("modal opens when remove button is clicked", () => {
//   const getById = queryByAttribute.bind(null, "id");
//   let removeButton = getById(dom.container, "remove-button");
//   const container = screen.getByTestId("card-container");
//   fireEvent.mouseOver(container);
//   removeButton = getById(dom.container, "remove-button");
//   fireEvent.click(removeButton);
//   expect(dom.container).toEqual(1);
// });

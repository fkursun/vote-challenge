import React from "react";
import { render, fireEvent, screen, queryByAttribute } from "@testing-library/react";
import Card from "./Card";
import { Provider } from "../state/Provider";

const card = {
  id: 0,
  vote: 0,
  title: "Hacker News",
  link: "https://www.asd.com",
};

let dom;
beforeEach(() => {
  dom = render(
    <Provider>
      <Card card={card} />
    </Provider>
  );
});

test("updates redux store and renders a card", () => {
  const linkElement = dom.getByText("Hacker News");
  expect(linkElement).toBeInTheDocument();
});

test("background color changes on hover", () => {
  const container = screen.getByTestId("card-container");
  fireEvent.mouseOver(container);
  expect(container).toHaveStyle("background-color:#70707020");
});

test("remove button appears when hover", () => {
  const getById = queryByAttribute.bind(null, "id");
  let removeButton = getById(dom.container, "remove-button");
  const container = screen.getByTestId("card-container");
  removeButton = getById(dom.container, "remove-button");
  expect(removeButton).toEqual(null);
  fireEvent.mouseOver(container);
  removeButton = getById(dom.container, "remove-button");
  expect(removeButton).toBeInTheDocument();
});

test("validates href with given link", () => {
  expect(dom.getByText("https://www.asd.com").href).toBe("https://www.asd.com/");
});

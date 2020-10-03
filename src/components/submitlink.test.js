import React from "react";
import { render, fireEvent, screen, queryByAttribute, waitForDomChange } from "@testing-library/react";
import SubmitLink from "./submitlink";
import { Provider, Store } from "../state/Provider";
import Action from "../state";
import reducer from "../state/reducer";

let dom;
beforeEach(() => {
  dom = render(
    <Provider>
      <SubmitLink />
    </Provider>
  );
});
test("renders + button", () => {
  const linkElement = dom.getByText("+");
  expect(linkElement).toBeInTheDocument();
});

test("renders Submit link text", () => {
  const linkElement = dom.getByText("Submit a Link");
  expect(linkElement).toBeInTheDocument();
});

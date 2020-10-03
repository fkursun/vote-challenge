import React from "react";

import { Store } from "../state/Provider";
import Action from "../state";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import "./components.scss";
import "react-toastify/dist/ReactToastify.css";

const New = () => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const cards = useSelector((state) => state.default["cards"]);

  React.useEffect(() => {
    if (cards !== undefined) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  if (!cards) return null;

  const handleAdd = () => {
    if (!name || !link) {
      toast.warning("Please specify name and/or link");
      return;
    }
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    var regex = new RegExp(expression);
    if(!link.match(regex)) {
      toast.warning("Please type valid url(eg. www.url.com)")
      return;
    }
    Store.dispatch(Action.update("cards", [...cards, { id: cards.length, vote: 0, title: name, link, timestamp: new Date().getTime() }]));
    toast.success(name + " added.");
    setName("");
    setLink("");
  };

  const handleBack = () => {
    Store.dispatch(Action.update("current_page", "list"));
  };
  return (
    <div className="addnew-wrapper">
      <span onClick={() => handleBack()}>&larr; Return to List</span>
      <h1>Add new Link</h1>
      <div className="input-wrapper">
        <span>Link name:</span>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="input-wrapper">
        <span>Link URL:</span>
        <input placeholder="https://www.url.com" value={link} onChange={(e) => setLink(e.target.value)} required />
      </div>
      <button className="button" onClick={() => handleAdd()}>
        ADD
      </button>
    </div>
  );
};

export default New;

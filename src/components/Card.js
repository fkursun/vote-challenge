import React from "react";
import { Store } from "../state/Provider";
import Action from "../state";
import "./components.scss";

const CardList = ({ card }) => {
  const textColor = "#707070";
  const [hover, setHover] = React.useState(false);
  const handleUpVote = (id, current) => {
    Store.dispatch(Action.update("cards.[].vote", current + 1, (x) => x.id === id));
    Store.dispatch(Action.update("cards.[].timestamp", new Date().getTime(), (x) => x.id === id));
  };

  const handleDownVote = (id, current) => {
    Store.dispatch(Action.update("cards.[].vote", current - 1, (x) => x.id === id));
    Store.dispatch(Action.update("cards.[].timestamp", new Date().getTime(), (x) => x.id === id));
  };

  const handleRemove = (id, title) => {
    // open modal
    Store.dispatch(Action.update("modal_open", true))
    // set selected card id, name in order to delete when ok is clicked.
    Store.dispatch(Action.update("active_card", {id, title} ))
  };

  return (
    <div className="card-container" data-testid="card-container" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="card-vote">
        <h2>{card.vote}</h2>
        <span>POINTS</span>
      </div>
      <div className="card-details">
        <span style={{ textAlign: "start", fontSize: "22px", fontWeight: "bold" }}>{card.title}</span>
        <span style={{ flexGrow: "1", textAlign: "start" }}>
        (<a style={{ textDecoration: "none", color: textColor }} href={card.link}>{card.link}</a>)
        </span>
        <div className="vote-wrapper">
          <button id="upvote" onClick={() => handleUpVote(card.id, card.vote)} style={{ marginRight: "1rem" }}>
            &uarr; Up Vote
          </button>
          <button id="downvote" onClick={() => handleDownVote(card.id, card.vote)}>
            &darr; Down Vote
          </button>
        </div>
      </div>
      {hover && (
        <span id="remove-button" onClick={() => handleRemove(card.id, card.title)} style={{ backgroundColor: "red", padding: "0px", borderRadius: "50%", color: "white", width: "18px", height: "18px", lineHeight: "16px", top: "-9px", right: "-6px", position: "absolute", textAlign:"center" }}>
          -
        </span>
      )}
    </div>
  );
};

export default CardList;

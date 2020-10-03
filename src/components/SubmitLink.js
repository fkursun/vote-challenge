import React from "react";
import { Store } from "../state/Provider";
import Action from "../state";

import "./components.scss";

const SubmitLink = () => {
  const handleClick = () => {
      Store.dispatch(Action.update("current_page", "add_new"))
  };
  return (
    <div className="submit-wrapper" onClick={() => handleClick()}>
      <button onClick={() => handleClick()} className="card-vote" style={{ fontSize: "60px", width: "80px", fontWeight: "600" }}>
        +
      </button>
      <h3>Submit a Link</h3>
    </div>
  );
};

export default SubmitLink;

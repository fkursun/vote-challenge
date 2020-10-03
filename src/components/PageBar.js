import React from "react";

import { Store } from "../state/Provider";
import Action from "../state";
import { useSelector } from "react-redux";

const PageBar = () => {
  const cards = useSelector((state) => state.default?.cards);
  const threshold = useSelector((state) => state.default?.threshold);
  const arr = [...Array(Math.ceil(cards.length / 5))];

  const handlePaging = (page) => {
    Store.dispatch(Action.update("threshold", page));
  };

  const handleNext = () => {
    Store.dispatch(Action.update("threshold", threshold < arr.length - 1 ? threshold + 1 : threshold));
  };

  const handlePrev = () => {
    Store.dispatch(Action.update("threshold", threshold > 0 ? threshold - 1 : threshold));
  };

  return (
    <div className="page-bar-container">
      <span onClick={() => handlePrev()} style={{ fontSize: "24px", padding: "0 .25rem", cursor: "pointer" }}>
        &larr;
      </span>
      <div style={{ flexGrow: "1" }} />
      {arr.length === 0 ? (
        <span style={{ marginRight: "10px", cursor: "pointer", border:"1px solid #707070", padding: ".1rem" }}>1</span>
      ) : (
        arr.map((page, i) => (
          <span onClick={() => handlePaging(i)} key={i} style={{ marginRight: "10px", cursor: "pointer", border: i === threshold ? "1px solid #707070" : "", padding: ".1rem" }}>
            {i + 1}
          </span>
        ))
      )}
      <div style={{ flexGrow: "1" }} />
      <span onClick={() => handleNext()} style={{ fontSize: "24px", padding: "0 .25rem", cursor: "pointer" }}>
        &rarr;
      </span>
    </div>
  );
};

export default PageBar;

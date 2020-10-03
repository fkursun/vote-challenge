import React from "react";
import { Store } from "../state/Provider";
import Action from "../state";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

const Modal = () => {
  const activeCard = useSelector((state) => state.default.active_card);
  const cards = useSelector((state) => state.default.cards);
  const threshold = useSelector((state) => state.default.threshold);
  const handleClose = () => {
     // close modal
    Store.dispatch(Action.update("modal_open", false));
     // clear active card info
    Store.dispatch(Action.update("active_card"));
  };

  const handleRemove = (title) => {
    // remove selected card
    Store.dispatch(Action.remove("cards.[]", (x) => x.id === activeCard.id));
    // close modal
    Store.dispatch(Action.update("modal_open", false));
    // decrease threshold to go back to previous page if there is no card in the current page.
    Store.dispatch(Action.update("threshold", (cards.length - 1) % 5 === 0 ? threshold - 1 : threshold));
    toast.success(title + "has been removed");
    // clear active card info
    Store.dispatch(Action.update("active_card"));
  };
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="remove-link">
          <h4 style={{ padding: "0 .5rem", margin: "0.5rem" }}>Remove Link</h4>
          <span onClick={() => handleClose()} style={{ padding: "0 .5rem", cursor: "pointer" }}>
            X
          </span>
        </div>

        <div style={{ flexDirection: "column", margin: "1rem 0" }}>
          <h4>Do you want to remove:</h4>
          <span style={{ textTransform: "uppercase", fontSize: "24px", fontWeight: "700" }}>{activeCard.title}</span>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button className="button" onClick={() => handleRemove(activeCard.title)} style={{ marginRight: "40px" }}>
            OK
          </button>
          <button className="button" onClick={() => handleClose()}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

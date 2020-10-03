import React from "react";
import List from "./containers/List";
import AddNew from "./containers/AddNew";
import Modal from "./components/Modal";

import { Store } from "./state/Provider";
import Action from "./state";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";

function App() {
  const current_page = useSelector((state) => state.default?.current_page);
  const modal_open = useSelector((state) => state.default?.modal_open);
  React.useEffect(() => {
    Store.dispatch(Action.update("current_page", "list"));
    Store.dispatch(Action.update("modal_open", false));
    Store.dispatch(Action.update("sort_order", "last_added"));
    Store.dispatch(Action.update("threshold", 0));
    let cards = JSON.parse(localStorage.getItem("cards"));
    if (!cards) {
      localStorage.setItem("cards", JSON.stringify([]));
      cards = JSON.parse(localStorage.getItem("cards"));
    }
    Store.dispatch(Action.update("cards", cards ? cards : []));
  }, []);

  if (!current_page) return null;

  return (
    <>
      <div className="app-container">{current_page === "list" ? <List /> : current_page === "add_new" && <AddNew />}</div>
      {modal_open && <Modal />}
      <ToastContainer position="top-center" hideProgressBar={true} autoClose={3000} progressStyle={{ borderRadius: "6px" }} />
    </>
  );
}

export default App;

import React from "react";
import Card from "./Card";

import { useSelector } from "react-redux";

const CardList = () => {
  const cards = useSelector((state) => state.default.cards);
  const sortOrder = useSelector((state) => state.default.sort_order);
  const threshold = useSelector((state) => state.default.threshold);

  // it updates localhost when cards state changes
  React.useEffect(() => {
    if (cards !== undefined) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  if (!cards || !sortOrder) return null;

  return (
    <div className="card-list-container" style={{ height: "570px" }}>
      {cards // it orders by id on "last_added" and "first_added", it orders by vote count and timestamp on "most_voted" and "least_voted"
        // i wanted to code it as one liner, it can be done in func. though.
        .sort((a, b) => (sortOrder === "last_added" ? b.id - a.id : sortOrder === "first_added" ? a.id - b.id : sortOrder === "most_voted" ? (b.vote - a.vote === 0 ? b.timestamp - a.timestamp : b.vote - a.vote) : sortOrder === "least_voted" && a.vote - b.vote === 0 ? b.timestamp - a.timestamp : a.vote - b.vote))
        // threshold for pagination. 
        .map((card, i) => i >= threshold * 5 && i < (threshold + 1) * 5 && <Card key={i} card={card} />)}
    </div>
  );
};

export default CardList;

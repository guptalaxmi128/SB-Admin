import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewStar = ({ reviewStar }) => {
  // Render filled stars based on reviewStar value
  const renderStars = () => {
    const filledStars = [];
    const emptyStars = [];

    // Fill stars based on reviewStar value
    for (let i = 0; i < reviewStar; i++) {
      filledStars.push(<FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />);
    }

    // Fill remaining stars as empty
    for (let i = reviewStar; i < 5; i++) {
      emptyStars.push(<FontAwesomeIcon icon={faStar} />);
    }

    return (
      <>
        {filledStars}
        {emptyStars}
      </>
    );
  };

  return <div>{renderStars()}</div>;
};

export default ReviewStar;

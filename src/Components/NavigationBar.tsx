import { FC } from "react";
import "./NavigationBar.css";
import { FaPen, FaUser } from "react-icons/fa";

export const NavigationBar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="left-side">
          <div id="logo">Trip Planner</div>
        </div>
        <div className="right-side">
          <div id="review-button">
            <FaPen />
            Review
          </div>
          <div id="profile-page">
            <FaUser />
          </div>
        </div>
      </div>
    </nav>
  );
};

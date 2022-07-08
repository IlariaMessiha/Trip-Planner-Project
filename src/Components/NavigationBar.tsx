import { FC } from "react";
import styles from "./NavigationBar.module.css";
import { FaPen, FaUser } from "react-icons/fa";

export const NavigationBar = () => {
  return (
    <nav>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSide}>
          <div className={styles.logo}>Trip Planner</div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.reviewButton}>
            <FaPen />
            Review
          </div>
          <div className={styles.profilePage}>
            <FaUser />
          </div>
        </div>
      </div>
    </nav>
  );
};

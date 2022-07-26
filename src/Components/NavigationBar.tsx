import { FC } from "react";
import styles from "./NavigationBar.module.css";
import { FaPen, FaUser } from "react-icons/fa";
import { Typography } from "./core/Typography";
import { Container } from "./core/Container";

export const NavigationBar = () => {
  return (
    <nav>
      <Container className={styles.navbarContainer}>
        <div className={styles.leftSide}>
          <a href="/">
            <div className={styles.logo}>Trip Planner</div>
          </a>
        </div>
        <div className={styles.rightSide}>
          {/*  TODO ADD ICON */}
          <Typography text="Review" />
          <div className={styles.profilePage}>
            <FaUser />
          </div>
        </div>
      </Container>
    </nav>
  );
};

import { FC } from "react";
import styles from "./NavigationBar.module.css";
import { FaGlobe, FaPen, FaUser } from "react-icons/fa";
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
          <div>
            <Typography text="Review" />
          </div>

          <div className={styles.profilePage}>
            <FaUser />
          </div>
          <div>
            <FaGlobe />
          </div>
        </div>
      </Container>
    </nav>
  );
};

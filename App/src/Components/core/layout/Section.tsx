import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import styles from "./Section.module.css";

interface SectionProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const Section: FC<SectionProps> = ({ title, subtitle, children }) => (
    <div className={styles.section}>
        <div className={styles.sectionHeader}>
            <Typography variant="h4">{title} </Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>
        </div>
        {children}
    </div>
);

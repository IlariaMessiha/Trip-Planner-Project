import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import styles from "./Section.module.css";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

interface SectionProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    navigateTo?: string;
    className?: string;
}

export const Section: FC<SectionProps> = ({ title, subtitle, children, navigateTo }) => (
    <div className={styles.section}>
        {navigateTo ? (
            <Link to={navigateTo}>
                <SectionTitle
                    className={styles.sectionHeader_clickable}
                    title={title}
                    subtitle={subtitle}
                />
            </Link>
        ) : (
            <SectionTitle title={title} subtitle={subtitle} />
        )}
        {children}
    </div>
);

const SectionTitle: FC<Omit<SectionProps, "children">> = ({ title, subtitle, className }) => (
    <div className={clsx(styles.sectionHeader, className)}>
        <Typography variant="h4">{title} </Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
    </div>
);

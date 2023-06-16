import { FC, ReactNode } from "react";
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
    className?: string;
    children: ReactNode;
}
export const PageLayout: FC<PageLayoutProps> = ({ className = "", children }) => {
    return <div className={className + " " + styles.page}>{children}</div>;
};

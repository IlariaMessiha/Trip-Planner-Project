import { createElement, FC } from "react";
import styles from "./Typography.module.css";

type TypographyVariant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "body3"
    | "likes";

interface TypographyProps {
    text: string | number;
    variant?: TypographyVariant;
    className?: string;
}
const elementNameByVariant = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body1: "p",
    body2: "p",
    body3: "p",
    searchResultElement: "p",
    likes: "p",
};
export const Typography: FC<TypographyProps> = ({ text, variant = "body1", className = "" }) => {
    const elementName = elementNameByVariant[variant] || "p";
    const childClassName = className + " " + styles.base + " " + styles[variant];

    return createElement(elementName, { className: childClassName }, text);
};

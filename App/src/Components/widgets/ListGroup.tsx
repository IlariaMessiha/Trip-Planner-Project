import React from "react";
import { FC, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ListGroupProps {
    items: string[];
    selectedItem: any;
    onItemSelect: any;
}
export const ListGroup: FC<ListGroupProps> = ({ items, selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group" style={{ flex: "20%" }}>
            {items.map(item => (
                <li style={{padding:"20px"}}
                    onClick={() => onItemSelect(item)}
                    key={item}
                    className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default ListGroup;

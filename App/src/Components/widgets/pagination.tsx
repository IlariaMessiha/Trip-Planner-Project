import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { FC } from "react";

interface PaginationProps {
    itemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: any;
}

const PaginationComponent: FC<PaginationProps> = ({
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
}) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;

    return (
        <Pagination
            page={currentPage}
            count={pagesCount}
            onChange={(_, page) => onPageChange(page)}
            defaultPage={1}
            shape="rounded"
            color="primary"
        />
    );
};

export default PaginationComponent;

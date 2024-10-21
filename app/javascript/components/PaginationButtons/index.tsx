import React, { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  name: string;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({ currentPage, totalPages, name }) => {
  const [_, setSearchParams] = useSearchParams()

  const setPage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setSearchParams(searchParams => {
        searchParams.set("page", newPage.toString());
        return searchParams;
    })
  }}

  return (
    <nav aria-label={name}>
      <ul className="pagination">
        <li className="page-item">
          <button aria-label="Previous" onClick={() => setPage(currentPage - 1)} disabled={currentPage == 1}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => {
          return (<li className="page-item" key={i}>
          <button aria-label="Previous" onClick={() => setPage(i + 1)} disabled={currentPage == i + 1}>
            <span>{i + 1}</span>
          </button>
        </li>)})}

        <li className="page-item">
          <button aria-label="Next" onClick={() => setPage(currentPage + 1)} disabled={currentPage == totalPages}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
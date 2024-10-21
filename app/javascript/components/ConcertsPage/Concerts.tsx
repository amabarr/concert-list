import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ConcertType } from '../../types/ConcertType'
import { ConcertCard } from '../ConcertCard'
import { LoadingSpinner } from '../LoadingSpinner'
import { PaginationButtons } from "../PaginationButtons"

const concertsApi = (page: number, perPage: number, classification?: string) => `/api/v1/concerts/index?page=${page}&limit=${perPage}${classification ? `&classification=${classification}` : ""}`

type ConcertProps = {
  hideCount?: boolean;
}

export const Concerts: React.FC<ConcertProps> = ({ hideCount = false }) => {
  const navigate = useNavigate()
  const [concerts, setConcerts] = useState<ConcertType[]>([])
  const [page, setPage] = useState<number>(1)
  const [perPage] = useState<number>(8)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams.get("page") || 1
    if (currentPage) {
      setPage(+currentPage)
    }
  }, [searchParams])

  useEffect(() => {
    const url = concertsApi(page, perPage)
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setTotalPages(res.body.pagination_metadata.page_total || 1)
        setConcerts(res.body.concerts)
      })
      .catch(() => navigate("/"));
  }, [page, perPage]);


  return (<>
    <PaginationButtons currentPage={page} totalPages={totalPages} name="Concerts navigation"/>
    <div className="concerts-container">
      {concerts.length ? concerts.map((concert) => <ConcertCard concert={concert} key={concert.id} />) : <LoadingSpinner />}
    </div>
  </>)
}
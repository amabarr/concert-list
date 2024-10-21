import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ConcertType } from '../../types/ConcertType'
import { ConcertCard } from '../ConcertCard'
import { LoadingSpinner } from '../LoadingSpinner'
import { PaginationButtons } from "../PaginationButtons"
import useFetchConcerts from "./useFetchConcerts"

type ConcertProps = {
  hideCount?: boolean;
}

export const Concerts: React.FC<ConcertProps> = ({ hideCount = false }) => {
  const [page, setPage] = useState<number>(1)
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams.get("page") || 1
    if (currentPage) {
      setPage(+currentPage)
    }
  }, [searchParams])

  const {concerts, totalPages} = useFetchConcerts(page)

  return (<>
    <PaginationButtons currentPage={page} totalPages={totalPages} name="Concerts navigation"/>
    <div className="concerts-container">
      {concerts.length ? concerts.map((concert) => <ConcertCard concert={concert} key={concert.id} />) : <LoadingSpinner />}
    </div>
  </>)
}
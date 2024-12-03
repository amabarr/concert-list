import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ConcertCard } from '../ConcertCard'
import { LoadingSpinner } from '../LoadingSpinner'
import { PaginationButtons } from "../PaginationButtons"
import useFetchConcerts from "./useFetchConcerts"
import { Classification } from "../../types/ConcertType"
import { ClassificationDropdown } from "../ClassificationDropdown"

type ConcertProps = {
  hideCount?: boolean;
}

export const Concerts: React.FC<ConcertProps> = ({ hideCount = false }) => {
  const [page, setPage] = useState<number>(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const [classification, setClassification] = useState<Classification>(Classification.ALL)

  useEffect(() => {
    setSearchParams(searchParams => {
      searchParams.set("page", "1")
      return searchParams;
    })
    setPage(1)
  }, [classification])

  useEffect(() => {
    const currentPage = searchParams.get("page") || 1
    if (currentPage) {
      setPage(+currentPage)
    }
  }, [searchParams])

  const {concerts, totalPages} = useFetchConcerts(page, classification)

  return (<>
    <div>
      <ClassificationDropdown classification={classification} setClassification={setClassification} />
      <PaginationButtons currentPage={page} totalPages={totalPages} name="Concerts navigation"/>
    </div>
    <div className="concerts-container">
      {concerts.length ? concerts.map((concert) => <ConcertCard concert={concert} key={concert.id} />) : <LoadingSpinner />}
    </div>
  </>)
}
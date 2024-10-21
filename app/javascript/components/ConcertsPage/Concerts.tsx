import React, { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { ConcertType } from '../../types/ConcertType'
import { ConcertCard } from '../ConcertCard'
import { LoadingSpinner } from '../LoadingSpinner'

const concertsApi = (page: number, perPage: number, classification?: string) => `/api/v1/concerts/index?page=${page}&limit=${perPage}${classification ? `&classification=${classification}` : ""}`

type ConcertProps = {
  hideCount?: boolean;
}

export const Concerts: React.FC<ConcertProps> = ({ hideCount = false }) => {
  const navigate = useNavigate()
  const params = useParams()
  const [concerts, setConcerts] = useState<ConcertType[]>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)

  const search = useSearchParams()

  useEffect(() => {
    console.log("IN THIS USE EFFECT", params)
    console.log("SEARCH", search)
    if (params?.page) {
      setPage(params.page as unknown as number)
    }

    if (params?.perPage){
      setPerPage(perPage as unknown as number)
    }
  }, [])

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
        setConcerts(res.body.concerts)
      })
      .catch(() => navigate("/"));
  }, [page, perPage]);


  return (<>
    {hideCount ? null : <div className="total-count">Total count: {concerts.length}</div>}
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
    <div className="concerts-container">
      {concerts.length ? concerts.map((concert) => <ConcertCard concert={concert} key={concert.id} />) : <LoadingSpinner />}
    </div>
  </>)
}
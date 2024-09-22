import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ConcertType } from '../../types/ConcertType'
import { ConcertCard } from '../ConcertCard'
import { LoadingSpinner } from '../LoadingSpinner'

const CONCERTS_API_URL = "/api/v1/concerts/index";

type ConcertProps = {
  hideCount?: boolean;
}

export const Concerts: React.FC<ConcertProps> = ({ hideCount = false }) => {
  const navigate = useNavigate()
  const [concerts, setConcerts] = useState<ConcertType[]>([])

  useEffect(() => {
    fetch(CONCERTS_API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        console.log(res.body)
        setConcerts(res)
      })
      .catch(() => navigate("/"));
  }, []);


  return (<>
    {hideCount ? null : <div className="total-count">Total count: {concerts.length}</div>}
    <div className="concerts-container">
      {concerts.length ? concerts.map((concert) => <ConcertCard concert={concert} key={concert.id} />) : <LoadingSpinner />}
    </div>
  </>)
}
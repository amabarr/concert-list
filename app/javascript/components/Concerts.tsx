import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { ConcertType } from '../types/ConcertType'
import {Concert} from './Concert'
import {Header} from './Header'
import {LoadingSpinner} from './LoadingSpinner'

const CONCERTS_API_URL = "/api/v1/concerts/index";

export const Concerts: React.FC = () => {

  const navigate = useNavigate()
  const [concerts, setConcerts] =  useState<ConcertType[]>([])

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
        setConcerts(res)})
       .catch(() => navigate("/"));
  }, []);


  return <div className={"container-fluid"}>
    <Header pageName="concerts" />
<div className="concerts-container">
{concerts.length ? concerts.map((concert) => <Concert concert={concert}  key={concert.id} />) : <LoadingSpinner /> }
</div>
  </div>
}
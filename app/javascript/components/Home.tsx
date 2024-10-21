import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { LoadingSpinner } from './LoadingSpinner'
import { Concerts } from './ConcertsPage/Concerts'

const ARTIST_COUNT_URL = '/api/v1/artists/count'
const CONCERT_COUNT_URL = '/api/v1/concerts/count'
const FUN_CONCERT_COUNT_URL = '/api/v1/concerts/count?classification=fun'
const WORK_CONCERT_COUNT_URL = '/api/v1/concerts/count?classification=work'

export const Home = () => {
  const [artistCount, setArtistCount] = useState(0)
  const [concertCount, setConcertCount] = useState(0)
  const [workConcertCount, setWorkConcertCount] = useState(0)
  const [funConcertCount, setFunConcertCount] = useState(0)

  useEffect(() => {
    fetch(ARTIST_COUNT_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setArtistCount(res)
      })

    fetch(CONCERT_COUNT_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setConcertCount(res)
      })

    fetch(FUN_CONCERT_COUNT_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setFunConcertCount(res)
      })

    fetch(WORK_CONCERT_COUNT_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setWorkConcertCount(res)
      })
  }, [])


  return (
    <div className="container-fluid page">
      <Header pageName='Home'/>
      <div className="home container-fluid">
        <div>
          Welcome to my list of all of the concerts I have been to since I was little!
          Some of these concerts are due to my past career as an audio engineer but most are for fun!
        </div>
        <div>
          In total I've seen <b>{artistCount > 0 ? artistCount : <LoadingSpinner />}</b> artists in <b>{concertCount > 0 ? concertCount : <LoadingSpinner />}</b> concerts.
          And {workConcertCount > 0 ? workConcertCount : <LoadingSpinner />} of those concerts were work, {funConcertCount > 0 ? funConcertCount : <LoadingSpinner />} were just for fun!
        </div>
        <Concerts hideCount />
      </div>
    </div>
  )
}
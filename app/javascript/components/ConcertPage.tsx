import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { formatArtistsToTitle } from '../helpers/formatArtistsToTitle'
import { ConcertType } from '../types/ConcertType'
import { LoadingSpinner } from './LoadingSpinner'
import { ArtistCard } from './ArtistCard'

const fetchConcertUrl = (id: string) => `/api/v1/concerts/show/${id}`

export const ConcertPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [concert, setConcert] = useState<ConcertType>()

  useEffect(() => {
    const concertId = params.id

    if (!concertId) {
      navigate('/')
    }

    const url = fetchConcertUrl(concertId as string)
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setConcert(res)
      })
      .catch(() => navigate("/"));
  }, []);

  if (!concert) return <LoadingSpinner />

  const artists = formatArtistsToTitle(concert?.artists || [])
  const date = new Date(concert.date).toDateString()

  return (
    <div className="container-fluid page">
      <Header pageName={artists} />
      <div className="container-fluid single-container">

        <div className="concert-metadata">
          <div className="concert-date">
            Date: {date}
          </div>

          <div className="concert-name">Name: {concert.name}</div>
          <div>Venue: {concert.venue}</div>
          <div>City: {concert.city}</div>
        </div>

        <div>
          <h3>Artists:</h3>
          <div className="artists-cards">
            {concert.artists.map((artist) => <ArtistCard artist={artist} key={artist.id} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
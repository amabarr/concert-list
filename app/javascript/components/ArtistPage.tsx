import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { ArtistType } from '../types/ConcertType'
import { LoadingSpinner } from './LoadingSpinner'
import { ArtistConcerts } from './ArtistConcerts'

const fetchArtistUrl = (id: string) => `/api/v1/artists/show/${id}`

export const ArtistPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<ArtistType>()

  const artistId = params.id as string

  useEffect(() => {
    if (!artistId) {
      navigate("/")
    }
  }, [artistId])

  useEffect(() => {
    const url = fetchArtistUrl(artistId)
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        console.log(res.body)
        setArtist(res)
      })
      .catch(() => navigate("/"));
  }, []);

  if (!artist) return <LoadingSpinner />

  return (
    <div className="container-fluid page">
      <Header pageName={artist.name} />
      <div className="container-fluid single-container">

        <div className="artist-metadata">
          <div className="genres">Genres: {artist.genres.length > 0 ? artist.genres.join(", ") : "TBD"}</div>
        </div>

        <ArtistConcerts artistId={artistId} />
      </div>
    </div>
  )
}
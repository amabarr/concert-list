import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArtistType } from '../types/ConcertType'
import { Header } from './Header'
import { LoadingSpinner } from './LoadingSpinner'
import { ArtistCard } from "./ArtistCard"

const ARTISTS_API_URL = "/api/v1/artists/index";

export const ArtistsPage: React.FC = () => {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistType[]>([])

  useEffect(() => {
    fetch(ARTISTS_API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setArtists(res)
      })
      .catch(() => navigate("/"));
  }, []);

  return (<div className={"container-fluid"}>
    <Header pageName="artists" />
    <div className="total-count">Total count: {artists.length}</div>
    <div className="artists-container">
      {artists.length ? artists.map((artist) => <ArtistCard artist={artist} key={artist.id} />) : <LoadingSpinner />}
    </div>
  </div>)
}
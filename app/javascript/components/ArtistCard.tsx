import React from 'react'
import { ArtistType } from '../types/ConcertType'
import { Link } from "react-router-dom"

interface ArtistCardProps {
  artist: ArtistType
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {

  

  return (
    <div className="card">
      <h5 className="card-title">
        <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
      </h5>
      <div className='cardBody'>
        <div className="card-text">
          <div>
            Genres: {artist.genres.join(", ")}
          </div>
        </div>
      </div>
    </div>
  )
}
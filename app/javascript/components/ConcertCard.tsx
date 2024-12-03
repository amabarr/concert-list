import React from 'react'
import { ConcertType } from '../types/ConcertType'
import { Link } from "react-router-dom"
import {formatArtistsToTitle} from '../helpers/formatArtistsToTitle'

interface ConcertCardProps {
  concert: ConcertType
}

export const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => {
  const artistNames = formatArtistsToTitle(concert.artists)

  const title = concert.artists.length > 3 && concert.name ? concert.name : artistNames

  const date = new Date(concert.date).toDateString()

  return (
    <div className="card">
      <h5 className="card-title">
        <Link to={`/concerts/${concert.id}`}>{title}</Link>
        </h5>
      <div className='cardBody'>
        <div className="card-text">
          <div className="card-metadata">
            {date}
          </div>
          <div className="card-metadata">
          {artistNames}
          </div>
          <div className="card-metadata"> 
            {concert.venue}
          </div>
        </div>
      </div>
    </div>
  )
}
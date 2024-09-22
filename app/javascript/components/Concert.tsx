import React from 'react'
import { ConcertType } from '../types/ConcertType'

interface ConcertProps {
  concert: ConcertType
}

export const Concert: React.FC<ConcertProps> = ({concert}) => {

  const artists = concert.artists.map(val => val.name)

const artistNames = artists.join(" // ")

const title = artists.length > 3 && concert.name ? concert.name : artistNames

const date = new Date(concert.date).toDateString()

  return (
    <div className="card">
      <h5 className="card-title">{title}</h5>
      <div className='cardBody'>
      <p className="card-text">
      <div>
        {date}
        </div>
        {artistNames}
        <div>
        {concert.venue}
        </div>
      </p>
      </div>
    </div>
  )
}
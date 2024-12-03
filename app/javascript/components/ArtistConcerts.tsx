import React, { useEffect, useState } from 'react'
import { ArtistType, ConcertType } from '../types/ConcertType';
import { LoadingSpinner } from './LoadingSpinner';
import { ConcertCard } from './ConcertCard';

interface ArtistConcertsProps {
  artistId: string
}

const fetchArtistConcertsUrl = (id: string) =>  `/api/v1/artists/concerts_for_artist/${id}`

export const ArtistConcerts: React.FC<ArtistConcertsProps> = ({artistId}) => {
  const [concerts, setConcerts] = useState<ConcertType[]>([])
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const url = fetchArtistConcertsUrl(artistId)
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setConcerts(res)
      })
      .catch(() => setHasError(true));
  }, []);

  if (!concerts.length && !hasError) return <LoadingSpinner />

  if (hasError) return <div>Error loading concerts</div>

  return (<div>
    <h3>Concerts:</h3>
    <div>Concert Total: {concerts.length}</div>
    <div className="concerts-container">
      {concerts.map((concert) => (<ConcertCard concert={concert} key={concert.id} />))}
    </div>
  </div>)
}
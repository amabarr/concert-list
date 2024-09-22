export type ConcertType = {
  id: string,
  classification: "fun" | "work",
  date: string,
  name: string,
  city: string | null,
  venue: string | null,
  artists: ArtistType[]
}

export type ArtistType = {
  id: string,
  name: string,
  genres: string[]
}
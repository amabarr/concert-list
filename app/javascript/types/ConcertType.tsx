export type ConcertType = {
  id: string,
  classification: "fun" | "work",
  date: string,
  name: string,
  city: string | null,
  venue: string | null,
  created_at: string,
  updated_at: string
  artists: ArtistType[]
}

export type ArtistType = {
  id: string,
  name: string,
  genres: string[],
  created_at: string,
  updated_at: string
}
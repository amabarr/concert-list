import { ArtistType } from "../types/ConcertType";

export function formatArtistsToTitle(artists: ArtistType[] | null){
  return artists ? artists.map(val => val.name).join(" // ") : ""
}
import { useState, useEffect } from "react"
import { ConcertType, Classification } from "../../types/ConcertType"
import { useNavigate } from "react-router-dom"

const concertsApi = (page?: number, perPage?: number, classification?: Classification) => `/api/v1/concerts/index?${page ? `page=${page}` : ""}&limit=${perPage}${classification && classification != Classification.ALL ? `&classification=${classification}` : ""}`

export default function useConcerts(page?: number, classification?: Classification)  {
  const [concerts, setConcerts] = useState<ConcertType[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const navigate = useNavigate()

  useEffect(() => {
    const url = concertsApi(page, 8, classification)
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setTotalPages(res.body.pagination_metadata.page_total || 1)
        setConcerts(res.body.concerts)
      })
      .catch(() => navigate("/"));
  }, [page, classification]);

  return {concerts, totalPages}
}
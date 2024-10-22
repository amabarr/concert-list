import React from "react"
import { Classification } from "../types/ConcertType"

interface ClassificationDropdownProps {
  classification: Classification,
  setClassification: (classification: Classification) => void
}

export const ClassificationDropdown: React.FC<ClassificationDropdownProps> = ({ classification, setClassification }) => (
  <div className="classification">
    <label htmlFor="classification">Concert Type</label>
    <select id="classification" name="classification" value={classification} onChange={(e) => {
      setClassification(Classification[e.target.value.toUpperCase() as keyof typeof Classification])
    }}>
      <option value={Classification.ALL}>{Classification.ALL}</option>
      <option value={Classification.FUN}>{Classification.FUN}</option>
      <option value={Classification.WORK}>{Classification.WORK}</option>
    </select>
  </div>
)
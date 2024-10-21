import React from "react"
import { Link } from 'react-router-dom'

type HeaderProps = {
  pageName: string
}

export const Header: React.FC<HeaderProps> = ({ pageName }) => (
  <div className="header">
    <h1>{pageName.toUpperCase()}</h1>


    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/concerts">Concerts</Link>
      </li>
      <li className="nav-item">
        <Link to="/artists">Artists</Link>
      </li>
    </ul>
  </div>)

import React from "react"
import upperFirst from 'lodash/capitalize';

type HeaderProps = {
  pageName: string
}

export const Header: React.FC<HeaderProps> = ({pageName}) => {


  return (
  <div>
    <h1>{upperFirst(pageName)}</h1>
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="#">Home</a></li>
      <li className="breadcrumb-item"><a href="#">Concerts</a></li>
    </ol>
  </nav></div>)
}
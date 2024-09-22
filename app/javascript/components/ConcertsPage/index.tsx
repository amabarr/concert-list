import React from "react"
import { Header } from '../Header'
import { Concerts } from './Concerts'

export const ConcertsPage: React.FC = () => (
  <div className={"container-fluid"}>
    <Header pageName="concerts" />
    <Concerts />
  </div>
)
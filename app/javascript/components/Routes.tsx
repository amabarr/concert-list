import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ConcertsPage } from './ConcertsPage'
import { ConcertPage } from './ConcertPage'
import { ArtistPage } from './ArtistPage'
import { ArtistsPage } from "./ArtistsPage";
import {Home} from './Home'

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concerts" Component={ConcertsPage} />
      <Route path="/concerts/:id" Component={ConcertPage} />

      <Route path="/artists/:id" Component={ArtistPage} />
      <Route path="/artists" Component={ArtistsPage} />

    </Routes>
  </Router>
)
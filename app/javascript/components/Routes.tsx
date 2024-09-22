import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Concerts } from './Concerts'
import { ConcertPage } from './ConcertPage'
import { ArtistPage } from './ArtistPage'
import { ArtistsPage } from "./ArtistsPage";

const Home = () => <div>FAKE</div>

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concerts" Component={Concerts} />
      <Route path="/concerts/:id" Component={ConcertPage} />

      <Route path="/artists/:id" Component={ArtistPage} />
      <Route path="/artists" Component={ArtistsPage} />

    </Routes>
  </Router>
)
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Concerts} from './Concerts'

const Home = () => <div>FAKE</div>

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concerts" Component={Concerts} />
    </Routes>
  </Router>
)
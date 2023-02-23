import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';

import Home from '../pages/Home';
import PageList from '../pages/PageList';

export default function MainRoutes() {
  return (
    <Router>
      <ul>
        <li><a href="#/">Home</a></li>
        <li><a href="#/pagelist">PageList</a></li>
      </ul>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/pagelist" element={<PageList />} />
      </Routes>
    </Router>
  );
}
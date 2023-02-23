import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';

import Home from '../pages/Home';
import PageList from '../pages/PageList';

export default function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/pagelist" element={<PageList />} />
      </Routes>
    </Router>
  );
}
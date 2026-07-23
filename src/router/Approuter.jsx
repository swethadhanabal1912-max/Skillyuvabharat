import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../core/Main';
import Homepage from '../pages/Homepage';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import ContactPage from '../pages/ContactPage';
import JobFairsPage from '../pages/JobFairsPage';

export default function Approuter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/jobfair" element={<JobFairsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
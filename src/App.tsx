import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import DetailPage from './pages/DetailPage/DetailPage';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

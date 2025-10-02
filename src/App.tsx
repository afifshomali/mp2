import React, {useEffect, useState} from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import DetailPage from './pages/DetailPage/DetailPage';
import Header from './components/Header/Header';
import { getAreas } from './api/mealApi';
import './App.css';



function App() {
  const navigate = useNavigate();
  const [areasList, setAreasList] = useState<{ name: string }[]>([]);
  useEffect(() => {
    getAreas().then((areas) => {
      setAreasList(areas);
    });
  }, []);

  // If the static 404.html redirected to index.html with the original
  // path encoded in the `p` query parameter, navigate to that path so the
  // SPA router can render the correct page (useful on GitHub Pages).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('p');
      if (p) {
        // decode and navigate; replace so history doesn't keep the index.html entry
        const decoded = decodeURIComponent(p);
        navigate(decoded, { replace: true });
      }
    } catch (e) {
      // ignore
    }
  }, [navigate]);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/gallery" element={<GalleryPage areasList={areasList} />} />
        <Route path="/detail/:id" element={<DetailPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

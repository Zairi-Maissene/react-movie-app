import './App.css'
import { ThemeProvider } from '@mui/material';
import LoaderOverlay from './components/LoaderOverlay/LoaderOverlay';
import { LoadingProvider } from './context/LoadingContext';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies/Movies';
import DetailPage from './pages/MovieDetails/MovieDetails';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
    <LoadingProvider>
      <LoaderOverlay>
      <Router>
        <Routes>
          <Route path="/" element={<Movies/>} />
          <Route path="/detail/:id" element={<DetailPage/>} />
        </Routes>
      </Router>
      </LoaderOverlay>
    </LoadingProvider>
    </ThemeProvider>
  );
};
export default App

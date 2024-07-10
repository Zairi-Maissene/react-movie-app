import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types';
import { fetchMovies as requestMovies } from '../../api';
import {
  Grid,
  Pagination,
  Box,
  Container,
  Typography,
  Paper,
  Fade
} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import './Movies.css';

const SearchPage = () => {
  const [search, setSearch] = useState(localStorage.getItem('lastSearch') || '');
  const [movies, setMovies] = useState<Movie[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  const { setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedSearch) {
        setMovies([]);
        setTotalResults(0);
        setCurrentPage(1);
        return;
      }
      setLoading(true);
      try {
        const data = await requestMovies(debouncedSearch, currentPage);
        setMovies(data.Search);
        setTotalResults(Number(data.totalResults) || 0);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch, setLoading, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (movie: Movie) => {
    localStorage.setItem('lastSearch', search);
    navigate(`/${movie.imdbID}`);
  };

  const showPagination = totalResults > 10;
  const noMoviesFound = movies.length === 0 && !error;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} className="search-container">
        <Typography variant="h4" gutterBottom align="center" className="search-title">
          Search Movies
        </Typography>
        <SearchBar value={search} onChange={setSearch} placeholder="Search for movies" />
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {noMoviesFound && (
          <Fade in={noMoviesFound && !error}>
            <Box className="no-movies-found">
              <LocalMoviesIcon sx={{ fontSize: 100, mb: 2 }} />
              <Typography variant="h6" align="center">
                Start your movie search adventure!
              </Typography>
              <Typography variant="body1" align="center">
                Enter a movie title above to explore our vast collection.
              </Typography>
            </Box>
          </Fade>
        )}

        <Grid container spacing={3} className="movie-grid">
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.imdbID}>
              <MovieCard movie={movie} onClick={() => handleCardClick(movie)} />
            </Grid>
          ))}
        </Grid>

        {showPagination && (
          <Box className="pagination">
            <Pagination
              count={Math.ceil(totalResults / 10)}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
              size="large"
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SearchPage;

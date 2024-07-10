import { ArrowLeft } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { fetchMovieDetails as requestMovieDetails } from '../../api';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Chip,
  Box,
  Container,
  Grid,
  Paper,
  Rating,
  Divider
} from '@mui/material';
import { MovieDetail } from '../../types/Movie';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px'
}));

const PosterImage = styled('img')({
  width: '100%',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
});

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold',
  display: 'inline'
}));

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await requestMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, setLoading]);

  const handleBackArrowClick = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const imdbRating = movie.Ratings.find(
    (rating) => rating.Source === 'Internet Movie Database'
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button sx={{ m: 2 }} onClick={handleBackArrowClick}>
        <ArrowLeft fontSize="large" />
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PosterImage src={movie.Poster} alt={movie.Title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
              {movie.Title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {movie.Year} | {movie.Runtime} | {movie.Genre}
            </Typography>
            {imdbRating && (
              <Box display="flex" alignItems="center" mb={2}>
                <Rating
                  value={parseFloat(imdbRating.Value.split('/')[0]) / 2}
                  readOnly
                  precision={0.1}
                />
                <Typography variant="body2" ml={1}>
                  ({imdbRating.Value})
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {movie.Plot}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <LabelTypography>Director: </LabelTypography>{' '}
                  {movie.Director}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <LabelTypography>Writers: </LabelTypography>{' '}
                  {movie.Writer}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <LabelTypography>Actors: </LabelTypography>{' '}
                  {movie.Actors}
                </Typography>
              </Grid>
            </Grid>
            <Box mt={2}>
              {movie.Ratings.map((rating, index) => (
                <Chip
                  key={index}
                  label={`${rating.Source}: ${rating.Value}`}
                  color="secondary"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" gutterBottom>
              <LabelTypography>Awards: </LabelTypography> {movie.Awards}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <LabelTypography>Language: </LabelTypography> {movie.Language}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <LabelTypography>Country: </LabelTypography> {movie.Country}
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailPage;

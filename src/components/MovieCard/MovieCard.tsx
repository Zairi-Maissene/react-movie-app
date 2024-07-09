import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Box } from '@mui/material';
import { Movie } from '../../types/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/detail/${movie.imdbID}`)}
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        },
        color: '#FFFF',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        alt={movie.Title}
        image={movie.Poster}
        title={movie.Title}
        sx={{
          height: 400,
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography gutterBottom variant="h6" component="div" noWrap sx={{ mb: 2 }}>
            {movie.Title}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <CalendarTodayIcon fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2">{movie.Year}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Grid item>
              <CategoryIcon fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2" textTransform="capitalize">
                {movie.Type}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
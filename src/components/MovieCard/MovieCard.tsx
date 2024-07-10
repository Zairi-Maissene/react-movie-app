import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Box } from '@mui/material';
import { Movie } from '../../types/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import { cardStyles, cardContentStyles } from './styles';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={cardStyles}
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
      <CardContent sx={{cardContentStyles}}>
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
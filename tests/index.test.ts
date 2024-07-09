import { describe, it, expect } from 'vitest';

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

if (!API_KEY) {
  throw new Error('OMDB_API_KEY is not set in the environment variables');
}

const fetchMovieData = async (title: string) => {
  const res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
  const response = await res.json();
  return response;

}
describe('OMDb API Integration', () => {
  it('fetches movie data successfully', async () => {
    const result = await fetchMovieData('The Shawshank Redemption');
    expect(result).toHaveProperty('Title', 'The Shawshank Redemption');
    expect(result).toHaveProperty('Year', '1994');
    expect(result).toHaveProperty('imdbID', 'tt0111161');
  });

  it('handles movie not found', async () => {
    const result = await fetchMovieData('Non-existent Movie 123456789');
    expect(result).toEqual({ Response: 'False', Error: 'Movie not found!' });
  });

  it('fetches correct data for a specific movie', async () => {
    const result = await fetchMovieData('Inception');
    expect(result).toHaveProperty('Title', 'Inception');
    expect(result).toHaveProperty('Director', 'Christopher Nolan');
    expect(result).toHaveProperty('Year', '2010');
  });

});
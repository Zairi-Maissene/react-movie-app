# Movie Search and Details App

This is a React application that allows users to search for movies and view detailed information about them using the OMDB API. The app is built using Vite for a fast and optimized development experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Features

- Search for movies by title
- Paginated search results through a large collection of movies
- View detailed information about movies, including title, year, genre, director, actors, plot, ratings, and more
- Responsive design

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Zairi-Maissene/react-movie-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd react-movie-app
    ```
3. Install the dependencies:
    ```bash
    yarn install
    ```

## Usage
1. Obtain an API key from [OMDB API](http://www.omdbapi.com/apikey.aspx).
2. Create a `.env` file in the root directory and add your API key:
    ```plaintext
    VITE_MOVIE_API_KEY=your_api_key_here
    ```
3. Start the development server:
    ```bash
    yarn dev
    ```
4. Open your browser and navigate to `http://localhost:5173`.

## Testing

To run tests for the application, use the following command:
```bash
npm run test
```

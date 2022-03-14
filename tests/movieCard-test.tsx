
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MovieCard from '../src/components/MovieCard/MovieCard';

const moviePosterImage = 'https://fakeurl.com/fake-image.jpg';

jest.mock('../src/config', () => {
  return {
    __esModule: true,
    default: {
      placeholderImage: "/public/nothing-to-show.svg",
    },
  };
});

jest.mock('../src/utilities/getImageFullUrl', () => {
  return {
    __esModule: true,
    default: jest.fn(() => moviePosterImage)
  };
});

describe('Movie card', () => {
  const mockedData = {
    id: 1,
    poster_path: moviePosterImage,
    adult: false,
    overview: "some-description",
    release_date: "2022-03-13",
    genre_ids: [1, 2, 3],
    original_title: "Movie original title",
    original_language: "en",
    title: "Movie title",
    backdrop_path: moviePosterImage,
    popularity: 7537.253,
    vote_count: 9319,
    video: false,
    vote_average: 8.3
  };

  const genres = ["Action", "Drama", "Romance"];

  it('should have the correct src attribute', async () => {
    render(<MovieCard movie={mockedData} genres={genres} />);
    const image = screen.getByAltText(`Poster image of ${mockedData.title}`);
    await waitFor(() => expect(image.getAttribute('src')).toContain(encodeURIComponent(mockedData.poster_path)));
  });

  it('should have the correct alt attribute', async () => {
    render(<MovieCard movie={mockedData} genres={genres} />);
    expect(screen.getByAltText(`Poster image of ${mockedData.title}`));
  });
});
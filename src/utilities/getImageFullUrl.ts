import config from "../config";

// Supported image sizes can be obtain from the configuration endpoint from the TMDB API
const getImageFullUrl = (imageUrl: string | null, size: string = "w342"): string => {
  return imageUrl ? config.movieImageBaseUrl + size + imageUrl : config.placeholderImage || '';
};

export default getImageFullUrl;
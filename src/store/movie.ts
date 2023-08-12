import { defineStore } from "pinia";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

type Movies = Movie[];

export const useMovieStore = defineStore("movie", {
  state() {
    const movies: Movies = [];
    const movie: Partial<Movie> = {};
    return {
      title: "",
      page: 1,
      maxPage: 0,
      movies,
      movie,
      isLoading: false,
    };
  },
  actions: {
    async searchMovies(page: number) {
      if (!this.title.trim()) return;
      this.page = page;
      this.isLoading = true;
      if (page === 1) {
        this.movies = [];
      }
      const res = await fetch(
        `https://www.omdbapi.com?apikey=7035c60c&s=${this.title}&page=${this.page}`,
      );
      const { Search, totalResults } = await res.json();
      this.movies.push(...(Search as Movies));
      if (!this.maxPage) {
        this.maxPage = Math.ceil(Number(totalResults) / 10);
      }
      this.isLoading = false;
    },
  },
});

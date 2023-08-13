import { defineStore } from "pinia";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Country: string;
  Plot: string;
  Ratings: Rating[];
  Actors: string;
  Director: string;
  Production: string;
  Genre: string;
}
export type Rating = {
  Source: string;
  Value: string;
};
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
      isNormal: "",
      message: "영문 제목의 영화를 검색해보세요!",
    };
  },
  actions: {
    async searchMovies(page: number) {
      if (!this.title.trim()) return;
      this.page = page;
      this.isLoading = true;
      if (page === 1) {
        this.movies = [];
        this.message = "";
      }
      try {
        const res = await fetch(
          `https://www.omdbapi.com?apikey=7035c60c&s=${this.title}&page=${this.page}`,
        );
        const { Search, totalResults, Response, Error } = await res.json();
        this.isNormal = Response;
        if (Response === "True") {
          this.movies.push(...Search);
          if (!this.maxPage) {
            this.maxPage = Math.ceil(Number(totalResults) / 10);
          }
        } else {
          this.message = Error;
        }
      } catch (err) {
        console.log("something wrong with loading");
      } finally {
        this.isLoading = false;
      }
    },
    async getMovieDetails(id: string) {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const res = await fetch(
          `https://www.omdbapi.com?apikey=7035c60c&i=${id}&plot=full`,
        );
        this.movie = await res.json();
        this.isLoading = false;
      } catch (err) {
        console.log("something wrong with loading");
      }
    },
  },
});

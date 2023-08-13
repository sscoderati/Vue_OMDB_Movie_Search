<script setup lang="ts">
import { Movie, useMovieStore } from "../store/movie.ts";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import Skeleton from "../components/Skeleton.vue";

const movieStore = useMovieStore();
const movieDetail: Partial<Movie> = reactive({
  Title: "",
  Poster: "",
  Released: "",
  Runtime: "",
  Country: "",
  Plot: "",
  Ratings: [],
  Actors: "",
  Director: "",
  Production: "",
  Genre: "",
});
const routeEl = useRoute();
(async function init() {
  await movieStore.getMovieDetails(routeEl.params.id as string);
  const { movie } = movieStore;
  for (const prop in movie) {
    if (prop in movieDetail && prop !== "Poster") {
      movieDetail[prop] = movie[prop];
    }
  }
  movieDetail.Poster = movieStore.movie.Poster?.replace("SX300", "SX700");
})();
</script>

<template>
  <Skeleton v-if="movieStore.isLoading" />
  <div v-else class="the-movie container">
    <div
      class="poster"
      :style="{ backgroundImage: `url(${movieDetail.Poster})` }"
    ></div>
    <div class="specs">
      <div class="title">
        {{ movieDetail.Title }}
      </div>
      <div class="labels">
        <span>{{ movieDetail.Released }}</span>
        &nbsp; / &nbsp;
        <span>{{ movieDetail.Runtime }}</span>
        &nbsp; / &nbsp;
        <span>{{ movieDetail.Country }}</span>
      </div>
      <div class="plot">
        {{ movieDetail.Plot }}
      </div>
      <div>
        <h3>Ratings</h3>
        <p v-for="rating in movieDetail.Ratings" :key="rating.Source">
          {{ rating.Source }} - {{ rating.Value }}
        </p>
      </div>
      <div>
        <h3>Actors</h3>
        <p>{{ movieDetail.Actors }}</p>
      </div>
      <div>
        <h3>Director</h3>
        <p>{{ movieDetail.Director }}</p>
      </div>
      <div>
        <h3>Production</h3>
        <p>{{ movieDetail.Production }}</p>
      </div>
      <div>
        <h3>Genre</h3>
        <p>{{ movieDetail.Genre }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/main.scss";
.the-movie {
  color: $color-gray-300;
  display: flex;
  gap: 70px;
  h3 {
    font-size: 20px;
    color: $color-white;
    margin: 24px 0 6px;
  }
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 750px;
    border-radius: 10px;
    background-size: cover;
    background-color: $color-black;
  }
  .specs {
    flex-grow: 1;
  }
  .title {
    font-size: 70px;
    line-height: 1;
    color: $color-white;
    margin-bottom: 30px;
  }
  .labels {
    color: $primary-color;
    margin-bottom: 20px;
  }
}
</style>
